import { AutoMap } from '@automapper/classes';
import { BaseDomain } from '@libs/shared/domains/base-domain';

interface UserProps {
  username?: string;
  firebaseUid: string;
  profilePictureUrl?: string;
  isActive: boolean;
  fcmToken?: string;
}

type UpdateableProps = Partial<
  Pick<UserProps, 'username' | 'fcmToken' | 'profilePictureUrl' | 'isActive'>
>;

export class UserDomain extends BaseDomain {
  @AutoMap()
  username?: string;

  @AutoMap()
  firebaseUid: string;

  @AutoMap()
  profilePictureUrl?: string;

  @AutoMap()
  isActive: boolean;

  @AutoMap()
  fcmToken?: string | undefined;

  constructor(props: UserProps, id?: string) {
    super(id);
    Object.assign(this, { ...props });
  }

  public static create(props: UserProps, id?: string) {
    return new UserDomain(props, id);
  }

  update(props: UpdateableProps) {
    Object.assign(this, { ...this, ...props, updatedAt: new Date() });
  }
}
