import { Public } from '@libs/auth/decorators/public.decorator';
import { User } from '@libs/auth/decorators/user.decorator';
import { FirebaseAuthGuard } from '@libs/auth/guards/firebase-auth.guard';
import { IUserIdentity } from '@libs/auth/interfaces/user.interface';
import { Controller, Get, UseGuards } from '@nestjs/common';

@Controller()
@UseGuards(FirebaseAuthGuard)
export class AppController {
  constructor() {}

  @Get()
  getHello(@User() user: IUserIdentity): string {
    console.log(user.uid);
    return 'Hello World!';
  }

  @Public()
  @Get('non-auth')
  getHelloNonJwt(): string {
    return 'Hello World non auth!';
  }
}
