import { BaseDomain } from '@libs/shared/domains/base-domain';

interface UserProps {
  username: string;
  firebaseUid: string;
  profilePictureUrl: string;
  isActive: boolean;
  fcmToken?: string | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  deletedAt?: Date | undefined;
}

type UserOptionalProps = Partial<Pick<UserProps, 'fcmToken'>>;

export class User extends BaseDomain<UserProps> {
  constructor(props: UserProps, id?: string) {
    super({ ...props, createdAt: new Date() }, id);
  }

  static create(props: UserProps, id?: string): User {
    return new User(props, id);
  }

  update(props: UserOptionalProps): User {
    return User.create(
      { ...this._props, ...props, updatedAt: new Date() },
      this._id,
    );
  }
}
