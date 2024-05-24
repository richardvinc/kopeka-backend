import { ExtractJwt, Strategy } from 'passport-firebase-jwt';

import { FirebaseAdminService } from '@libs/providers/firebase-admin/firebase-admin.service';
import { UserService } from '@libs/users/services/user.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { FIREBASE_AUTH_STRATEGY } from '../auth.constants';
import { AuthErrors } from '../errors/auth.error';
import { IUserIdentity } from '../interfaces/user.interface';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
  Strategy,
  FIREBASE_AUTH_STRATEGY,
) {
  constructor(
    private firebaseAdmin: FirebaseAdminService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(token): Promise<IUserIdentity> {
    const decodedIdToken = await this.firebaseAdmin.auth
      .verifyIdToken(token, true)
      .catch((err) => {
        throw new AuthErrors.InvalidToken(err.message);
      });

    const user = await this.userService.getUserByFirebaseUid(
      decodedIdToken.uid,
    );
    if (!user) {
      throw new AuthErrors.UserNotFound();
    }

    return {
      id: user.id,
      firebaseUid: user.firebaseUid,
      username: user.username,
    };
  }
}
