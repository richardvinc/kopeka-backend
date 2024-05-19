import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { FIREBASE_AUTH_STRATEGY } from '../auth.constants';
import { AuthErrors } from '../errors/auth.error';

@Injectable()
export class FirebaseAuthGuard extends AuthGuard(FIREBASE_AUTH_STRATEGY) {
  constructor(private reflector: Reflector) {
    super();
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new AuthErrors.InvalidToken(info.message);
    }
    return user;
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>('public', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }
}
