import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { JWT_STRATEGY } from '../auth.constants';
import { AuthErrors } from '../errors/auth.error';

@Injectable()
export class JwtAuthGuard extends AuthGuard(JWT_STRATEGY) {
  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new AuthErrors.InvalidToken(info.message);
    }
    return user;
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
}
