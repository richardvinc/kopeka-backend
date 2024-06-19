import {
  condition,
  createMap,
  forMember,
  mapFrom,
  Mapper,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { DateUtils } from '@libs/shared/utils/date.utils';
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
      createMap(
        mapper,
        UserDomain,
        UserPresenterDTO,
        forMember(
          (destination) => destination.createdAt,
          mapFrom((source) => DateUtils.toEpoch(source.createdAt)),
        ),
        forMember(
          (destination) => destination.updatedAt,
          mapFrom((source) =>
            source.updatedAt ? DateUtils.toEpoch(source.updatedAt) : undefined,
          ),
        ),
        forMember(
          (destination) => destination.activeCampaignId,
          condition((source) => source.activeCampaignId !== null, null),
        ),
      );
      createMap(mapper, UserDomain, UserPresenterMinimalDTO);
      createMap(mapper, UserEntity, UserDomain);
      createMap(
        mapper,
        UserEntity,
        UserPresenterDTO,
        forMember(
          (destination) => destination.createdAt,
          mapFrom((source) => DateUtils.toEpoch(source.createdAt)),
        ),
        forMember(
          (destination) => destination.updatedAt,
          mapFrom((source) =>
            source.updatedAt ? DateUtils.toEpoch(source.updatedAt) : undefined,
          ),
        ),
        forMember(
          (destination) => destination.activeCampaignId,
          condition((source) => source.activeCampaignId !== null, null),
        ),
      );
      createMap(mapper, UserEntity, UserPresenterMinimalDTO);
    };
  }
}
