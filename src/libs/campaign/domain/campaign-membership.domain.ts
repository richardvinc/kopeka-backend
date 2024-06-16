import { AutoMap } from '@automapper/classes';
import { BaseDomain } from '@libs/shared/domains/base-domain';

interface CampaignMembershipProps {
  campaignId: string;
  userId: string;
  isCreator?: boolean;
}

export class CampaignMembershipDomain extends BaseDomain {
  @AutoMap()
  campaignId: string;

  @AutoMap()
  userId: string;

  @AutoMap()
  isCreator: boolean;

  constructor(props: CampaignMembershipProps, id?: string) {
    super(id);
    Object.assign(this, { ...props, isCreator: props.isCreator ?? false });
  }

  public static create(props: CampaignMembershipProps, id?: string) {
    return new CampaignMembershipDomain(props, id);
  }
}
