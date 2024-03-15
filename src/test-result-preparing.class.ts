import moment from 'moment';
import { IUnitTestResult } from './interfaces/unit-test-result.type';
import { ISummaryResult } from './interfaces/summary-result.type';
import { AttachmentFilesBase64 } from './attachment-file-base64.class';
import { TrxParser } from './trx-parser.class';

export class TestResultPreparing {
  static async prepareUnitTestResult(trxFiles: string[], attachmentFiles: string[]): Promise<IUnitTestResult[]> {
    let unitTestResults: IUnitTestResult[] = [];

    for (const trxFilePath of trxFiles) {
      const trxTests = await TrxParser.parseTRXFileAsync(trxFilePath);
      unitTestResults = unitTestResults.concat(trxTests);
    }

    unitTestResults = await AttachmentFilesBase64.addAttachmentFilesAsync(unitTestResults, attachmentFiles);
    unitTestResults = TestResultPreparing.sortAndFilterUniqueTests(unitTestResults);

    return unitTestResults;
  }

  static prepareSummaryResult(
    unitTestResults: IUnitTestResult[],
    summaryDomainResult: ISummaryResult[]
  ): ISummaryResult {
    const summaryResult: ISummaryResult = {
      domain: 'All',
      total: summaryDomainResult.map(m => m.total).reduce((accumulator, currentValue) => accumulator + currentValue, 0),
      passed: summaryDomainResult
        .map(m => m.passed)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0),
      failed: summaryDomainResult
        .map(m => m.failed)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0),
      ignored: summaryDomainResult
        .map(m => m.ignored)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0),
      duration: TestResultPreparing.getRealDuration(unitTestResults),
      startDate: TestResultPreparing.getStartDate(unitTestResults).toDate(),
      endDate: TestResultPreparing.getEndDate(unitTestResults).toDate()
    };

    return summaryResult;
  }

  static prepareDomainSummaryResult(data: IUnitTestResult[]): ISummaryResult[] {
    const summaryDomainResult: ISummaryResult[] = [];
    const domainList = Array.from(new Set(data.map(domain => domain.testDomain)));
    for (const domain of domainList) {
      const domainResults = data.filter(r => r.testDomain === domain);
      const passed = domainResults.filter(t => t.outcome === 'Passed').length;
      const failed = domainResults.filter(t => t.outcome === 'Failed').length;
      const ignored = domainResults.filter(t => t.outcome === 'Ignored').length;

      const total = passed + failed + ignored;
      summaryDomainResult.push({
        domain,
        passed,
        failed,
        ignored,
        total,
        duration: TestResultPreparing.getRealDuration(domainResults),
        startDate: TestResultPreparing.getStartDate(domainResults).toDate(),
        endDate: TestResultPreparing.getEndDate(domainResults).toDate()
      });
    }

    return summaryDomainResult;
  }

  private static getRealDuration(data: IUnitTestResult[]): number {
    return this.getEndDate(data).diff(this.getStartDate(data), 'seconds');
  }

  private static getStartDate(data: IUnitTestResult[]): moment.Moment {
    const startTimes = data.map(d => d.startTime);
    return moment(Math.min(...startTimes.map(date => moment(date).valueOf())));
  }

  private static getEndDate(data: IUnitTestResult[]): moment.Moment {
    const endTimes = data.map(d => d.endTime);
    return moment(Math.max(...endTimes.map(date => moment(date).valueOf())));
  }

  private static sortAndFilterUniqueTests(tests: IUnitTestResult[]): IUnitTestResult[] {
    const testMap = new Map<string, IUnitTestResult>();

    tests.sort((a, b) => {
      if (a.testDomain < b.testDomain) return -1;
      if (a.testDomain > b.testDomain) return 1;

      if (a.featureName < b.featureName) return -1;
      if (a.featureName > b.featureName) return 1;

      if (a.testFullName < b.testFullName) return -1;
      if (a.testFullName > b.testFullName) return 1;

      if (a.startTime < b.startTime) return -1;
      if (a.startTime > b.startTime) return 1;
      return 0;
    });

    for (const test of tests) {
      const key = `${test.testDomain}-${test.featureName}-${test.testFullName}`;
      const existingTest = testMap.get(key);

      if (!existingTest) {
        testMap.set(key, test);
      }
      if (existingTest && test.endTime > existingTest.endTime) {
        test.previousRun = existingTest;
        test.rerun = true;
        testMap.set(key, test);
      }
    }

    return Array.from(testMap.values());
  }
}
