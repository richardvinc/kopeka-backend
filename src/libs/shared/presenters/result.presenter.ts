export class BasePaginatedResult<T> {
  data: T;
  nextToken?: string | null;

  constructor(data: T, nextToken?: string | null) {
    this.data = data;
    this.nextToken = nextToken;
  }
}

export class BaseResult<T> {
  data: T | null;

  constructor(data: T | null) {
    this.data = data;
  }
}
