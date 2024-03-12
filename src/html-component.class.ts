import moment from 'moment'
import { IAttachmentBase64 } from './interfaces/attachment-base64.type.js'
import { ISummaryResult } from './interfaces/summary-result.type.js'
import { IUnitTestResult } from './interfaces/unit-test-result.type.js'
import _ from 'lodash'

export class HtmlComponent {
  private static readonly iconTotal: string = '🧾'
  private static readonly iconPassed: string = '✅'
  private static readonly iconFailed: string = '❌'
  private static readonly iconIgnored: string = '⚪'
  private static readonly iconRerun: string = '🔄'

  public static summaryTableComponent(
    summaryResult: ISummaryResult,
    results: IUnitTestResult[]
  ): string {
    return `<div class="row align-items-center row-summary">
          <div class="col summary-details">
            <div class="row text-center">
              <div class="col fs-3" data-bs-toggle="tooltip" data-bs-placement="top" title="Total">${this.iconTotal}&nbsp;<span class="total-number">${summaryResult.total}</span></div>
              <div class="col fs-3" data-bs-toggle="tooltip" data-bs-placement="top" title="Passed">${this.iconPassed}&nbsp;<span class="passed-number">${summaryResult.passed}</span></div>
              <div class="col fs-3" data-bs-toggle="tooltip" data-bs-placement="top" title="Failed">${this.iconFailed}&nbsp;<span class="failed-number">${summaryResult.failed}</span></div>
              <div class="col fs-3" data-bs-toggle="tooltip" data-bs-placement="top" title="Ignored">${this.iconIgnored}&nbsp;<span class="failed-number">${summaryResult.ignored}</span></div>
              <div class="col fs-3" data-bs-toggle="tooltip" data-bs-placement="top" title="Rerun">${this.iconRerun}&nbsp;<span class="rerun-number">${results.filter(t => t.rerun == true).length}</span></div>
            </div>
          </div>
          <div class="col text-center"><span class='total-passed-percentage'>${this.calculatePercentage(summaryResult.passed, summaryResult.passed + summaryResult.failed)}%&nbsp;passed</span></div>
        </div>
       <div class="row align-items-center row-summary">
        <div class="col text-center">${this.returnTestProgress(summaryResult, false)}</div>
       </div>
       <div class="row align-items-center row-summary">
        <div class="col text-center fs-5"><span class="fs-6">start time: </span><span>${moment(summaryResult.startDate).format('YYYY-MM-DD hh:mm:ss')}</span></div>
        <div class="col text-center fs-5"><span class="fs-6">end time: </span><span>${moment(summaryResult.endDate).format('YYYY-MM-DD hh:mm:ss')}</span></div>
        <div class="col text-center fs-5"><span class="fs-6">duration: </span><span>${this.formatTime(summaryResult.duration)}</span></div>
       </div>
      `
  }

  public static testResultComponent(result: IUnitTestResult, iterator: number) {
    const duration = this.formatTime(result.duration)
    const startTime = moment(result.startTime).format('YYYY-MM-DD hh:mm:ss')
    const endTime = moment(result.endTime).format('YYYY-MM-DD hh:mm:ss')
    let outcome = this.returnIconByStatus(result.outcome)
    let preOutcome = result.previousRun?.outcome
      ? this.returnIconByStatus(result.previousRun?.outcome)
      : undefined

    const errMsg = _.escape(result.errMsg || '')
    const stdout = _.escape(result.stdout || '')
    const title = _.escape(result.testName || '')
    const params = _.escape(result.testParameters || '')

    return `<tr class="table-row"
              data-bs-toggle="modal" 
              data-bs-target="#modalTestResults" 
              data-bs-icon-outcome='${outcome}' 
              data-bs-outcome='${result.outcome}' 
              data-bs-rerun='${result.rerun}' 
              data-bs-title='${title}' 
              data-bs-params='${params}'
              data-bs-start='${startTime}' 
              data-bs-end='${endTime}' 
              data-bs-duration='${duration}' 
              data-bs-domain='${result.testDomain}' 
              data-bs-feature='${result.featureName}' 
              data-bs-content-html="${this.returnStepComponent(result)}">
          <td class="align-middle text-center small">${iterator}</td>
          <td class="align-middle text-center"><span class="icon">${preOutcome ? preOutcome : ''} ${result.rerun ? this.iconRerun : ''} ${outcome} </span></td>
          <td class="align-middle col-7">
              <div class="row test-metadata">
                <div class="col-md-4"><span class="label">Domain: </span><span class="value small">${result.testDomain}</span></div>
                <div class="col-md-8"><span class="label">Feature: </span><span class="value small">${result.featureName}</span></div>
              </div>
              <div class="test-title">${title}</div>
              <div class="test-params">${params}</div>
          </td>
          <td class="align-middle text-nowrap small">${duration}</td>
          <td class="align-middle col-5 small">${this.returnTableErrorComponent(result, errMsg)}</td>
        </tr>`
  }

