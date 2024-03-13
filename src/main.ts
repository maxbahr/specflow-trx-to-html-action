import * as core from '@actions/core'
import { FileUtils } from './fs-utils.class'
import { HtmlGenerator } from './html-generator.class'
import { ISummaryResult } from './interfaces/summary-result.type'
import { IUnitTestResult } from './interfaces/unit-test-result.type'
import { TestResultPreparing } from './test-result-preparing.class'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    //Inputs
    const trxDirPath = core.getInput('trxDirPath')
    const attachmentDirPath = core.getInput('attachmentsDirPath')
    const outputHtmlPath = core.getInput('outputHtmlPath')

    const templatePath = './src/templates/template.html'
    const trxFiles = await FileUtils.findTrxFilesAsync(trxDirPath)
    const attachmentFiles =
      await FileUtils.findAttachmentFilesAsync(attachmentDirPath)
    const unitTestResults: IUnitTestResult[] =
      await TestResultPreparing.prepareUnitTestResult(trxFiles, attachmentFiles)
    const summaryDomainResult: ISummaryResult[] =
      TestResultPreparing.prepareDomainSummaryResult(unitTestResults)
    const summaryResult: ISummaryResult =
      TestResultPreparing.prepareSummaryResult(
        unitTestResults,
        summaryDomainResult
      )
    const htmlContent = HtmlGenerator.generateHTML(
      summaryResult,
      summaryDomainResult,
      unitTestResults,
      templatePath
    )
    HtmlGenerator.saveHtml(outputHtmlPath, htmlContent, false)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
