import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthErrors } from '../errors/auth.error';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt-strategy') {
  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new AuthErrors.InvalidToken(info.message);
    }
    return user;
  }

  canActivate(context) {
    return super.canActivate(context);
  }
}
