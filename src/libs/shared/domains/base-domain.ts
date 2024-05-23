import { randomUUID } from 'crypto';

import { AutoMap } from '@automapper/classes';

export class BaseDomain {
  @AutoMap()
  readonly id: string;
  @AutoMap()
  createdAt?: Date;
  @AutoMap()
  updatedAt?: Date;
  @AutoMap()
  deletedAt?: Date;

  constructor(id?: string) {
    this.id = id ?? randomUUID();
    this.createdAt = new Date();
  }
}
