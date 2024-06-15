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

import { CreateUsernameDto } from './create-username.dto';

export class CreateUsernameUseCase extends BaseUseCase<
  CreateUsernameDto,
  UserPresenterDTO
> {
  constructor(
    @InjectMapper()
    private mapper: Mapper,
    @Inject(USER_SERVICE)
    private userService: UserService,
  ) {
    super(CreateUsernameUseCase.name);
  }

  async execute(dto: CreateUsernameDto): Promise<BaseResult<UserPresenterDTO>> {
    this.logStartExecution(dto);
    // check if user already registered
    const registeredUser = await this.userService.getUserByFirebaseUid(
      dto.firebaseUid,
    );
    if (!registeredUser) {
      throw new UserError.UserNotFound();
    }

    // check if username already exists
    const usernameExists = await this.userService.getUserByUsername(
      dto.username,
    );
    if (usernameExists) {
      throw new UserError.UserAlreadyExists();
    }

    registeredUser.update({
      username: dto.username,
      profilePictureUrl: dto.profilePictureUrl,
      fcmToken: dto.fcmToken,
    });

    const userCreated = await this.userService.updateUser(registeredUser);

    this.logEndExecution();
    return this.ok(this.mapper.map(userCreated, UserDomain, UserPresenterDTO));
  }
}
