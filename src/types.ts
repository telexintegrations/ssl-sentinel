export interface Setting {
  label: string;
  type: string;
  required: string;
  default: string;
}

export interface MonitorPayload {
  channel_id: string;
  return_url: string;
  settings: Setting[];
}
