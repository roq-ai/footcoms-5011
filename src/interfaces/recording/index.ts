import { ConversationInterface } from 'interfaces/conversation';
import { GetQueryInterface } from 'interfaces';

export interface RecordingInterface {
  id?: string;
  conversation_id?: string;
  file_path: string;
  upload_time: any;
  created_at?: any;
  updated_at?: any;

  conversation?: ConversationInterface;
  _count?: {};
}

export interface RecordingGetQueryInterface extends GetQueryInterface {
  id?: string;
  conversation_id?: string;
  file_path?: string;
}
