import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { GPSLocation } from '../domains/report.domain';
import { GPSLocationDTO } from '../presenters/report.presenter';

@Injectable()
export class GPSLocationMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (map) => {
      createMap(map, GPSLocation, GPSLocationDTO);
      createMap(map, GPSLocationDTO, GPSLocation);
    };
  }
}
