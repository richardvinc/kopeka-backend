import { Repository } from 'typeorm';

import { User } from '@libs/users/domains/user.domain';
import { UserEntity } from '@libs/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './create-user.dto';

export class CreateUserUseCase {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async execute(dto: CreateUserDto) {
    const user = User.create({
      ...dto,
      isActive: true,
    });
    console.log({ dto });
    console.log({ user });

    const userCreated = await this.userRepository.save({
      id: user.id,
      username: user.props.username,
      firebaseUid: user.props.firebaseUid,
      profilePictureUrl: user.props.profilePictureUrl,
      fcmToken: user.props.fcmToken,
      isActive: user.props.isActive,
      createdAt: user.props.createdAt,
      updatedAt: user.props.updatedAt,
      deletedAt: user.props.deletedAt,
    });
    return userCreated;
  }
}
