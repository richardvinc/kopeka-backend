export abstract class BaseUseCase<TRequest, TResponse> {
  abstract execute(dto: TRequest): Promise<TResponse> | TResponse;
}
