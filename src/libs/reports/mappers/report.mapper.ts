import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { UserDomain } from '@libs/users/domains/user.domain';
import { UserEntity } from '@libs/users/entities/user.entity';
import { UserPresenterMinimalDTO } from '@libs/users/presenters/user.presenter';
import { Injectable } from '@nestjs/common';

import { GPSLocation, ReportDomain } from '../domains/report.domain';
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
          (destination) => destination.lat,
          mapFrom((source) => source.location.lat),
        ),
        forMember(
          (destination) => destination.lon,
          mapFrom((source) => source.location.lon),
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
              lat: source.location.lat,
              lon: source.location.lon,
              geo_hash: source.location.geoHash,
            };
          }),
        ),
      );

      createMap(
        map,
        ReportEntity,
        ReportDomain,
        forMember(
          (destination) => destination.location,
          mapFrom((source) => {
            return new GPSLocation(source.lat, source.lon, source.geoHash);
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
              lat: source.lat,
              lon: source.lon,
              geo_hash: source.geoHash,
            };
          }),
        ),
      );
    };
  }
}
