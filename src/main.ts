import * as core from '@actions/core';
import { FileUtils } from './fs-utils.class';
import { HtmlGenerator } from './html-generator.class';
import { ISummaryResult } from './interfaces/summary-result.type';
import { IUnitTestResult } from './interfaces/unit-test-result.type';
import { TestResultPreparing } from './test-result-preparing.class';
import { IHtmlGeneratorParameters } from './interfaces/html-generator-param.type';
import { HtmlScreenshot } from './html-screenshot.class';
import { htmlEmailContent } from './html-template';

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    //Inputs
    const trxDirPath = core.getInput('trxDirPath') || '.';
    const attachmentDirPath = core.getInput('attachmentsDirPath') || undefined;
    const outputHtmlPath = core.getInput('outputHtmlPath') || 'output/result.html';
    const reportTitle = core.getInput('reportTitle') || 'Automation Test Report';
    const onlySummary = core.getInput('onlySummary').toLowerCase() === 'true' || false;
    const noLogs = core.getInput('noLogs').toLowerCase() === 'true' || false;
    const projectLogoSrc = core.getInput('projectLogoSrc') || false;
    const outputHtmlEmailPath = core.getInput('outputHtmlEmailPath') || false;

    const trxFiles = await FileUtils.findTrxFilesAsync(trxDirPath);
    const isAttachmentPathSet = attachmentDirPath !== undefined && attachmentDirPath !== null;
    const attachmentFiles = isAttachmentPathSet ? await FileUtils.findAttachmentFilesAsync(attachmentDirPath) : [];
    const unitTestResults: IUnitTestResult[] = await TestResultPreparing.prepareUnitTestResult(
      trxFiles,
      attachmentFiles
    );
    const summaryDomainResult: ISummaryResult[] = TestResultPreparing.prepareDomainSummaryResult(unitTestResults);
    const summaryResult: ISummaryResult = TestResultPreparing.prepareSummaryResult(
      unitTestResults,
      summaryDomainResult
    );
    const htmlParameters: IHtmlGeneratorParameters = {
      title: reportTitle,
      heading: reportTitle,
      onlySummary,
      noLogs,
      projectLogoSrc
    };
    const htmlContent = await HtmlGenerator.generateHTML(
      summaryResult,
      summaryDomainResult,
      unitTestResults,
      htmlParameters
    );
    HtmlGenerator.saveHtml(outputHtmlPath, htmlContent, false);
    if (outputHtmlEmailPath && onlySummary) {
      const imgBase64 = await HtmlScreenshot.getScreenshotHtmlBase64(outputHtmlEmailPath, htmlContent);
      const htmlWithImg = htmlEmailContent(imgBase64);
      HtmlGenerator.saveHtml(outputHtmlEmailPath, htmlWithImg, false);
    }
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message);
  }
}
