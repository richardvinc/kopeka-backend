import Joi from 'joi';

import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  const values = {
    DB_PORT: process.env.DB_PORT,
    POSTGRES_URL: process.env.POSTGRES_URL,
  };

  const schema = Joi.object({
    DB_PORT: Joi.string().required(),
    POSTGRES_URL: Joi.string().required(),
  });

  const { error } = schema.validate(values);
  if (error) {
    throw error;
  }

  return values;
});
