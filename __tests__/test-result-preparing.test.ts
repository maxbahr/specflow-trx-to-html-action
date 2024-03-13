import { TestResultPreparing } from '../src/test-result-preparing.class'
import { TrxParser } from '../src/trx-parser.class'
import { AttachmentFilesBase64 } from '../src/attachment-file-base64.class'
import { IUnitTestResult } from '../src/interfaces/unit-test-result.type'
import { mockUnitTestResult } from './mocks'

jest.mock('../src/trx-parser.class')
jest.mock('../src/attachment-file-base64.class')

describe('TestResultPreparing', () => {
  describe('prepareUnitTestResult', () => {
    test('should prepare unit test results from TRX files and attachment files', async () => {
      const trxFiles = ['test1.trx', 'test2.trx']
      const attachmentFiles = ['attachment1.txt', 'attachment2.txt']
      const mockedUnitTestResults: IUnitTestResult[] = [mockUnitTestResult]

      ;(TrxParser.parseTRXFileAsync as jest.Mock).mockResolvedValueOnce(
        mockedUnitTestResults
      )
      ;(
        AttachmentFilesBase64.addAttachmentFilesAsync as jest.Mock
      ).mockResolvedValueOnce(mockedUnitTestResults)

      const unitTestResults = await TestResultPreparing.prepareUnitTestResult(
        trxFiles,
        attachmentFiles
      )

      expect(unitTestResults).toEqual(mockedUnitTestResults)
      expect(TrxParser.parseTRXFileAsync).toHaveBeenCalledWith('test1.trx')
      expect(TrxParser.parseTRXFileAsync).toHaveBeenCalledWith('test2.trx')
      expect(
        AttachmentFilesBase64.addAttachmentFilesAsync
      ).toHaveBeenCalledWith(mockedUnitTestResults, attachmentFiles)
    })
  })
})
