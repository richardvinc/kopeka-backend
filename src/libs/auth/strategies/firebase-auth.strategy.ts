import { ExtractJwt, Strategy } from 'passport-firebase-jwt';

import { FirebaseAdminService } from '@libs/providers/firebase-admin/firebase-admin.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { FIREBASE_AUTH_STRATEGY } from '../auth.constants';
import { AuthErrors } from '../errors/auth.error';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
  Strategy,
  FIREBASE_AUTH_STRATEGY,
) {
  constructor(private firebaseAdmin: FirebaseAdminService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(token) {
    return await this.firebaseAdmin.auth
      .verifyIdToken(token, true)
      .catch((err) => {
        throw new AuthErrors.InvalidToken(err.message);
      });
  }
}
