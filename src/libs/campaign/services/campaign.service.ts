import { DataSource, LessThanOrEqual, QueryRunner, Repository } from 'typeorm';

import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { UserDomain } from '@libs/users/domains/user.domain';
import { UserEntity } from '@libs/users/entities/user.entity';
import { UserError } from '@libs/users/errors/user.error';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CampaignMembershipDomain } from '../domain/campaign-membership.domain';
import { CampaignDomain } from '../domain/campaign.domain';
import { CampaignMembershipEntity } from '../entities/campaign-membership.entity';
import { CampaignEntity } from '../entities/campaign.entity';
import { CampaignError } from '../errors/campaign.error';

@Injectable()
export class CampaignService {
  private readonly logger = new Logger(CampaignService.name);
  constructor(
    @InjectRepository(CampaignEntity)
    private readonly campaignRepository: Repository<CampaignEntity>,
    @InjectMapper()
    private readonly mapper: Mapper,
    private dataSource: DataSource,
  ) {}

  async createCampaign(campaign: CampaignDomain): Promise<CampaignDomain> {
    this.logger.log(`START: createCampaign`);
    this.logger.log(`Creating campaign: ${campaign}`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // since we're going to create a campaign, we can assume that the user is the first campaigner
      campaign.totalCampaigners = 1;

      // create campaign
      const savedCampaignEntity =
        await queryRunner.manager.save<CampaignEntity>(
          this.mapper.map(campaign, CampaignDomain, CampaignEntity),
        );

      // register user as campaign member
      const campaignMembershipEntity = this.mapper.map(
        new CampaignMembershipDomain({
          campaignId: savedCampaignEntity.id,
          userId: campaign.createdById,
          isCreator: true,
        }),
        CampaignMembershipDomain,
        CampaignMembershipEntity,
      );
      await queryRunner.manager.save(campaignMembershipEntity);

      // set user active campaign id
      const userEntity = await queryRunner.manager.findOne<UserEntity>(
        UserEntity,
        {
          where: { id: campaign.createdById },
        },
      );
      if (!userEntity) {
        this.logger.error(`User not found: ${campaign.createdById}`);
        throw new UserError.UserNotFound();
      }
      const userDomain = this.mapper.map(userEntity, UserEntity, UserDomain);
      userDomain.update({ activeCampaignId: savedCampaignEntity.id });
      await queryRunner.manager.save<UserEntity>(
        this.mapper.map(userDomain, UserDomain, UserEntity),
      );

      await queryRunner.commitTransaction();
      this.logger.log(`END: createCampaign`);
      return this.mapper.map(
        savedCampaignEntity,
        CampaignEntity,
        CampaignDomain,
      );
    } catch (error) {
      this.logger.error(`Error creating campaign: ${error}`);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async joinCampaign(campaignShortcode: string, userId: string) {
    this.logger.log(`START: joinCampaign`);
    this.logger.log(
      `Joining campaign with code: ${campaignShortcode} by user: ${userId}`,
    );
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const campaignEntity = await queryRunner.manager.findOne<CampaignEntity>(
        CampaignEntity,
        {
          where: { campaignShortcode },
        },
      );
      if (!campaignEntity) {
        this.logger.error(`Campaign not found: ${campaignShortcode}`);
        throw new CampaignError.CampaignNotFound();
      }
      const campaignDomain = this.mapper.map(
        campaignEntity,
        CampaignEntity,
        CampaignDomain,
      );

      const userEntity = await queryRunner.manager.findOne<UserEntity>(
        UserEntity,
        {
          where: { id: userId },
        },
      );
      if (!userEntity) {
        this.logger.error(`User not found: ${userId}`);
        throw new UserError.UserNotFound();
      }
      const userDomain = this.mapper.map(userEntity, UserEntity, UserDomain);
      if (userDomain.activeCampaignId) {
        this.logger.error(`User is already in a campaign: ${userId}`);
        throw new CampaignError.UserAlreadyInAnotherCampaign();
      }

      // update total campaigners
      campaignDomain.update({
        totalCampaigners: campaignDomain.totalCampaigners + 1,
      });
      await queryRunner.manager.save<CampaignEntity>(
        this.mapper.map(campaignDomain, CampaignDomain, CampaignEntity),
      );

      // register user as campaign member
      const campaignMembershipDomain = new CampaignMembershipDomain({
        campaignId: campaignDomain.id,
        userId,
      });
      await queryRunner.manager.save(
        this.mapper.map(
          campaignMembershipDomain,
          CampaignMembershipDomain,
          CampaignMembershipEntity,
        ),
      );

      // set user active campaign id
      userDomain.update({ activeCampaignId: campaignDomain.id });
      await queryRunner.manager.save<UserEntity>(
        this.mapper.map(userDomain, UserDomain, UserEntity),
      );

      await queryRunner.commitTransaction();
      this.logger.log(`END: joinCampaign`);
    } catch (error) {
      this.logger.error(`Error joining campaign: ${error}`);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async leaveCampaign(campaignShortcode: string, userId: string) {
    this.logger.log(`START: leaveCampaign`);
    this.logger.log(
      `Leaving campaign with code: ${campaignShortcode} by user: ${userId}`,
    );
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const campaignEntity = await queryRunner.manager.findOne<CampaignEntity>(
        CampaignEntity,
        {
          where: { campaignShortcode: campaignShortcode },
        },
      );
      if (!campaignEntity) {
        this.logger.error(`Campaign not found: ${campaignShortcode}`);
        throw new CampaignError.CampaignNotFound();
      }
      const campaignDomain = this.mapper.map(
        campaignEntity,
        CampaignEntity,
        CampaignDomain,
      );

      const userEntity = await queryRunner.manager.findOne<UserEntity>(
        UserEntity,
        {
          where: { id: userId },
        },
      );
      if (!userEntity) {
        this.logger.error(`User not found: ${userId}`);
        throw new UserError.UserNotFound();
      }
      const userDomain = this.mapper.map(userEntity, UserEntity, UserDomain);
      if (!userDomain.activeCampaignId) {
        this.logger.error(`User is not registered in any campaign: ${userId}`);
        throw new CampaignError.UserNotRegisteredInAnyCampaign();
      }

      // update total campaigners
      campaignDomain.update({
        totalCampaigners: campaignDomain.totalCampaigners - 1,
      });
      await queryRunner.manager.save<CampaignEntity>(
        this.mapper.map(campaignDomain, CampaignDomain, CampaignEntity),
      );

      // remove user as campaign member
      await queryRunner.manager.softDelete<CampaignMembershipEntity>(
        CampaignMembershipEntity,
        {
          campaignId: campaignDomain.id,
          userId,
        },
      );

      // set user active campaign id
      userDomain.update({ activeCampaignId: null });
      await queryRunner.manager.save<UserEntity>(
        this.mapper.map(userDomain, UserDomain, UserEntity),
      );

      await queryRunner.commitTransaction();
      this.logger.log(`END: leaveCampaign`);
    } catch (error) {
      this.logger.error(`Error leaving campaign: ${error}`);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getCampaignById(campaignId: string): Promise<CampaignDomain | null> {
    const entity = await this.campaignRepository.findOne({
      where: { id: campaignId },
    });

    if (!entity) throw new CampaignError.CampaignNotFound();

    return this.mapper.map(entity, CampaignEntity, CampaignDomain);
  }

  async getCampaignsByUserId(
    userId: string,
    isExpiredOnly?: true,
  ): Promise<CampaignDomain[]> {
    this.logger.log(`START: getCampaignsByUserId`);
    const qb = await this.campaignRepository.createQueryBuilder('campaign');
    qb.innerJoinAndSelect('campaign.memberships', 'memberships');
    qb.where('memberships.userId = :userId', { userId });
    qb.addOrderBy('campaign.createdAt', 'DESC');
    if (isExpiredOnly) qb.andWhere('campaign.endedAt IS NOT NULL');
    const entities = await qb.getMany();

    this.logger.log(`END: getCampaignsByUserId`);
    return this.mapper.mapArray(entities, CampaignEntity, CampaignDomain);
  }

  async getCampaignByShortcode(
    campaignShortcode: string,
  ): Promise<CampaignDomain | null> {
    const entity = await this.campaignRepository.findOne({
      where: { campaignShortcode },
    });

    if (!entity) throw new CampaignError.CampaignNotFound();

    return this.mapper.map(entity, CampaignEntity, CampaignDomain);
  }

  async endExpiredCampaigns(expiredDate: Date): Promise<string[]> {
    this.logger.log(`START: endExpiredCampaigns`);
    this.logger.log(`End campaign with expired date < ${expiredDate}`);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const campaigns = await this.campaignRepository.find({
        where: { expiredAt: LessThanOrEqual(expiredDate) },
      });
      this.logger.debug(`Found ${campaigns.length} campaigns to end`);
      this.logger.debug(campaigns);

      for (const campaign of campaigns) {
        await this.endCampaign(campaign.id, queryRunner);
      }
      await queryRunner.commitTransaction();

      return campaigns.map((campaign) => campaign.id);
    } catch (error) {
      this.logger.error(error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }

    this.logger.log(`END: endExpiredCampaigns`);
  }

  async endCampaign(
    campaignId: string,
    queryRunner?: QueryRunner,
  ): Promise<void> {
    let qr: QueryRunner | undefined;

    if (!queryRunner) {
      qr = this.dataSource.createQueryRunner();
      await qr.connect();
      await qr.startTransaction();
    } else {
      qr = queryRunner;
    }

    try {
      const campaign = await qr.manager.findOne<CampaignEntity>(
        CampaignEntity,
        {
          where: { id: campaignId },
        },
      );
      if (!campaign) {
        this.logger.error(`Campaign not found: ${campaignId}`);
        throw new CampaignError.CampaignNotFound();
      }

      campaign.endedAt = new Date();
      await qr.manager.save<CampaignEntity>(campaign);
      const memberships =
        await this.dataSource.manager.find<CampaignMembershipEntity>(
          CampaignMembershipEntity,
          {
            where: { campaignId },
          },
        );
      this.logger.debug(`Found ${memberships.length} memberships`);

      for (const membership of memberships) {
        const userEntity = await qr.manager.findOne<UserEntity>(UserEntity, {
          where: { id: membership.userId },
        });
        if (!userEntity) {
          this.logger.error(`User not found: ${membership.userId}`);
          throw new UserError.UserNotFound();
        }
        const userDomain = this.mapper.map(userEntity, UserEntity, UserDomain);
        userDomain.update({ activeCampaignId: null });
        await this.dataSource.manager.save<UserEntity>(
          this.mapper.map(userDomain, UserDomain, UserEntity),
        );
      }
      if (!queryRunner) await qr.commitTransaction();
    } catch (error) {
      this.logger.error(error);
      if (!queryRunner) await qr.rollbackTransaction();
      throw error;
    } finally {
      if (!queryRunner) await qr.release();
    }
  }

  async generateUniqueCampaignShortcode() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;

    while (!result || (await this.checkIfShortcodeExists(result))) {
      result = '';
      for (let i = 0; i < 6; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength),
        );
      }
    }

    return result;
  }

  private async checkIfShortcodeExists(campaignShortcode: string) {
    const campaign = await this.campaignRepository.findOne({
      where: { campaignShortcode },
    });

    return campaign;
  }
}
