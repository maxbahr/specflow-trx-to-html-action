import moment from 'moment';
import { ISummaryResult } from './interfaces/summary-result.type';
import { IUnitTestResult } from './interfaces/unit-test-result.type';
import { calculatePercentage, formatTime, iconFailed, iconIgnored, iconPassed, iconRerun, iconTotal } from './utils';
import { IHtmlGeneratorParameters } from './interfaces/html-generator-param.type';

export class HtmlMailComponent {
  static summaryPercentage(summaryResult: ISummaryResult): string {
    return `<h1 style="font-size: 50px; color: #00d26e; margin: 0px;">${calculatePercentage(summaryResult.passed, summaryResult.passed + summaryResult.failed)}% passed</h1>`;
  }

  static summaryNumbers(summaryResult: ISummaryResult, results: IUnitTestResult[]): string {
    return `<tr>
        <td style="font-size: 18px; padding: 8px 8px;">${iconTotal}&nbsp;<span>${summaryResult.total}</span></td>
        <td style="font-size: 18px; padding: 8px 8px;">${iconPassed}&nbsp;<span>${summaryResult.passed}</span></td>
        <td style="font-size: 18px; padding: 8px 8px;">${iconFailed}&nbsp;<span>${summaryResult.failed}</span></td>
        <td style="font-size: 18px; padding: 8px 8px;">${iconIgnored}&nbsp;<span>${summaryResult.ignored}</span></td>
        <td style="font-size: 18px; padding: 8px 8px;">${iconRerun}&nbsp;<span>${results.filter(t => t.rerun === true).length}</span></td>
    </tr>`;
  }

  static summaryDuration(summaryResult: ISummaryResult): string {
    return `<tr>
        <td style="padding: 0px 10px; font-size: 16px;"><span style="font-size: 12px;">start time: </span><span>${moment(summaryResult.startDate).format('YYYY-MM-DD hh:mm:ss')}</span></td>
        <td style="padding: 0px 10px; font-size: 16px;"><span style="font-size: 12px;">end time: </span><span>${moment(summaryResult.endDate).format('YYYY-MM-DD hh:mm:ss')}</span></td>
        <td style="padding: 0px 10px; font-size: 16px;"><span style="font-size: 12px;">duration: </span><span>${formatTime(summaryResult.duration)}</span></td>
    </tr>`;
  }

  static domainSummaryTableComponent(summary: ISummaryResult): string {
    return `
    <tr style="border-bottom: 1px solid #d9cdcd;">
        <td style="padding: 3px 3px; height: 28px; text-align: left;"><b>${summary.domain}</b></td>
        <td style="width: 75%; padding: 3px 3px; height: 28px; text-align: left;">
            <table style="width: 100%; height: 17px; background-color: #e9ecef; table-layout: fixed; border-collapse: collapse;">
            ${this.returnTestProgress(summary)}
            </table>                                
        </td>
        <td style="padding: 3px 3px; height: 28px; text-align: left;">${formatTime(summary.duration)}</td>
    </tr>`;
  }

  static async projectLogo(parameters: IHtmlGeneratorParameters): Promise<string> {
    return `${
      parameters.projectLogoSrc && parameters.projectLogoSrc.startsWith('http')
        ? `<img width="90" style="width:90px; border:0;" alt="Project Logo" class="projectLogo" src="${parameters.projectLogoSrc}">`
        : ''
    }`;
  }

  private static returnTestProgress(data: ISummaryResult): string {
    const passed = calculatePercentage(data.passed, data.total);
    const failed = calculatePercentage(data.failed, data.total);
    const ignored = calculatePercentage(data.ignored, data.total);

    return `
    <tr>
        ${passed > 0 ? `<td style="width: ${passed}%; background-color: #00d26e; color: #fff; text-align: center; white-space: nowrap; font-size: 14px;"><span>${data.passed}</span></td>` : ''}
        ${failed > 0 ? `<td style="width: ${failed}%; background-color: #f63d63; color: #fff; text-align: center; white-space: nowrap; font-size: 14px;"><span>${data.failed}</span></td>` : ''}
        ${ignored > 0 ? `<td style="width: ${ignored}%; background-color: #cbcccb; color: #fff; text-align: center; white-space: nowrap; font-size: 14px;"><span>${data.ignored}</span></td>` : ''}
    </tr>`;
  }
}
