import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { UserDomain } from '@libs/users/domains/user.domain';
import { UserEntity } from '@libs/users/entities/user.entity';
import { UserPresenterMinimalDTO } from '@libs/users/presenters/user.presenter';
import { Injectable } from '@nestjs/common';

import { CampaignJourneyDomain } from '../domain/campaign-journey.domain';
import { CampaignMembershipDomain } from '../domain/campaign-membership.domain';
import { CampaignDomain } from '../domain/campaign.domain';
import { CampaignJourneyCosmosdbEntity } from '../entities/campaign-journey.cosmosdb-entity';
import { CampaignMembershipEntity } from '../entities/campaign-membership.entity';
import { CampaignEntity } from '../entities/campaign.entity';
import { CampaignPresenterDTO } from '../presenters/campaign.presenter';

@Injectable()
export class CampaignMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (map) => {
      createMap(
        map,
        CampaignDomain,
        CampaignEntity,
        forMember(
          (destination) => destination.creator,
          mapFrom((source) =>
            this.mapper.map(source.user, UserDomain, UserEntity),
          ),
        ),
      );
      createMap(
        map,
        CampaignEntity,
        CampaignDomain,
        forMember(
          (destination) => destination.user,
          mapFrom((source) =>
            this.mapper.map(source.creator, UserEntity, UserDomain),
          ),
        ),
      );

      createMap(map, CampaignMembershipDomain, CampaignMembershipEntity);
      createMap(map, CampaignMembershipEntity, CampaignMembershipDomain);

      createMap(
        map,
        CampaignDomain,
        CampaignPresenterDTO,
        forMember(
          (destination) => destination.createdBy,
          mapFrom((source) =>
            this.mapper.map(source.user, UserDomain, UserPresenterMinimalDTO),
          ),
        ),
      );

      createMap(
        map,
        CampaignEntity,
        CampaignPresenterDTO,
        forMember(
          (destination) => destination.createdBy,
          mapFrom((source) =>
            this.mapper.map(
              source.creator,
              UserEntity,
              UserPresenterMinimalDTO,
            ),
          ),
        ),
      );

      createMap(
        map,
        CampaignJourneyDomain,
        CampaignJourneyCosmosdbEntity,
        forMember(
          (destination) => destination.location,
          mapFrom((source) => {
            return {
              type: 'Point',
              // coordinate order is longitude, latitude
              coordinates: [source.location.lng, source.location.lat],
            };
          }),
        ),
      );
      createMap(
        map,
        CampaignJourneyCosmosdbEntity,
        CampaignJourneyDomain,
        forMember(
          (destination) => destination.location,
          mapFrom((source) => {
            return {
              lng: source.location.coordinates[0],
              lat: source.location.coordinates[1],
            };
          }),
        ),
      );
    };
  }
}
