import * as Yup from 'yup';

export const deviceSchema = Yup.object().shape({
  name: Yup.string()
    .strict()
    .typeError('Name must be a string')
    .min(1, 'Name must have at least 1 character')
    .required('Name is required'),
  type: Yup.string()
    .strict()
    .typeError('Type must be a string')
    .min(1, 'Type must have at least 1 character')
    .required('Type is required'),
  status: Yup.boolean().strict().typeError('Status must be a boolean').required('Status is required'),
  model: Yup.string()
    .strict()
    .typeError('Model must be a string')
    .min(1, 'Model must have at least 1 character')
    .required('Model is required')
});

export const deviceUpdateSchema = Yup.object().shape({
  name: Yup.string().strict().typeError('Name must be a string').min(1, 'Name must have at least 1 character'),
  type: Yup.string().strict().typeError('Type must be a string').min(1, 'Type must have at least 1 character'),
  status: Yup.boolean().strict().typeError('Status must be a boolean'),
  model: Yup.string().strict().typeError('Model must be a string').min(1, 'Model must have at least 1 character')
});
