import { Repository } from 'typeorm';

import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { BaseUseCase } from '@libs/shared/use-cases/base-use-case';
import { User } from '@libs/users/domains/user.domain';
import { UserEntity } from '@libs/users/entities/user.entity';
import { UserError } from '@libs/users/errors/user.error';
import { UserPresenterDTO } from '@libs/users/presenters/user.presenter';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './create-user.dto';

export class CreateUserUseCase extends BaseUseCase<
  CreateUserDto,
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

  async execute(dto: CreateUserDto): Promise<UserPresenterDTO> {
    // check if user already registered
    const userRegistered = await this.userRepository.findOne({
      where: {
        firebaseUid: dto.firebaseUid,
      },
    });
    if (userRegistered) {
      throw new UserError.UserAlreadyRegistered();
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

    const user = User.create({
      ...dto,
      isActive: true,
    });

    const userCreated = await this.userRepository.save(
      this.mapper.map(user, User, UserEntity),
    );

    return this.mapper.map(userCreated, UserEntity, UserPresenterDTO);
  }
}