  public static domainSummaryTableComponent(summary: ISummaryResult): string {
    return `<tr>
        <td><b>${summary.domain}</b></td>
        <td width='75%'>${this.returnTestProgress(summary, true)}</td>
        <!--<td>${summary.total}</td>
        <td>${summary.passed}</td>
        <td>${summary.failed}</td>
        <td>${summary.ignored}</td>-->
        <td>${this.formatTime(summary.duration)}</td>        
        </tr>`
  }

  public static optionComponent(value: string, text: string) {
    return `<option value="${value}">${text}</option>`
  }

  private static returnTableErrorComponent(
    result?: IUnitTestResult,
    errMsg?: string
  ): string {
    if (!result) return ''

    const r = result.outcome
    const pRun = result.previousRun
    const pRunErrMsg = pRun ? _.escape(pRun.errMsg || '') : ''

    if (r === 'Passed') {
      return `${this.returnTableErrorComponent(pRun, pRunErrMsg)}<div class="passed-msg">All steps passed</div>`
    } else if (r === 'Failed') {
      return `${this.returnTableErrorComponent(pRun, pRunErrMsg)}<div class="error-msg"">${this.truncateText(errMsg!, 300)}</div>`
    } else if (r === 'Ignored') {
      return `${this.returnTableErrorComponent(pRun, pRunErrMsg)}<div class="ignored-msg"">${this.truncateText(errMsg!, 300)}</div>`
    } else {
      return ''
    }
  }

  private static returnTestProgress(
    data: ISummaryResult,
    showLabel: boolean
  ): string {
    const passed = this.calculatePercentage(data.passed, data.total)
    const failed = this.calculatePercentage(data.failed, data.total)
    const ignored = this.calculatePercentage(data.ignored, data.total)

    const tooltipTitle = `
            <ul class='tooltip-list'>
              <li>${this.iconPassed} <span class='x-small'>Passed:</span> ${data.passed}</li>
              <li>${this.iconFailed} <span class='x-small'>Failed:</span> ${data.failed}</li>
              <li>${this.iconIgnored} <span class='x-small'>Ignored:</span> ${data.ignored}</li>
              <li class='tooltip-total'>${this.iconTotal} <span class='x-small'>Total:</span> ${data.total}</li>
            </ul>
        `

    return `
        <div class="progress" style="height: 20px;" id="progress-${data.domain.toLowerCase()}" data-bs-html="true" data-bs-toggle="tooltip" data-bs-placement="top" title="${tooltipTitle}">
          <div class="progress-bar progressbar-passed" role="progressbar" style="width: ${passed}%" aria-valuenow="${passed}" aria-valuemin="0" aria-valuemax="100"><span class="progressbar-label">${showLabel ? data.passed : ''}</span></div>
          <div class="progress-bar progressbar-failed" role="progressbar" style="width: ${failed}%" aria-valuenow="${failed}" aria-valuemin="0" aria-valuemax="100"><span class="progressbar-label">${showLabel ? data.failed : ''}</span></div>
          <div class="progress-bar progressbar-ignored" role="progressbar" style="width: ${ignored}%" aria-valuenow="${ignored}" aria-valuemin="0" aria-valuemax="100"><span class="progressbar-label">${showLabel ? data.ignored : ''}</span></div>
        </div>
        `
  }

