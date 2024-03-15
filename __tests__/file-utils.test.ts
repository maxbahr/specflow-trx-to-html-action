import * as fs from 'fs';
import * as path from 'path';
import { FileUtils } from '../src/fs-utils.class';

describe('FileUtils', () => {
  describe('findTrxFilesAsync', () => {
    test('should find .trx files recursively', async () => {
      const folderPath = '/path/to/test/folder';

      // Mocking fs.promises.readdir
      fs.promises.readdir = jest.fn().mockResolvedValue(['file1.trx', 'file2.log', 'subfolder']);

      // Mocking fs.promises.stat
      fs.promises.stat = jest.fn().mockResolvedValue({ isDirectory: () => false });

      const trxFiles = await FileUtils.findTrxFilesAsync(folderPath);

      expect(trxFiles).toEqual([path.normalize('/path/to/test/folder/file1.trx')]);
    });

    test('should handle error while reading folder', async () => {
      const folderPath = '/path/to/test/folder';

      // Mocking fs.promises.readdir to throw an error
      fs.promises.readdir = jest.fn().mockRejectedValue(new Error('Failed to read directory'));

      const trxFiles = await FileUtils.findTrxFilesAsync(folderPath);

      expect(trxFiles).toEqual([]);
    });
  });

  describe('findAttachmentFilesAsync', () => {
    test('should find all files recursively', async () => {
      const folderPath = '/path/to/test/folder';

      // Mocking fs.promises.readdir
      fs.promises.readdir = jest
        .fn()
        .mockResolvedValueOnce(['file1.txt', 'file2.png'])
        .mockResolvedValueOnce(['subfolder']);

      // Mocking fs.promises.stat
      fs.promises.stat = jest.fn().mockImplementation(async (filePath: string) => {
        if (filePath.endsWith('subfolder')) {
          return Promise.resolve({ isDirectory: () => true });
        } else {
          return Promise.resolve({ isDirectory: () => false });
        }
      });

      const attachmentFiles = await FileUtils.findAttachmentFilesAsync(folderPath);

      expect(attachmentFiles).toEqual([
        path.normalize('/path/to/test/folder/file1.txt'),
        path.normalize('/path/to/test/folder/file2.png')
      ]);
    });

    test('should handle error while reading folder', async () => {
      const folderPath = '/path/to/test/folder';

      // Mocking fs.promises.readdir to throw an error
      fs.promises.readdir = jest.fn().mockRejectedValue(new Error('Failed to read directory'));

      const attachmentFiles = await FileUtils.findAttachmentFilesAsync(folderPath);

      expect(attachmentFiles).toEqual([]);
    });
  });
});
