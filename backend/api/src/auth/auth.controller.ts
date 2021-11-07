import { Controller, Request, Post, UseGuards, Get, Res } from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';
import { LoginGuard } from '../common/guards/login.guard';
import { Response } from 'express';


@Controller('auth')
export class AuthController {
  @Public()
  @UseGuards(LoginGuard)
  @Post('/login')
  async login(@Res({passthrough: true}) res: Response, @Request() req) {
    return req.user;
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) response, @Request() request) {
    return { status: "OK" }
  }
}
