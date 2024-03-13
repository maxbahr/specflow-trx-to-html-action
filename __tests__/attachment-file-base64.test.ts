import { AttachmentFilesBase64 } from '../src/attachment-file-base64.class'
import { IUnitTestResult } from '../src/interfaces/unit-test-result.type'
import { mockUnitTestResult } from './mocks'

describe('AttachmentFilesBase64', () => {
  describe('addAttachmentFilesAsync', () => {
    const mockTest: IUnitTestResult = mockUnitTestResult

    const mockFilePaths = [
      '__tests__/attachments/TestData/B2C_SignInAndSignUp/SignUp_2024_12_3__05_13_24_113/20240312_051645_screenshot.png',
      'path/to/attachment2.txt'
    ]

    it('should add attachment files to tests', async () => {
      const result = await AttachmentFilesBase64.addAttachmentFilesAsync(
        [mockTest],
        mockFilePaths
      )

      expect(result[0].attachmentFiles).toHaveLength(1) // Assuming only one of the attachments is an image
      expect(result[0].attachmentFiles![0].fileName).toEqual(
        '20240312_051645_screenshot.png'
      )
      expect(result[0].attachmentFiles![0].fileType).toContain('image')
      expect(result[0].attachmentFiles![0].base64Data).toBeDefined()
    })

    it('should handle error when attachment file not found', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error')
      const mockTestWithError: IUnitTestResult = mockUnitTestResult
      if (mockTestWithError.gherkinLogs) {
        mockTestWithError.gherkinLogs[1].attachments = [
          'path/to/attachment2.txt'
        ]
      }

      await AttachmentFilesBase64.addAttachmentFilesAsync(
        [mockTestWithError],
        mockFilePaths
      )

      expect(consoleErrorSpy).toHaveBeenCalled()
    })
  })
})
