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
    // console.log('statusAnswer validation: ', result);
    return result;
  } catch (err) {
    // console.log('statusAnswer validation error: ', err.details);
    return err.details;
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
      console.log('statusAnswer validation: ', result);
      return result;
    } catch (err) {
      console.log('statusAnswer validation error: ', { catchError: err.details });
      return { catchError: err.details };
    }
  } else {
    try {
      result = await schemaForObject.validateAsync(data);
      console.log('statusAnswer validation: ', result);
      return result;
    } catch (err) {
      console.log('statusAnswer validation error: ', { catchError: err.details });
      return { catchError: err.details };
    }
  }
};


// statusAnswerValidation(true, '01', 'Authentication failed', 'some value');
// statusAnswerValidation(true, '01', 'Authentication failed', null);
// encodeDataValidation();
