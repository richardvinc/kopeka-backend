import { AutoMap } from '@automapper/classes';
import { GPSLocation } from '@libs/reports/domains/report.domain';
import { BaseDomain } from '@libs/shared/domains/base-domain';

interface CampaignJourneyProps {
  campaignId: string;
  userId: string;
  location: GPSLocation;
}

type UpdateableProps = Partial<Pick<CampaignJourneyProps, 'location'>>;

export class CampaignJourneyDomain extends BaseDomain {
  @AutoMap()
  id: string;

  @AutoMap()
  campaignId: string;

  @AutoMap()
  userId: string;

  @AutoMap()
  location: GPSLocation;

  constructor(props: CampaignJourneyProps, id?: string) {
    super(id);
    Object.assign(this, { ...props });
  }

  public static create(props: CampaignJourneyProps, id?: string) {
    return new CampaignJourneyDomain(props, id);
  }

  update(props: UpdateableProps) {
    Object.assign(this, { ...this, ...props, updatedAt: new Date() });
  }
}
