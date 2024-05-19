import * as Joi from 'joi';

import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  const values = {
    PG_DATABASE_URL: process.env.PG_DATABASE_URL,
  };

  const schema = Joi.object({
    PG_DATABASE_URL: Joi.string().required(),
  });

  const { error } = schema.validate(values);
  if (error) {
    throw error;
  }

  return values;
});
