import * as core from '@actions/core'
import { wait } from './wait'
import { FileUtils } from './fs-utils.class.js'
import { HtmlGenerator } from './html-generator.class.js'
import { ISummaryResult } from './interfaces/summary-result.type.js'
import { IUnitTestResult } from './interfaces/unit-test-result.type.js'
import { TestResultPreparing } from './test-result-preparing.class.js'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    //Inputs
    const trxDirPath = core.getInput('trxDirPath') || './trx';
    const attachmentDirPath = core.getInput('attachmentsDirPath') || './attachments';
    const outputHtmlPath = core.getInput('outputHtmlPath') || 'output/result.html';

    const templatePath = './src/templates/template.html'
        const trxFiles = await FileUtils.findTrxFilesAsync(trxDirPath)
    const attachmentFiles =
      await FileUtils.findAttachmentFilesAsync(attachmentDirPath)
    const unitTestResults: IUnitTestResult[] =
      await TestResultPreparing.prepareUnitTestResult(trxFiles, attachmentFiles)
    const summaryDomainResult: ISummaryResult[] =
      TestResultPreparing.prepareDomainSummaryResult(unitTestResults)
    const summaryResult: ISummaryResult = TestResultPreparing.prepareSummaryResult(
      unitTestResults,
      summaryDomainResult
    )
    let htmlContent = HtmlGenerator.generateHTML(
      summaryResult,
      summaryDomainResult,
      unitTestResults,
      templatePath
    )
    HtmlGenerator.saveHtml(outputHtmlPath, htmlContent, true)

  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
