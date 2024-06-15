import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { BaseResult } from '@libs/shared/presenters/result.presenter';
import { BaseUseCase } from '@libs/shared/use-cases/base-use-case';
import { UserDomain } from '@libs/users/domains/user.domain';
import { UserPresenterDTO } from '@libs/users/presenters/user.presenter';
import { UserService } from '@libs/users/services/user.service';
import { USER_SERVICE } from '@libs/users/user.contants';
import { Inject } from '@nestjs/common';

import { UserError } from '../../errors/user.error';
import { GetUserByIdDTO } from './get-user-by-id.dto';

export class GetUserByIdUseCase extends BaseUseCase<
  GetUserByIdDTO,
  UserPresenterDTO
> {
  constructor(
    @InjectMapper()
    private mapper: Mapper,
    @Inject(USER_SERVICE)
    private userService: UserService,
  ) {
    super(GetUserByIdUseCase.name);
  }

  async execute(dto: GetUserByIdDTO): Promise<BaseResult<UserPresenterDTO>> {
    this.logStartExecution(dto);

    const user = await this.userService.getUserById(dto.id);
    if (!user) throw new UserError.UserNotFound();

    this.logEndExecution();
    return this.ok(this.mapper.map(user, UserDomain, UserPresenterDTO));
  }
}
