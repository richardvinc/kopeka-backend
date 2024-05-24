import { Repository } from 'typeorm';

import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { BaseResult } from '@libs/shared/presenters/result.presenter';
import { BaseUseCase } from '@libs/shared/use-cases/base-use-case';
import { UserEntity } from '@libs/users/entities/user.entity';
import { UserError } from '@libs/users/errors/user.error';
import { UserPresenterDTO } from '@libs/users/presenters/user.presenter';
import { InjectRepository } from '@nestjs/typeorm';

import { GetSelfDTO } from './get-self.dto';

export class GetSelfUseCase extends BaseUseCase<GetSelfDTO, UserPresenterDTO> {
  constructor(
    @InjectMapper()
    private mapper: Mapper,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    super();
  }

  async execute(dto: GetSelfDTO): Promise<BaseResult<UserPresenterDTO>> {
    const user = await this.userRepository.findOneBy({
      firebaseUid: dto.firebaseUid,
    });
    if (!user) {
      throw new UserError.UserNotFound();
    }

    return this.ok(this.mapper.map(user, UserEntity, UserPresenterDTO));
  }
}
