import { JwtAuthGuard } from '@libs/auth/guards/jwt-auth.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Get('non-jwt')
  getHelloNonJwt(): string {
    return 'Hello World non jwt!';
  }
}
