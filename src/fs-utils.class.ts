import * as path from 'path'
import * as fs from 'fs'

export class FileUtils {
  static createDirectories(filePath: string): void {
    if (!this.isValidPath(filePath)) {
      throw new Error(`'${filePath}' is not valid file path`)
    }

    const directoryPath = path.dirname(filePath)

    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true })
    }
  }

  static async findTrxFilesAsync(folderPath: string): Promise<string[]> {
    if (!this.isValidPath(folderPath)) {
      throw new Error(
        `'${folderPath}' is not valid folder path. Should include path separator`
      )
    }
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
    if (!this.isValidPath(folderPath)) {
      throw new Error(
        `'${folderPath}' is not valid folder path. Should include path separator`
      )
    }
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

  private static isValidPath(filePath: string): boolean {
    try {
      const stats = path.normalize(filePath).includes(path.sep)
      return stats
    } catch (error) {
      return false
    }
  }
}
