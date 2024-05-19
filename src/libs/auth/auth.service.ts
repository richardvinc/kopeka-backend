import { FirebaseAdminService } from '@libs/providers/firebase-admin/firebase-admin.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private firebaseAdminService: FirebaseAdminService) {}

  async verifyIdToken(token: string) {
    return await this.firebaseAdminService.auth.verifyIdToken(token);
  }
}
