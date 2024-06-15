import { AutoMap } from '@automapper/classes';
import { BaseDomain } from '@libs/shared/domains/base-domain';
import { UserDomain } from '@libs/users/domains/user.domain';

import { REPORT_CATEGORY, REPORT_CONDITION } from '../report.constant';

export class GPSLocation {
  latitude: number;
  longitude: number;

  constructor(lat: number, lon: number) {
    this.latitude = lat;
    this.longitude = lon;
  }
}

export class GPSLocationWithGeoHash extends GPSLocation {
  geoHash: string;

  constructor(lat: number, lon: number, geoHash: string) {
    super(lat, lon);
    this.geoHash = geoHash;
  }
}

interface ReportProps {
  location: GPSLocationWithGeoHash;
  imageUrl: string;
  reportedById: string;
  totalReaction: number;
  category: REPORT_CATEGORY;
  condition: REPORT_CONDITION;
  campaignId?: string;
  user?: UserDomain;
}

type UpdateableProps = Partial<Pick<ReportProps, 'location'>>;

export class ReportDomain extends BaseDomain {
  @AutoMap(() => GPSLocationWithGeoHash)
  location: GPSLocationWithGeoHash;

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
  rowId: number;

  @AutoMap()
  campaignId?: string;

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
