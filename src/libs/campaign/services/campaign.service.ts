import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CampaignEntity } from '../entities/campaign.entity';

@Injectable()
export class CampaignService {
  constructor(
    @InjectRepository(CampaignEntity)
    private readonly campaignRepository: Repository<CampaignEntity>,
  ) {}

  async generateUniqueCampaignShortcode() {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
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
