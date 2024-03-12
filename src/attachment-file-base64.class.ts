import path from 'path'
import fs from 'fs/promises'
import sharp from 'sharp'
import { IUnitTestResult } from './interfaces/unit-test-result.type'
import { IAttachmentBase64 } from './interfaces/attachment-base64.type'

// eslint-disable-next-line import/no-commonjs, @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
const { fileTypeFromBuffer } = require('file-type')

export class AttachmentFilesBase64 {
  static async addAttachmentFilesAsync(
    tests: IUnitTestResult[],
    filePaths: string[]
  ): Promise<IUnitTestResult[]> {
    const dirToStart = 'TestData'

    for (const test of tests) {
      const gherkinAttachments = test.gherkinLogs
        ?.filter(a => a.attachments && a.attachments.length > 0)
        .flatMap(m => m.attachments)
      if (gherkinAttachments) {
        const files: IAttachmentBase64[] = []

        for (const gherkinFilePath of gherkinAttachments) {
          if (gherkinFilePath) {
            const testDataIndex = gherkinFilePath.indexOf(dirToStart)
            const truncatedPath = gherkinFilePath
              .substring(testDataIndex)
              .replace(/\//g, '\\')
            const filePath = filePaths.find(f => f.endsWith(truncatedPath))
            if (filePath) {
              let fileBase64
              try {
                fileBase64 = await this.convertFileToBase64Async(filePath)
              } catch (error) {
                console.error(
                  `Attachment not found! File system error for test '${test.testName}' due to file path '${gherkinFilePath}' not found\n`,
                  error
                )
              }

              if (fileBase64) {
                files.push(fileBase64)
              }
            }
          }
        }
        test.attachmentFiles = files
      }
    }

    return tests
  }

  private static async convertFileToBase64Async(
    filePath: string
  ): Promise<IAttachmentBase64> {
    const imgWidth = 1200
    const imgHeight = 675

    const data = await fs.readFile(filePath)
    const fileName = path.basename(filePath)
    const type = await this.getFileTypeAsync(data)
    if (type.startsWith('image')) {
      const resizedData = await this.resizeImageAsync(data, imgWidth, imgHeight)
      const base64Data = Buffer.from(resizedData).toString('base64')
      return { filePath, fileName, base64Data, fileType: type }
    } else {
      const base64Data = Buffer.from(data).toString('base64')
      return { filePath, fileName, base64Data, fileType: type }
    }
  }

  private static async getFileTypeAsync(data: Buffer): Promise<string> {
    const type = await fileTypeFromBuffer(data)
    return type ? type.mime : 'unknown'
  }

  private static async resizeImageAsync(
    data: Buffer,
    width: number,
    height: number
  ): Promise<Buffer> {
    return await sharp(data).resize({ width, height, fit: 'inside' }).toBuffer()
  }
}
