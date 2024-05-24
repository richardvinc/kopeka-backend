import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { UserDomain } from '../domains/user.domain';
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
      createMap(mapper, UserDomain, UserEntity);
      createMap(mapper, UserDomain, UserPresenterDTO);
      createMap(mapper, UserDomain, UserPresenterMinimalDTO);
      createMap(mapper, UserEntity, UserDomain);
      createMap(mapper, UserEntity, UserPresenterDTO);
      createMap(mapper, UserEntity, UserPresenterMinimalDTO);
    };
  }
}
