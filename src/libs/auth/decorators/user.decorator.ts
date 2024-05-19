import { createParamDecorator } from '@nestjs/common';

import { IUserIdentity } from '../interfaces/user.interface';

export const User = createParamDecorator(
  <T extends IUserIdentity>(data: unknown, req): T => {
    const request = req.switchToHttp().getRequest();
    if (!request.user) {
      throw new Error('Cannot obtained user from request object');
    }

    return request.user as T;
  },
);
