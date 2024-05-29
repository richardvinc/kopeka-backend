import { Repository } from 'typeorm';

import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { BaseUseCase } from '@libs/shared/use-cases/base-use-case';
import { UserEntity } from '@libs/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

import { IsUsernameExistsDTO } from './is-username-exists.dto';

export class IsUsernameExistsUseCase extends BaseUseCase<
  IsUsernameExistsDTO,
  boolean
> {
  constructor(
    @InjectMapper()
    private mapper: Mapper,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    super();
  }

  async execute(dto: IsUsernameExistsDTO): Promise<boolean> {
    const isExists = await this.userRepository.exists({
      where: {
        username: dto.username,
      },
      withDeleted: true,
    });

    return isExists;
  }
}
