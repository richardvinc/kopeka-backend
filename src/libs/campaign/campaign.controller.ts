import { User } from '@libs/auth/decorators/user.decorator';
import { FirebaseAuthGuard } from '@libs/auth/guards/firebase-auth.guard';
import { IUserIdentity } from '@libs/auth/interfaces/user.interface';
import { DateUtils } from '@libs/shared/utils/date.utils';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { CreateCampaignDTO } from './use-cases/create-campaign/create-campaign.dto';
import { CreateCampaignUseCase } from './use-cases/create-campaign/create-campaign.use-case';
import { EndCampaignUseCase } from './use-cases/end-campaign/end-campaign.use-case';
import { EndExpiredCampaignsUseCase } from './use-cases/end-expired-campaigns/end-expired-campaigns.use-case';
import { GetCampaignByIdDTO } from './use-cases/get-campaign-by-id/get-campaign-by-id.dto';
import { GetCampaignByIdUseCase } from './use-cases/get-campaign-by-id/get-campaign-by-id.use-case';
import { GetCampaignByShortcodeDTO } from './use-cases/get-campaign-by-shortcode/get-campaign-by-shortcode.dto';
import { GetCampaignByShortcodeUseCase } from './use-cases/get-campaign-by-shortcode/get-campaign-by-shortcode.use-case';
import { GetPastUserCampaignsUseCase } from './use-cases/get-past-user-campaigns/get-past-user-campaigns.use-case';
import { JoinCampaignDTO } from './use-cases/join-campaign/join-campaign.dto';
import { JoinCampaignUseCase } from './use-cases/join-campaign/join-campaign.use-case';
import { LeaveCampaignDTO } from './use-cases/leave-campaign/leave-campaign.dto';
import { LeaveCampaignUseCase } from './use-cases/leave-campaign/leave-campaign.use-case';

@Controller('campaigns')
@UseGuards(FirebaseAuthGuard)
export class CampaignController {
  constructor(
    private getCampaignByIdUseCase: GetCampaignByIdUseCase,
    private getCampaignByShortcodeUseCase: GetCampaignByShortcodeUseCase,
    private createCampaignUseCase: CreateCampaignUseCase,
    private endCampaignUseCase: EndCampaignUseCase,
    private joinCampaignUseCase: JoinCampaignUseCase,
    private leaveCampaignUseCase: LeaveCampaignUseCase,
    private endExpiredCampaignsUseCase: EndExpiredCampaignsUseCase,
    private getPastUserCampaignsUseCase: GetPastUserCampaignsUseCase,
  ) {}

  @Get('/id/:campaignId')
  async getCampaignById(@Param() dto: GetCampaignByIdDTO) {
    return await this.getCampaignByIdUseCase.execute({ ...dto });
  }

  @Get('/me/past')
  async getPastCampaignsByUserId(@User() user: IUserIdentity) {
    return await this.getPastUserCampaignsUseCase.execute({ userId: user.id });
  }

  @Get('/shortcode/:campaignShortcode')
  async getCampaignByShortcode(@Param() dto: GetCampaignByShortcodeDTO) {
    return await this.getCampaignByShortcodeUseCase.execute({ ...dto });
  }

  @Post('/shortcode/:campaignShortcode/join')
  async joinCampaignByShortcode(
    @User() user: IUserIdentity,
    @Param() dto: JoinCampaignDTO,
  ) {
    return await this.joinCampaignUseCase.execute({ ...dto, userId: user.id });
  }

  @Post('/shortcode/:campaignShortcode/leave')
  async leaveCampaignByShortcode(
    @User() user: IUserIdentity,
    @Param() dto: LeaveCampaignDTO,
  ) {
    return await this.leaveCampaignUseCase.execute({ ...dto, userId: user.id });
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

  @Post('/id/:campaignId/end')
  async endCampaignById(
    @User() user: IUserIdentity,
    @Param() dto: GetCampaignByIdDTO,
  ) {
    return await this.endCampaignUseCase.execute({ ...dto, userId: user.id });
  }

  @Cron('0 10 17 * * *')
  async endExpiredCampaign() {
    return await this.endExpiredCampaignsUseCase.execute({
      expiredDate: DateUtils.getCurrentLocalDate(),
    });
  }
}
