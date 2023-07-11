import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createRecording } from 'apiSdk/recordings';
import { Error } from 'components/error';
import { recordingValidationSchema } from 'validationSchema/recordings';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ConversationInterface } from 'interfaces/conversation';
import { getConversations } from 'apiSdk/conversations';
import { RecordingInterface } from 'interfaces/recording';

function RecordingCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: RecordingInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createRecording(values);
      resetForm();
      router.push('/recordings');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<RecordingInterface>({
    initialValues: {
      file_path: '',
      upload_time: new Date(new Date().toDateString()),
      conversation_id: (router.query.conversation_id as string) ?? null,
    },
    validationSchema: recordingValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Recording
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="file_path" mb="4" isInvalid={!!formik.errors?.file_path}>
            <FormLabel>File Path</FormLabel>
            <Input type="text" name="file_path" value={formik.values?.file_path} onChange={formik.handleChange} />
            {formik.errors.file_path && <FormErrorMessage>{formik.errors?.file_path}</FormErrorMessage>}
          </FormControl>
          <FormControl id="upload_time" mb="4">
            <FormLabel>Upload Time</FormLabel>
            <Box display="flex" maxWidth="100px" alignItems="center">
              <DatePicker
                dateFormat={'dd/MM/yyyy'}
                selected={formik.values?.upload_time ? new Date(formik.values?.upload_time) : null}
                onChange={(value: Date) => formik.setFieldValue('upload_time', value)}
              />
              <Box zIndex={2}>
                <FiEdit3 />
              </Box>
            </Box>
          </FormControl>
          <AsyncSelect<ConversationInterface>
            formik={formik}
            name={'conversation_id'}
            label={'Select Conversation'}
            placeholder={'Select Conversation'}
            fetcher={getConversations}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.start_time}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'recording',
    operation: AccessOperationEnum.CREATE,
  }),
)(RecordingCreatePage);
