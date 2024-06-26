import { Expose } from 'class-transformer';

import { AutoMap } from '@automapper/classes';
import { UserPresenterMinimalDTO } from '@libs/users/presenters/user.presenter';

export class GPSLocationWithGeohashDTO {
  @AutoMap()
  latitude: number;

  @AutoMap()
  longitude: number;

  @AutoMap()
  // for some reason, @Expose doesnt work here
  geo_hash: string;
}

export class ReportPresenterDTO {
  @AutoMap()
  id: string;

  @AutoMap(() => GPSLocationWithGeohashDTO)
  location: GPSLocationWithGeohashDTO;

  @AutoMap()
  @Expose({ name: 'image_url' })
  imageUrl: string;

  @AutoMap()
  @Expose({ name: 'campaign_id' })
  campaignId: string | null;

  @AutoMap()
  @Expose({ name: 'total_reaction' })
  totalReaction: number;

  @AutoMap()
  @Expose({ name: 'is_reacted' })
  isReacted: boolean;

  @AutoMap(() => UserPresenterMinimalDTO)
  @Expose({ name: 'reported_by' })
  reportedBy: UserPresenterMinimalDTO;

  @AutoMap()
  category: string;

  @AutoMap()
  @Expose({ name: 'category_remark' })
  categoryRemark?: string;

  @AutoMap()
  @Expose({ name: 'sub_categories' })
  subCategories?: string[];

  @AutoMap()
  @Expose({ name: 'sub_category_remark' })
  subCategoryRemark?: string;

  @AutoMap()
  condition: string;

  @AutoMap()
  @Expose({ name: 'created_at' })
  createdAt: number;

  @AutoMap()
  @Expose({ name: 'updated_at' })
  updatedAt: number;
}