  private static calculatePercentage(part: number, total: number) {
    if (total === 0) {
      return 0
    }

    const percentage = (part / total) * 100
    return Math.round(percentage)
  }

  private static returnIconByStatus(outcome: string): string {
    if (outcome === 'Passed') {
      return this.iconPassed
    } else if (outcome === 'Failed') {
      return this.iconFailed
    } else {
      return this.iconIgnored
    }
  }

  private static returnStepComponent(result: IUnitTestResult): string {
    return _.escape(`
        <div id='test-${result.testId}'>
        ${result.gherkinLogs
          ?.map(
            g =>
              `<div class='text-break' style='color: ${this.getStatusColor(g.status)}'><b>${g.key}</b> ${this.wrapPhraseWithSpan(g.step)} <span class='step-time small'>(${g.time})</span>
        ${g.table ? g.table.map(r => `<div class='step-data small'><pre>${r}</pre></div>`).join('') : ``}
        ${g.log ? g.log.map(r => `<div class='step-logs small d-none'><pre>${_.escape(r)}</pre></div>`).join('') : ``}
        ${
          g.status == 'error'
            ? `<h5 class='error-heading'>Error Message:</h5><div class='error-text'><pre style='color: in'>${result.errMsg}</pre></div>
        ${
          result.attachmentFiles
            ? `${this.listAttachments(
                result.attachmentFiles.filter(file =>
                  file.fileName.includes('screenshot')
                ),
                false
              )}`
            : ''
        }`
            : ''
        }    
        </div>`
          )
          .join('')}
        ${result.attachmentFiles ? `${this.listAttachments(result.attachmentFiles.filter(file => !file.fileName.includes('screenshot')))}` : ''}
      </div>
        `)
  }

  private static wrapPhraseWithSpan(inputString: string): string {
    const stringWithSpan = inputString.replace(/'(.*?)'/g, match => {
      return `<span class='step-var'>${match}</span>`
    })
    return stringWithSpan
  }

  private static listAttachments(
    attachments: IAttachmentBase64[],
    showHaeading: boolean = true
  ): string {
    let text = ''
    for (const attachment of attachments) {
      attachment.fileType.startsWith('image')
        ? (text += `<li>
          <img src="data:image/png;base64,${attachment.base64Data}" alt="${attachment.fileName}">
          </li>`)
        : (text += `<li>
          Download file: <a href="data:application/octet-stream;base64,${attachment.base64Data}" download="${attachment.fileName}">${attachment.fileName}</a>
          </li>`)
    }

    if (text.length > 0) {
      let html = ''
      if (showHaeading) {
        html = `<h5 class='attachments-heading'>Attachments:</h5>`
      }
      html += `<div class="attachments-text"><ul>${text}</ul></div>`
      return html
    } else {
      return text
    }
  }

  private static getStatusColor(status: string): string {
    if (status === 'done') return 'green'
    if (status === 'error') return 'red'
    return 'grey'
  }

  private static formatTime(seconds: number) {
    if (seconds < 60) {
      return `${Math.round(seconds)}s`
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = seconds % 60
      return `${minutes}m ${Math.round(remainingSeconds)}s`
    } else {
      const hours = Math.floor(seconds / 3600)
      const remainingMinutes = Math.floor((seconds % 3600) / 60)
      const remainingSeconds = seconds % 60
      return `${hours}h ${remainingMinutes}m ${Math.round(remainingSeconds)}s`
    }
  }

  private static truncateText(text: string, maxLength: number): string {
    text = text.replace(/[\r\n]+/g, ' ')
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...'
    } else {
      return text
    }
  }
}
