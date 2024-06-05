import { FIREBASE_ADMIN_SERVICE } from '@libs/providers/firebase-admin/firebase-admin.module';
import { FirebaseAdminService } from '@libs/providers/firebase-admin/firebase-admin.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @Inject(FIREBASE_ADMIN_SERVICE)
    private firebaseAdminService: FirebaseAdminService,
  ) {}

  async verifyIdToken(token: string) {
    return await this.firebaseAdminService.auth.verifyIdToken(token);
  }
}
