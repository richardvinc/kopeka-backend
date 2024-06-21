import { AutoMap } from '@automapper/classes';
import { BaseDomain } from '@libs/shared/domains/base-domain';
import { UserDomain } from '@libs/users/domains/user.domain';

interface CampaignProps {
  campaignShortcode: string;
  campaignImage?: string;
  createdById: string;
  totalCampaigners?: number;
  totalReports?: number;
  endedAt?: Date;
  expiredAt: Date;
  user?: UserDomain;
}

type UpdateableProps = Partial<
  Pick<CampaignProps, 'totalCampaigners' | 'totalReports' | 'endedAt'>
>;

export class CampaignDomain extends BaseDomain {
  @AutoMap()
  id: string;

  @AutoMap()
  campaignShortcode: string;

  @AutoMap()
  campaignImage?: string;

  @AutoMap()
  totalCampaigners: number;

  @AutoMap()
  totalReports: number;

  @AutoMap()
  createdById: string;

  @AutoMap()
  endedAt?: Date;

  @AutoMap()
  expiredAt: Date;

  @AutoMap(() => UserDomain)
  user?: UserDomain;

  constructor(props: CampaignProps, id?: string) {
    super(id);
    Object.assign(this, { totalCampaigners: 0, totalReports: 0, ...props });
  }

  public static create(props: CampaignProps, id?: string) {
    return new CampaignDomain(props, id);
  }

  update(props: UpdateableProps) {
    Object.assign(this, { ...this, ...props, updatedAt: new Date() });
  }
}
