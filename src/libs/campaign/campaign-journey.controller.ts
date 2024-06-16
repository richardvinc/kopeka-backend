import { User } from '@libs/auth/decorators/user.decorator';
import { IUserIdentity } from '@libs/auth/interfaces/user.interface';
import { Body, Controller, Post } from '@nestjs/common';

import { PostUserLocationDTO } from './use-cases/post-user-location/post-user-location.dto';
import { PostUserLocationUseCase } from './use-cases/post-user-location/post-user-location.use-case';

@Controller('campaigns/journey')
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
