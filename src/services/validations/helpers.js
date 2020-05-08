import Joi from '@hapi/joi';

export const statusAnswerValidation = async (error, status, text, value) => {
  const schema = Joi.object({
    error: Joi.boolean()
      .required(),

    status: Joi.string()
      .required(),

    text: Joi.string()
      .required(),

    value: Joi.alternatives().try(Joi.string(), Joi.object()).allow(null),
    // value: Joi.string()
    //   .allow(null),
  });

  try {
    const result = await schema.validateAsync({
      error, status, text, value,
    });

    return result;
  } catch (err) {
    return { catchError: err.details };
  }
};

export const encodeDataValidation = async (data) => {
  let result = null;
  const schemaForObject = Joi.object()
    .required();
  const schemaForString = Joi.string()
    .required();
  if (typeof data === 'string') {
    try {
      result = await schemaForString.validateAsync(data);
      return result;
    } catch (err) {
      return { catchError: err.details };
    }
  } else {
    try {
      result = await schemaForObject.validateAsync(data);
      return result;
    } catch (err) {
      return { catchError: err.details };
    }
  }
};
