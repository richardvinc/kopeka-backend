import { Expose } from 'class-transformer';

import { AutoMap } from '@automapper/classes';

export class UserPresenterDTO {
  @AutoMap()
  id: string;

  @AutoMap()
  username?: string;

  // @AutoMap()
  // @Expose({ name: 'firebase_uid' })
  // firebaseUid: string;

  @AutoMap()
  @Expose({ name: 'profile_picture_url' })
  profilePictureUrl?: string;

  @AutoMap()
  @Expose({ name: 'created_at' })
  createdAt: string;

  @AutoMap()
  @Expose({ name: 'updated_at' })
  updatedAt: string | null;

  @AutoMap()
  @Expose({ name: 'deleted_at' })
  deletedAt: string | null;
}

export class UserPresenterMinimalDTO {
  @AutoMap()
  id: string;

  @AutoMap()
  username: string;
}
