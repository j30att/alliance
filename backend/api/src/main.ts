import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import flash = require('connect-flash');

import * as session from 'express-session';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { AuthGuard } from './common/guards/auth.guard';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const reflector = app.get( Reflector );
  // app.useGlobalGuards(new AuthGuard(reflector));

  app.useGlobalFilters(new HttpExceptionFilter());

  const options = new DocumentBuilder()
    .setTitle('Alliance')
    .setDescription('Simple CRUD for managing')
    .setVersion('1.0')
    .addTag('Alliance')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);

  app.use(
    session({
      secret: 'nest alliance',
      name: 'alliance_auth',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.enableCors();
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  app.setGlobalPrefix('api');

  await app.listen(3000);
}

bootstrap();
