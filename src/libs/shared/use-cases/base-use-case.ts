import { Logger } from '@nestjs/common';

import {
  BasePaginatedResult,
  BaseResult,
} from '../presenters/result.presenter';

export abstract class BaseUseCase<TRequest, TResponse> {
  useCaseName: string;
  logger: Logger;

  constructor(useCaseName: string) {
    this.useCaseName = useCaseName;
    this.logger = new Logger(this.useCaseName);
  }

  abstract execute(
    dto: TRequest,
  ):
    | Promise<TResponse>
    | TResponse
    | Promise<BaseResult<TResponse>>
    | BaseResult<TResponse>
    | Promise<BasePaginatedResult<TResponse>>
    | BasePaginatedResult<TResponse>
    | Promise<void>
    | void;

  protected ok(data: TResponse): BaseResult<TResponse> {
    return {
      data,
    };
  }

  protected paginatedOk(
    data: TResponse,
    nextToken?: string | null,
  ): BasePaginatedResult<TResponse> {
    return {
      data,
      nextToken,
    };
  }

  protected logStartExecution(dto?: TRequest): void {
    this.logger.log(`START: execute`);
    if (dto) this.logger.log(`dto: ${JSON.stringify(dto)}`);
  }

  protected logEndExecution(): void {
    this.logger.log(`END: execute`);
  }
}
