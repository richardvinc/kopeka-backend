import { app } from 'firebase-admin';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FirebaseAdminService {
  constructor(@Inject('FIREBASE_APP') private admin: app.App) {}

  get auth() {
    return this.admin.auth();
  }
}
