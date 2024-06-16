import { AutoMap } from '@automapper/classes';
import { BaseDomain } from '@libs/shared/domains/base-domain';

interface UserProps {
  username?: string;
  firebaseUid: string;
  profilePictureUrl?: string;
  isActive: boolean;
  isOnboarded?: boolean;
  fcmToken?: string;
  activeCampaignId?: string;
}

type UpdateableProps = Partial<
  Pick<
    UserProps,
    | 'username'
    | 'fcmToken'
    | 'profilePictureUrl'
    | 'isActive'
    | 'isOnboarded'
    | 'activeCampaignId'
  >
>;

export class UserDomain extends BaseDomain {
  @AutoMap()
  username?: string;

  @AutoMap()
  firebaseUid: string;

  @AutoMap()
  profilePictureUrl?: string;

  @AutoMap()
  isOnboarded: boolean;

  @AutoMap()
  isActive: boolean;

  @AutoMap()
  fcmToken?: string;

  @AutoMap()
  activeCampaignId?: string;

  constructor(props: UserProps, id?: string) {
    super(id);
    Object.assign(this, {
      isOnboarded: false,
      activeCampaignId: null,
      ...props,
    });
  }

  public static create(props: UserProps, id?: string) {
    return new UserDomain(props, id);
  }

  public update(props: UpdateableProps) {
    Object.assign(this, { ...this, ...props, updatedAt: new Date() });
  }
}
