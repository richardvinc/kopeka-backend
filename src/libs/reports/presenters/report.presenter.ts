import { Expose } from 'class-transformer';

import { AutoMap } from '@automapper/classes';
import { UserPresenterMinimalDTO } from '@libs/users/presenters/user.presenter';

export class GPSLocationDTO {
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

  @AutoMap(() => GPSLocationDTO)
  location: GPSLocationDTO;

  @AutoMap()
  @Expose({ name: 'image_url' })
  imageUrl: string;

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
  condition: string;

  @AutoMap()
  @Expose({ name: 'created_at' })
  createdAt: string;

  @AutoMap()
  @Expose({ name: 'updated_at' })
  updatedAt: string | null;
}
