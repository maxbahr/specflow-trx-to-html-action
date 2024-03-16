import moment from 'moment';
import { ISummaryResult } from './interfaces/summary-result.type';
import { IUnitTestResult } from './interfaces/unit-test-result.type';
import { calculatePercentage, formatTime, iconFailed, iconIgnored, iconPassed, iconRerun, iconTotal } from './utils';

export class HtmlMailComponent {
  static summaryTableComponent(summaryResult: ISummaryResult, results: IUnitTestResult[]): string {
    return `
        <div style="border: 1px solid #ecf0f3; background-color: #fbfbfb; border-radius: 15px; margin-bottom: 20px;">
                        <div style="border: 1px solid #ecf0f3; background-color: white; padding: 20px 10px; border-radius: 15px; margin-left: 2rem; margin-right: 2rem; margin-top: 2rem;">
                            <div style="display: flex; flex-wrap: wrap; justify-content: space-around; max-width: 100%;">
                                <div style="font-size: 1.5rem; max-width: fit-content; padding: 0.5rem 0.5rem;">${iconTotal}&nbsp;<span>${summaryResult.total}</span></div>
                                <div style="font-size: 1.5rem; max-width: fit-content; padding: 0.5rem 0.5rem;">${iconPassed}&nbsp;<span>${summaryResult.passed}</span></div>
                                <div style="font-size: 1.5rem; max-width: fit-content; padding: 0.5rem 0.5rem;">${iconFailed}&nbsp;<span>${summaryResult.failed}</span></div>
                                <div style="font-size: 1.5rem; max-width: fit-content; padding: 0.5rem 0.5rem;">${iconIgnored}&nbsp;<span>${summaryResult.ignored}</span></div>
                                <div style="font-size: 1.5rem; max-width: fit-content; padding: 0.5rem 0.5rem;">${iconRerun}&nbsp;<span>${results.filter(t => t.rerun === true).length}</span></div>
                            </div>
                        </div>
                        <div style="text-align: center;"><span style="font-size: 5rem; color: #00d26e;">${calculatePercentage(summaryResult.passed, summaryResult.passed + summaryResult.failed)}% passed</span></div>
                        <div style="margin-top: 1rem; margin-bottom: 1rem; display: flex; flex-wrap: wrap; justify-content: space-around;">
                            <div style="font-size: 1.22rem;"><span style="font-size: 1rem;">start time: </span><span>${moment(summaryResult.startDate).format('YYYY-MM-DD hh:mm:ss')}</span></div>
                            <div style="font-size: 1.22rem;"><span style="font-size: 1rem;">end time: </span><span>${moment(summaryResult.endDate).format('YYYY-MM-DD hh:mm:ss')}</span></div>
                            <div style="font-size: 1.22rem;"><span style="font-size: 1rem;">duration: </span><span>${formatTime(summaryResult.duration)}</span></div>
                        </div>
                    </div>`;
  }

  static domainSummaryTableComponent(summary: ISummaryResult): string {
    return `
        <tr style="border-bottom: 1px solid #d9cdcd;">
            <td style="padding: 0.5rem 0.5rem; height: 2rem; text-align: left;"><b>${summary.domain}</b></td>
            <td style="width: 75%; padding: 0.5rem 0.5rem; height: 2rem; text-align: left;">${this.returnTestProgress(summary)}</td>
            <td style="padding: 0.5rem 0.5rem; height: 2rem; text-align: left;">${formatTime(summary.duration)}</td>
        </tr>`;
  }

  private static returnTestProgress(data: ISummaryResult): string {
    const passed = calculatePercentage(data.passed, data.total);
    const failed = calculatePercentage(data.failed, data.total);
    const ignored = calculatePercentage(data.ignored, data.total);

    return `
        <div style="height: 1.2rem; display: flex; overflow: hidden; background-color: #e9ecef; border-radius: .25rem;">
            <div style="width: ${passed}%; background-color: #00d26e; float: left; color: #fff; text-align: center; white-space: nowrap; font-size: 0.75rem;"><span>${data.passed}</span></div>
            <div style="width: ${failed}%; background-color: #f63d63; float: left; color: #fff; text-align: center; white-space: nowrap; font-size: 0.75rem;"><span>${data.failed}</span></div>
            <div style="width: ${ignored}%; background-color: #cbcccb; float: left; color: #fff; text-align: center; white-space: nowrap; font-size: 0.75rem;"><span>${data.ignored}</span></div>
        </div>`;
  }
}
