import { randomUUID } from 'crypto';

export class BaseDomain<T> {
  _id: string;
  _props: T;

  constructor(props: T, id?: string) {
    this._id = id ?? randomUUID();
    this._props = props;
  }

  public get id() {
    return this._id;
  }

  public get props() {
    return this._props;
  }
}
