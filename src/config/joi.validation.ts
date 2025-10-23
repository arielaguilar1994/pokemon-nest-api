import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  MONGODB: Joi.required(),
  DB_NAME: Joi.required(),
  PORT: Joi.number().default(3002),
  DEFAULT_LIMIT: Joi.number().default(3)
});