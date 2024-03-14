import * as path from 'path'
import * as fs from 'fs'

export class FileUtils {
  static createDirectories(filePath: string): void {
    const directoryPath = path.dirname(filePath)

    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true })
    }
  }

  static async findTrxFilesAsync(folderPath: string): Promise<string[]> {
    const trxFiles: string[] = []

    async function findFilesRecursively(currentPath: string): Promise<void> {
      const files = await fs.promises.readdir(currentPath)

      for (const file of files) {
        const filePath = path.join(currentPath, file)
        const fileStat = await fs.promises.stat(filePath)

        if (fileStat.isDirectory()) {
          await findFilesRecursively(filePath)
        } else {
          if (file.endsWith('.trx')) {
            trxFiles.push(filePath)
          }
        }
      }
    }

    try {
      await findFilesRecursively(folderPath)
      return trxFiles
    } catch (error) {
      console.error(`Error while reading folder ${folderPath}:`, error)
      return []
    }
  }

  static async findAttachmentFilesAsync(folderPath: string): Promise<string[]> {
    const trxFiles: string[] = []

    async function findFilesRecursively(currentPath: string): Promise<void> {
      const files = await fs.promises.readdir(currentPath)

      for (const file of files) {
        const filePath = path.join(currentPath, file)
        const fileStat = await fs.promises.stat(filePath)

        if (fileStat.isDirectory()) {
          await findFilesRecursively(filePath)
        } else {
          trxFiles.push(filePath)
        }
      }
    }

    try {
      await findFilesRecursively(folderPath)
      return trxFiles
    } catch (error) {
      console.error(`Error while reading folder ${folderPath}:`, error)
      return []
    }
  }
}
