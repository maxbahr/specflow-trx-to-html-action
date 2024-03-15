import { TrxParser } from '../src/trx-parser.class';
import { IUnitTestResult } from '../src/interfaces/unit-test-result.type';
import { mockTrxParsedResult } from './mocks';

describe('TrxParser', () => {
  describe('parseTRXFileAsync', () => {
    test('should parse the TRX file and return unit test results', async () => {
      const trxFilePath = '__tests__/trx/test-results-chrome-UI-B2C.trx';

      const expectedUnitTestResults: IUnitTestResult[] = mockTrxParsedResult;

      const unitTestResults = await TrxParser.parseTRXFileAsync(trxFilePath);
      expect(unitTestResults).toEqual(expectedUnitTestResults);
    });
  });
});
