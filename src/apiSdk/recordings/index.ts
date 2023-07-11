import axios from 'axios';
import queryString from 'query-string';
import { RecordingInterface, RecordingGetQueryInterface } from 'interfaces/recording';
import { GetQueryInterface } from '../../interfaces';

export const getRecordings = async (query?: RecordingGetQueryInterface) => {
  const response = await axios.get(`/api/recordings${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createRecording = async (recording: RecordingInterface) => {
  const response = await axios.post('/api/recordings', recording);
  return response.data;
};

export const updateRecordingById = async (id: string, recording: RecordingInterface) => {
  const response = await axios.put(`/api/recordings/${id}`, recording);
  return response.data;
};

export const getRecordingById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/recordings/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteRecordingById = async (id: string) => {
  const response = await axios.delete(`/api/recordings/${id}`);
  return response.data;
};
