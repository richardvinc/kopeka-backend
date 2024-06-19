import { Reflector } from '@nestjs/core';

export const Admin = Reflector.createDecorator<boolean>({
  key: 'admin',
});
