import { User } from '@libs/auth/decorators/user.decorator';
import { FirebaseAuthGuard } from '@libs/auth/guards/firebase-auth.guard';
import { IUserIdentity } from '@libs/auth/interfaces/user.interface';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { CreateCampaignDTO } from './use-cases/create-campaign/create-campaign.dto';
import { CreateCampaignUseCase } from './use-cases/create-campaign/create-campaign.use-case';
import { GetCampaignByIdDTO } from './use-cases/get-campaign-by-id/get-campaign-by-id.dto';
import { GetCampaignByIdUseCase } from './use-cases/get-campaign-by-id/get-campaign-by-id.use-case';

@Controller('campaign')
@UseGuards(FirebaseAuthGuard)
export class CampaignController {
  constructor(
    private getCampaignByIdUseCase: GetCampaignByIdUseCase,
    private createCampaignUseCase: CreateCampaignUseCase,
  ) {}

  @Get('/:campaignId')
  async getCampaignById(@Param() dto: GetCampaignByIdDTO) {
    return await this.getCampaignByIdUseCase.execute({ ...dto });
  }

  @Post()
  async createCampaign(
    @User() user: IUserIdentity,
    @Body() dto: CreateCampaignDTO,
  ) {
    return await this.createCampaignUseCase.execute({
      ...dto,
      userId: user.id,
    });
  }
}
