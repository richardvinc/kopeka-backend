import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { BaseResult } from '@libs/shared/presenters/result.presenter';
import { BaseUseCase } from '@libs/shared/use-cases/base-use-case';
import { UserDomain } from '@libs/users/domains/user.domain';
import { UserError } from '@libs/users/errors/user.error';
import { UserPresenterDTO } from '@libs/users/presenters/user.presenter';
import { UserService } from '@libs/users/services/user.service';
import { USER_SERVICE } from '@libs/users/user.contants';
import { Inject } from '@nestjs/common';

import { UpdateUserDTO } from './update-user.dto';

export class UpdateUserUseCase extends BaseUseCase<
  UpdateUserDTO,
  UserPresenterDTO
> {
  constructor(
    @Inject(USER_SERVICE)
    private userService: UserService,
    @InjectMapper()
    private mapper: Mapper,
  ) {
    super(UpdateUserUseCase.name);
  }

  async execute(dto: UpdateUserDTO): Promise<BaseResult<UserPresenterDTO>> {
    this.logStartExecution(dto);

    const user = await this.userService.getUserById(dto.userId);
    if (!user) {
      throw new UserError.UserNotFound();
    }

    user.update({
      isOnboarded: dto.isOnboarded,
      fcmToken: dto.fcmToken,
    });

    const updatedUser = await this.userService.updateUser(user);

    this.logEndExecution();
    return this.ok(this.mapper.map(updatedUser, UserDomain, UserPresenterDTO));
  }
}
