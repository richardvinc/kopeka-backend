import { Repository } from 'typeorm';

import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { BaseResult } from '@libs/shared/presenters/result.presenter';
import { BaseUseCase } from '@libs/shared/use-cases/base-use-case';
import { UserPresenterDTO } from '@libs/users/presenters/user.presenter';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from '../../entities/user.entity';
import { UserError } from '../../errors/user.error';
import { GetUserByIdDTO } from './get-user-by-id.dto';

export class GetUserByIdUseCase extends BaseUseCase<
  GetUserByIdDTO,
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

  async execute(dto: GetUserByIdDTO): Promise<BaseResult<UserPresenterDTO>> {
    const user = await this.userRepository.findOneBy({ id: dto.id });
    if (!user) throw new UserError.UserNotFound();

    return this.ok(this.mapper.map(user, UserEntity, UserPresenterDTO));
  }
}
