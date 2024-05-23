import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { User } from '../domains/user.domain';
import { UserEntity } from '../entities/user.entity';
import {
  UserPresenterDTO,
  UserPresenterMinimalDTO,
} from '../presenters/user.presenter';

@Injectable()
export class UserMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, User, UserEntity);
      createMap(mapper, User, UserPresenterDTO);
      createMap(mapper, User, UserPresenterMinimalDTO);
      createMap(mapper, UserEntity, User);
      createMap(mapper, UserEntity, UserPresenterDTO);
      createMap(mapper, UserEntity, UserPresenterMinimalDTO);
    };
  }
}
