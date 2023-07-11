import { RecordingInterface } from 'interfaces/recording';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface ConversationInterface {
  id?: string;
  start_time: any;
  end_time: any;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  recording?: RecordingInterface[];
  organization?: OrganizationInterface;
  _count?: {
    recording?: number;
  };
}

export interface ConversationGetQueryInterface extends GetQueryInterface {
  id?: string;
  organization_id?: string;
}
