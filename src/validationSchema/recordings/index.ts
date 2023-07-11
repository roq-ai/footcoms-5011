import * as yup from 'yup';

export const recordingValidationSchema = yup.object().shape({
  file_path: yup.string().required(),
  upload_time: yup.date().required(),
  conversation_id: yup.string().nullable(),
});
