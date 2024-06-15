import {
  condition,
  createMap,
  forMember,
  mapFrom,
  Mapper,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { UserDomain } from '@libs/users/domains/user.domain';
import { UserEntity } from '@libs/users/entities/user.entity';
import { UserPresenterMinimalDTO } from '@libs/users/presenters/user.presenter';
import { Injectable } from '@nestjs/common';

import { GPSLocationWithGeoHash, ReportDomain } from '../domains/report.domain';
import { ReportEntity } from '../entities/report.entity';
import { ReportPresenterDTO } from '../presenters/report.presenter';

@Injectable()
export class ReportMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (map) => {
      createMap(
        map,
        ReportDomain,
        ReportEntity,
        forMember(
          (destination) => destination.latitude,
          mapFrom((source) => source.location.latitude),
        ),
        forMember(
          (destination) => destination.longitude,
          mapFrom((source) => source.location.longitude),
        ),
        forMember(
          (destination) => destination.geoHash,
          mapFrom((source) => source.location.geoHash),
        ),
        forMember(
          (destination) => destination.user,
          mapFrom((source) =>
            this.mapper.map(source.user, UserDomain, UserEntity),
          ),
        ),
      );
      createMap(
        map,
        ReportDomain,
        ReportPresenterDTO,

        forMember(
          (destination) => destination.reportedBy,
          mapFrom((source) =>
            this.mapper.map(source.user, UserDomain, UserPresenterMinimalDTO),
          ),
        ),
        forMember(
          (destination) => destination.location,
          mapFrom((source) => {
            return {
              latitude: source.location.latitude,
              longitude: source.location.longitude,
              geo_hash: source.location.geoHash,
            };
          }),
        ),
        forMember(
          (destination) => destination.isReacted,
          condition((source) => source.isReacted ?? false, false),
        ),
      );

      createMap(
        map,
        ReportEntity,
        ReportDomain,
        forMember(
          (destination) => destination.location,
          mapFrom((source) => {
            return new GPSLocationWithGeoHash(
              source.latitude,
              source.longitude,
              source.geoHash,
            );
          }),
        ),
        forMember(
          (destination) => destination.user,
          mapFrom((source) =>
            this.mapper.map(source.user, UserEntity, UserDomain),
          ),
        ),
      );
      createMap(
        map,
        ReportEntity,
        ReportPresenterDTO,
        forMember(
          (destination) => destination.reportedBy,
          mapFrom((source) =>
            this.mapper.map(source.user, UserEntity, UserPresenterMinimalDTO),
          ),
        ),
        forMember(
          (destination) => destination.location,
          mapFrom((source) => {
            return {
              latitude: source.latitude,
              longitude: source.longitude,
              geo_hash: source.geoHash,
            };
          }),
        ),
        forMember(
          (destination) => destination.isReacted,
          condition((source) => source.isReacted, false),
        ),
      );
    };
  }
}
