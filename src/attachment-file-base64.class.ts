import path from 'path'
import fs from 'fs/promises'
import Jimp from 'jimp'
import mime from 'mime-types'
import { IUnitTestResult } from './interfaces/unit-test-result.type'
import { IAttachmentBase64 } from './interfaces/attachment-base64.type'

export class AttachmentFilesBase64 {
  static async addAttachmentFilesAsync(
    tests: IUnitTestResult[],
    filePaths: string[]
  ): Promise<IUnitTestResult[]> {
    for (const test of tests) {
      const gherkinAttachments = test.gherkinLogs
        ?.filter(a => a.attachments && a.attachments.length > 0)
        .flatMap(m => m.attachments)
      if (gherkinAttachments) {
        const files: IAttachmentBase64[] = []

        for (const gherkinFilePath of gherkinAttachments) {
          if (gherkinFilePath) {
            const filePath = filePaths.find(f =>
              this.pathsMatch(f, gherkinFilePath)
            )
            if (filePath) {
              let fileBase64
              try {
                fileBase64 = await this.convertFileToBase64Async(
                  path.normalize(filePath)
                )
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

  private static pathsMatch(path1: string, path2: string): boolean {
    const normalizedPath1 = path.normalize(path1).split(path.sep)
    const normalizedPath2 = path.normalize(path2).split(path.sep)
    const matchFileName =
      normalizedPath1[normalizedPath1.length - 1] ===
      normalizedPath2[normalizedPath2.length - 1] // fileName
    const matchSubfolder =
      normalizedPath1[normalizedPath1.length - 2] ===
      normalizedPath2[normalizedPath2.length - 2] // subfolder
    return matchFileName && matchSubfolder
  }

  private static async convertFileToBase64Async(
    filePath: string
  ): Promise<IAttachmentBase64> {
    const imgWidth = 1200
    const imgHeight = 675

    const data = await fs.readFile(filePath)
    const fileName = path.basename(filePath)
    const type = this.getFileType(filePath)
    if (type.startsWith('image')) {
      const resizedData = await this.resizeImageAsync(data, imgWidth, imgHeight)
      const base64Data = Buffer.from(resizedData).toString('base64')
      return { filePath, fileName, base64Data, fileType: type }
    } else {
      const base64Data = Buffer.from(data).toString('base64')
      return { filePath, fileName, base64Data, fileType: type }
    }
  }

  private static getFileType(filePath: string): string {
    const mimeType = mime.lookup(filePath)
    return mimeType ? mimeType : 'unknown'
  }

  private static async resizeImageAsync(
    data: Buffer,
    w: number,
    h: number
  ): Promise<string> {
    try {
      const image = await Jimp.read(data)
      const { width, height } = image.bitmap
      let resizedImage
      if (width > height) {
        resizedImage = image.resize(w, Jimp.AUTO)
      } else {
        resizedImage = image.resize(Jimp.AUTO, h)
      }
      return await resizedImage.getBase64Async(Jimp.AUTO)
    } catch (err) {
      console.error('Error while resizing:', err)
      throw err
    }
  }
}
