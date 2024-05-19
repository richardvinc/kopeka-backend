import * as Joi from 'joi';

import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => {
  const values = {
    JWT_SECRET: process.env.JWT_SECRET,
  };

  const schema = Joi.object({
    JWT_SECRET: Joi.string().required(),
  });

  const { error } = schema.validate(values);
  if (error) {
    throw error;
  }

  return values;
});
