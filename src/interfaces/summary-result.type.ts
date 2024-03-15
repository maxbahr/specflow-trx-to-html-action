export interface ISummaryResult {
  domain: string;
  total: number;
  passed: number;
  failed: number;
  ignored: number;
  duration: number;
  startDate: Date;
  endDate: Date;
}
