import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { BaseResult } from '@libs/shared/presenters/result.presenter';
import { BaseUseCase } from '@libs/shared/use-cases/base-use-case';
import { UserDomain } from '@libs/users/domains/user.domain';
import { UserError } from '@libs/users/errors/user.error';
import { UserPresenterDTO } from '@libs/users/presenters/user.presenter';
import { UserService } from '@libs/users/services/user.service';
import { USER_SERVICE } from '@libs/users/user.contants';
import { Inject, Logger } from '@nestjs/common';

import { GetSelfDTO } from './get-self.dto';

export class GetSelfUseCase extends BaseUseCase<GetSelfDTO, UserPresenterDTO> {
  private readonly logger = new Logger(GetSelfUseCase.name);
  constructor(
    @InjectMapper()
    private mapper: Mapper,
    @Inject(USER_SERVICE)
    private userService: UserService,
  ) {
    super();
  }

  async execute(dto: GetSelfDTO): Promise<BaseResult<UserPresenterDTO>> {
    this.logger.log(`START: execute`);
    this.logger.log(`dto: ${JSON.stringify(dto)}`);
    const user = await this.userService.getUserByFirebaseUid(dto.firebaseUid);
    if (!user) {
      throw new UserError.UserNotFound();
    }

    this.logger.log(`END: execute`);
    return this.ok(this.mapper.map(user, UserDomain, UserPresenterDTO));
  }
}
