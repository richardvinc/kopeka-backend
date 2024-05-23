import { Repository } from 'typeorm';

import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { BaseUseCase } from '@libs/shared/use-cases/base-use-case';
import { UserPresenterDTO } from '@libs/users/presenters/user.presenter';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from '../../entities/user.entity';
import { UserError } from '../../errors/user.error';
import { FindUserByIdDTO } from './find-user-by-id.dto';

export class FindUserByIdUseCase extends BaseUseCase<
  FindUserByIdDTO,
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

  async execute(dto: FindUserByIdDTO): Promise<UserPresenterDTO> {
    const user = await this.userRepository.findOneBy({ id: dto.id });
    if (!user) throw new UserError.UserNotFound();

    return this.mapper.map(user, UserEntity, UserPresenterDTO);
  }
}
