import { Repository } from 'typeorm';

import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { BaseUseCase } from '@libs/shared/use-cases/base-use-case';
import { User } from '@libs/users/domains/user.domain';
import { UserEntity } from '@libs/users/entities/user.entity';
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
