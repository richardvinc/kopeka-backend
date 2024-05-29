import { Repository } from 'typeorm';

import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { BaseResult } from '@libs/shared/presenters/result.presenter';
import { BaseUseCase } from '@libs/shared/use-cases/base-use-case';
import { UserDomain } from '@libs/users/domains/user.domain';
import { UserEntity } from '@libs/users/entities/user.entity';
import { UserError } from '@libs/users/errors/user.error';
import { UserPresenterDTO } from '@libs/users/presenters/user.presenter';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUsernameDto } from './create-username.dto';

export class CreateUsernameUseCase extends BaseUseCase<
  CreateUsernameDto,
  UserPresenterDTO
> {
  constructor(
    @InjectMapper()
    private mapper: Mapper,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super();
  }

  async execute(dto: CreateUsernameDto): Promise<BaseResult<UserPresenterDTO>> {
    // check if user already registered
    const registeredUser = await this.userRepository.findOne({
      where: {
        firebaseUid: dto.firebaseUid,
      },
    });
    if (!registeredUser) {
      throw new UserError.UserNotFound();
    }

    // check if username already exists
    const userExists = await this.userRepository.findOne({
      where: {
        username: dto.username,
      },
      withDeleted: true,
    });
    if (userExists) {
      throw new UserError.UserAlreadyExists();
    }

    const user = this.mapper.map(registeredUser, UserEntity, UserDomain);
    user.update({
      username: dto.username,
      profilePictureUrl: dto.profilePictureUrl,
      fcmToken: dto.fcmToken,
    });

    const userCreated = await this.userRepository.save(
      this.mapper.map(user, UserDomain, UserEntity),
    );

    return this.ok(this.mapper.map(userCreated, UserEntity, UserPresenterDTO));
  }
}
