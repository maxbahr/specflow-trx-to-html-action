import * as core from '@actions/core';
import { FileUtils } from './fs-utils.class';
import { HtmlGenerator } from './html-generator.class';
import { ISummaryResult } from './interfaces/summary-result.type';
import { IUnitTestResult } from './interfaces/unit-test-result.type';
import { TestResultPreparing } from './test-result-preparing.class';
import { IHtmlGeneratorParameters } from './interfaces/html-generator-param.type';

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
    const projectLogoSrc = core.getInput('projectLogoSrc') || undefined;
    const outputHtmlEmailPath = core.getInput('outputHtmlEmailPath') || undefined;
    const branchName = core.getInput('branchName') || undefined;
    const downloadUrl = core.getInput('downloadUrl') || undefined;
    const reqPrefix = core.getInput('workItemPrefix') || undefined;
    const reqUrl = core.getInput('workItemUrl') || undefined;

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
      projectLogoSrc,
      branchName,
      downloadUrl,
      reqPrefix,
      reqUrl
    };
    const htmlContent = await HtmlGenerator.generateWebHtml(
      summaryResult,
      summaryDomainResult,
      unitTestResults,
      htmlParameters
    );
    HtmlGenerator.saveHtml(outputHtmlPath, htmlContent, false);

    //email html
    const isOutputHtmlEmailPathSet = outputHtmlEmailPath !== undefined && outputHtmlEmailPath !== null;
    if (isOutputHtmlEmailPathSet) {
      const htmlMailContent = await HtmlGenerator.generateMailHtml(
        summaryResult,
        summaryDomainResult,
        unitTestResults,
        htmlParameters
      );
      HtmlGenerator.saveHtml(outputHtmlEmailPath, htmlMailContent, false);
    }
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message);
  }
}
