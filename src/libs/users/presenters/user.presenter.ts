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
  @Expose({ name: 'active_campaign_id' })
  activeCampaignId?: string;

  @AutoMap()
  @Expose({ name: 'is_onboarded' })
  isOnboarded: boolean;

  @AutoMap()
  @Expose({ name: 'is_admin' })
  isAdmin: boolean;

  @AutoMap()
  @Expose({ name: 'created_at' })
  createdAt: number;

  @AutoMap()
  @Expose({ name: 'updated_at' })
  updatedAt?: number;

  @AutoMap()
  @Expose({ name: 'deleted_at' })
  deletedAt?: number;
}

export class UserPresenterMinimalDTO {
  @AutoMap()
  id: string;

  @AutoMap()
  username: string;
}
