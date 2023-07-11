import * as yup from 'yup';

export const conversationValidationSchema = yup.object().shape({
  start_time: yup.date().required(),
  end_time: yup.date().required(),
  organization_id: yup.string().nullable(),
});
