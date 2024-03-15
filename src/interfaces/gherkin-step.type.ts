export interface IGherkinStep {
  key: string;
  step: string;
  status: string;
  time: string;
  log: string[];
  attachments?: string[];
  table?: string[];
}
