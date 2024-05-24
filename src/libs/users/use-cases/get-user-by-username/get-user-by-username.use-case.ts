import { Repository } from 'typeorm';

import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { BaseResult } from '@libs/shared/presenters/result.presenter';
import { BaseUseCase } from '@libs/shared/use-cases/base-use-case';
import { UserEntity } from '@libs/users/entities/user.entity';
import { UserError } from '@libs/users/errors/user.error';
import { UserPresenterMinimalDTO } from '@libs/users/presenters/user.presenter';
import { InjectRepository } from '@nestjs/typeorm';

import { GetUserByUsernameDTO } from './get-user-by-username.dto';

export class GetUserByUsernameUseCase extends BaseUseCase<
  GetUserByUsernameDTO,
  UserPresenterMinimalDTO
> {
  constructor(
    @InjectMapper()
    private mapper: Mapper,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    super();
  }

  async execute(
    dto: GetUserByUsernameDTO,
  ): Promise<BaseResult<UserPresenterMinimalDTO>> {
    const user = await this.userRepository.findOne({
      where: {
        username: dto.username,
      },
      withDeleted: true,
    });
    if (!user) throw new UserError.UserNotFound();

    return new BaseResult(
      this.mapper.map(user, UserEntity, UserPresenterMinimalDTO),
    );
  }
}
