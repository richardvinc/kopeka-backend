import { AutoMap } from '@automapper/classes';
import { BaseDomain } from '@libs/shared/domains/base-domain';
import { UserDomain } from '@libs/users/domains/user.domain';

import { REPORT_CATEGORY, REPORT_CONDITION } from '../report.constant';

export class GPSLocation {
  lat: number;
  lon: number;
  geoHash: string;

  constructor(lat: number, lon: number, geoHash: string) {
    this.lat = lat;
    this.lon = lon;
    this.geoHash = geoHash;
  }
}

interface ReportProps {
  location: GPSLocation;
  imageUrl: string;
  reportedById: string;
  totalReaction: number;
  category: REPORT_CATEGORY;
  condition: REPORT_CONDITION;
  user?: UserDomain;
}

type UpdateableProps = Partial<Pick<ReportProps, 'location'>>;

export class ReportDomain extends BaseDomain {
  @AutoMap(() => GPSLocation)
  location: GPSLocation;

  @AutoMap()
  imageUrl: string;

  @AutoMap()
  totalReaction: number;

  @AutoMap()
  reportedById: string;

  @AutoMap()
  category: REPORT_CATEGORY;

  @AutoMap()
  condition: REPORT_CONDITION;

  @AutoMap()
  rowId?: number;

  @AutoMap()
  isReacted?: boolean;

  @AutoMap(() => UserDomain)
  user?: UserDomain;

  constructor(props: ReportProps, id?: string) {
    super(id);
    Object.assign(this, { ...props });
  }

  public static create(props: ReportProps, id?: string) {
    return new ReportDomain(props, id);
  }

  update(props: UpdateableProps) {
    Object.assign(this, { ...this, ...props, updatedAt: new Date() });
  }
}
