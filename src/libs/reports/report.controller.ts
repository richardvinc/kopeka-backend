import { User } from '@libs/auth/decorators/user.decorator';
import { FirebaseAuthGuard } from '@libs/auth/guards/firebase-auth.guard';
import { IUserIdentity } from '@libs/auth/interfaces/user.interface';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { CreateReportDTO } from './use-cases/create-report.dto';
import { CreateReportUseCase } from './use-cases/create-report.use-case';

@UseGuards(FirebaseAuthGuard)
@Controller('reports')
export class ReportController {
  constructor(private createReportUseCase: CreateReportUseCase) {}

  @Post()
  async createNewReport(
    @User() user: IUserIdentity,
    @Body() dto: CreateReportDTO,
  ) {
    return this.createReportUseCase.execute({ ...dto, reportedById: user.id });
  }
}
