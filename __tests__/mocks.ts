import { IUnitTestResult } from '../src/interfaces/unit-test-result.type'
import { ISummaryResult } from '../src/interfaces/summary-result.type'

export const mockUnitTestResult: IUnitTestResult = {
  testId: '1',
  testDomainStartTime: new Date('2024-03-12T10:00:00Z'),
  testDomainEndTime: new Date('2024-03-12T10:30:00Z'),
  testDomain: 'Example Domain',
  featureName: 'Example Feature',
  testFullName: 'Example Test',
  testName: 'exampleTest',
  testParameters: 'param1, param2',
  outcome: 'passed',
  duration: 1500, // duration in milliseconds
  startTime: new Date('2024-03-12T10:05:00Z'),
  endTime: new Date('2024-03-12T10:10:00Z'),
  stdout: 'Example output',
  gherkinLogs: [
    {
      key: '1',
      step: 'Given I have a scenario',
      status: 'passed',
      time: '2024-03-12T10:06:00Z',
      log: ['Step passed successfully'],
      attachments: [
        'B2C_SignInAndSignUp\\SignUp_2024_12_3__05_13_24_113\\20240312_051645_screenshot.png'
      ]
    },
    {
      key: '2',
      step: 'When I perform an action',
      status: 'passed',
      time: '2024-03-12T10:08:00Z',
      log: ['Action performed successfully']
    }
  ],
  attachmentFiles: [
    {
      filePath: '/path/to/attachment1.jpg',
      fileName: 'attachment1.jpg',
      base64Data: 'base64EncodedData...',
      fileType: 'image/jpeg'
    }
  ],
  errMsg: null,
  rerun: false
}

export const mockSummaryResult: ISummaryResult = {
  domain: 'Example Domain',
  total: 10,
  passed: 8,
  failed: 1,
  ignored: 1,
  duration: 30000, // duration in milliseconds
  startDate: new Date('2024-03-12T09:00:00Z'),
  endDate: new Date('2024-03-12T09:30:00Z')
}
