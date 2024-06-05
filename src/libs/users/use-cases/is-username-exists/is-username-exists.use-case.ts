import { BaseUseCase } from '@libs/shared/use-cases/base-use-case';
import { UserService } from '@libs/users/services/user.service';
import { USER_SERVICE } from '@libs/users/user.contants';
import { Inject, Logger } from '@nestjs/common';

import { IsUsernameExistsDTO } from './is-username-exists.dto';

export class IsUsernameExistsUseCase extends BaseUseCase<
  IsUsernameExistsDTO,
  boolean
> {
  private readonly logger = new Logger(IsUsernameExistsUseCase.name);
  constructor(
    @Inject(USER_SERVICE)
    private userService: UserService,
  ) {
    super();
  }

  async execute(dto: IsUsernameExistsDTO): Promise<boolean> {
    this.logger.log(`START: execute`);
    this.logger.log(`dto: ${JSON.stringify(dto)}`);

    const isExists = await this.userService.getUserByUsername(dto.username);

    this.logger.log(`END: execute`);
    return !!isExists;
  }
}
