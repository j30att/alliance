import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default () => ({
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: 3306,
    database: process.env.DATABASE,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    autoLoadEntities: true,
    synchronize: true,
    keepConnectionAlive: true,
}) as TypeOrmModuleOptions

