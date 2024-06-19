import { Expose } from 'class-transformer';

import { AutoMap } from '@automapper/classes';
import { UserPresenterMinimalDTO } from '@libs/users/presenters/user.presenter';

export class CampaignPresenterDTO {
  @AutoMap()
  id: string;

  @AutoMap()
  @Expose({ name: 'shortcode' })
  campaignShortcode: string;

  @AutoMap(() => UserPresenterMinimalDTO)
  @Expose({ name: 'created_by' })
  createdBy: UserPresenterMinimalDTO;

  @AutoMap()
  @Expose({ name: 'total_campaigners' })
  totalCampaigners: number;

  @AutoMap()
  @Expose({ name: 'total_reports' })
  totalReports: number;

  @AutoMap()
  @Expose({ name: 'expired_at' })
  expiredAt: string;

  @AutoMap()
  @Expose({ name: 'created_at' })
  createdAt: number;

  @AutoMap()
  @Expose({ name: 'updated_at' })
  updatedAt?: number;
}
