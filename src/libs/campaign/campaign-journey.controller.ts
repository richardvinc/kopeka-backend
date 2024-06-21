import { User } from '@libs/auth/decorators/user.decorator';
import { FirebaseAuthGuard } from '@libs/auth/guards/firebase-auth.guard';
import { IUserIdentity } from '@libs/auth/interfaces/user.interface';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { PostUserLocationDTO } from './use-cases/post-user-location/post-user-location.dto';
import { PostUserLocationUseCase } from './use-cases/post-user-location/post-user-location.use-case';

@Controller('campaigns/journey')
@UseGuards(FirebaseAuthGuard)
export class CampaignJourneyController {
  constructor(private postUserLocationUseCase: PostUserLocationUseCase) {}

  @Post('/location')
  async postUserLocation(
    @Body() dto: PostUserLocationDTO,
    @User() user: IUserIdentity,
  ) {
    return await this.postUserLocationUseCase.execute({
      ...dto,
      userId: user.id,
    });
  }
}
