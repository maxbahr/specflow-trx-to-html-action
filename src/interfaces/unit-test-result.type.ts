import { IAttachmentBase64 } from './attachment-base64.type'
import { IGherkinStep } from './gherkin-step.type'

export interface IUnitTestResult {
  testId: string
  testDomainStartTime: Date
  testDomainEndTime: Date
  testDomain: string
  featureName: string
  testFullName: string
  testName: string
  testParameters: string
  outcome: string
  duration: number
  startTime: Date
  endTime: Date
  stdout: string | null
  gherkinLogs: IGherkinStep[] | null
  attachmentFiles?: IAttachmentBase64[]
  errMsg: string | null
  rerun: boolean
  previousRun?: IUnitTestResult
}
