import { BaseUseCase } from '@libs/shared/use-cases/base-use-case';
import { UserService } from '@libs/users/services/user.service';
import { USER_SERVICE } from '@libs/users/user.contants';
import { Inject } from '@nestjs/common';

import { IsUsernameExistsDTO } from './is-username-exists.dto';

export class IsUsernameExistsUseCase extends BaseUseCase<
  IsUsernameExistsDTO,
  boolean
> {
  constructor(
    @Inject(USER_SERVICE)
    private userService: UserService,
  ) {
    super(IsUsernameExistsUseCase.name);
  }

  async execute(dto: IsUsernameExistsDTO): Promise<boolean> {
    this.logStartExecution(dto);

    const isExists = await this.userService.getUserByUsername(dto.username);

    this.logEndExecution();
    return !!isExists;
  }
}
