import { Repository } from 'typeorm';

import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { BaseUseCase } from '@libs/shared/use-cases/base-use-case';
import { UserEntity } from '@libs/users/entities/user.entity';
import { UserError } from '@libs/users/errors/user.error';
import { UserPresenterDTO } from '@libs/users/presenters/user.presenter';
import { InjectRepository } from '@nestjs/typeorm';

import { FindUserByUsernameDTO } from './find-user-by-username.dto';

export class FindUserByUsernameUseCase extends BaseUseCase<
  FindUserByUsernameDTO,
  UserPresenterDTO
> {
  constructor(
    @InjectMapper()
    private mapper: Mapper,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    super();
  }

  async execute(dto: FindUserByUsernameDTO): Promise<UserPresenterDTO> {
    const user = await this.userRepository.findOneBy({
      username: dto.username,
    });
    if (!user) throw new UserError.UserNotFound();

    return this.mapper.map(user, UserEntity, UserPresenterDTO);
  }
}
