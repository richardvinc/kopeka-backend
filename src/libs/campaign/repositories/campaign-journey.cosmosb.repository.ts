import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Container } from '@azure/cosmos';
import { BaseRepository } from '@libs/shared/repositories/base-repository';
import { InjectModel } from '@nestjs/azure-database';
import { Injectable } from '@nestjs/common';

import { CAMPAIGN_JOURNEY_TABLE_NAME } from '../campaign.constant';
import { CampaignJourneyDomain } from '../domain/campaign-journey.domain';
import { CampaignJourneyCosmosdbEntity } from '../entities/campaign-journey.cosmosdb-entity';

@Injectable()
export class CampaignJourneyCosmosdbRepository
  implements BaseRepository<CampaignJourneyDomain>
{
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    @InjectModel(CampaignJourneyCosmosdbEntity)
    private eventContainer: Container,
  ) {}

  async findAll(): Promise<CampaignJourneyDomain[]> {
    const { resources } = await this.eventContainer.items
      .query<CampaignJourneyCosmosdbEntity>({
        query: `SELECT * FROM ${CAMPAIGN_JOURNEY_TABLE_NAME}`,
      })
      .fetchAll();

    return this.mapper.mapArray(
      resources,
      CampaignJourneyCosmosdbEntity,
      CampaignJourneyDomain,
    );
  }

  async findAllByShortcode(
    shortcode: string,
  ): Promise<CampaignJourneyDomain[]> {
    const { resources } = await this.eventContainer.items
      .query<CampaignJourneyCosmosdbEntity>({
        query: `SELECT * FROM ${CAMPAIGN_JOURNEY_TABLE_NAME} c WHERE c.campaignShortcode = @shortcode`,
        parameters: [{ name: '@shortcode', value: shortcode }],
      })
      .fetchAll();

    return this.mapper.mapArray(
      resources,
      CampaignJourneyCosmosdbEntity,
      CampaignJourneyDomain,
    );
  }

  async findById(id: string): Promise<CampaignJourneyDomain | null> {
    const { resource } = await this.eventContainer
      .item(id)
      .read<CampaignJourneyCosmosdbEntity>();

    return resource
      ? this.mapper.map(
          resource,
          CampaignJourneyCosmosdbEntity,
          CampaignJourneyDomain,
        )
      : null;
  }

  async create(journey: CampaignJourneyDomain): Promise<CampaignJourneyDomain> {
    const entity = this.mapper.map(
      journey,
      CampaignJourneyDomain,
      CampaignJourneyCosmosdbEntity,
    );

    const { resource } =
      await this.eventContainer.items.create<CampaignJourneyCosmosdbEntity>(
        entity,
      );

    return this.mapper.map(
      resource,
      CampaignJourneyCosmosdbEntity,
      CampaignJourneyDomain,
    );
  }

  async update(journey: CampaignJourneyDomain): Promise<CampaignJourneyDomain> {
    const entity = this.mapper.map(
      journey,
      CampaignJourneyDomain,
      CampaignJourneyCosmosdbEntity,
    );

    const { resource } = await this.eventContainer
      .item(entity.id)
      .replace<CampaignJourneyCosmosdbEntity>(entity);

    return this.mapper.map(
      resource,
      CampaignJourneyCosmosdbEntity,
      CampaignJourneyDomain,
    );
  }

  async delete(id: string): Promise<void> {
    await this.eventContainer.item(id).delete();
  }
}
