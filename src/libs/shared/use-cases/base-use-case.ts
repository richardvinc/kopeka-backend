import {
  BasePaginatedResult,
  BaseResult,
} from '../presenters/result.presenter';

export abstract class BaseUseCase<TRequest, TResponse> {
  abstract execute(
    dto: TRequest,
  ):
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
    nextToken?: string,
  ): BasePaginatedResult<TResponse> {
    return {
      data,
      nextToken,
    };
  }
}
