import * as fs from 'fs';
import { Options, minify } from 'html-minifier';
import { IUnitTestResult } from './interfaces/unit-test-result.type';
import { ISummaryResult } from './interfaces/summary-result.type';
import { FileUtils } from './fs-utils.class';
import { HtmlWebComponent } from './html-web-component.class';
import { IHtmlGeneratorParameters } from './interfaces/html-generator-param.type';
import { getWebHtmlTemplate } from './html-web-template';
import { HtmlMailComponent } from './html-mail-component.class';
import { htmlMailTemplate } from './html-mail-template';

export class HtmlGenerator {
  static async generateWebHtml(
    summaryResult: ISummaryResult,
    summaryDomainResult: ISummaryResult[],
    results: IUnitTestResult[],
    htmlParameters: IHtmlGeneratorParameters
  ): Promise<string> {
    let htmlContent: string = await getWebHtmlTemplate(htmlParameters);
    let iterator = 0;
    let testTableContent = '';
    let domainSummaryTableContent = '';
    let domainFilterOptions = '';
    let featureFilterOptions = '';
    const summaryTableContent: string = HtmlWebComponent.summaryTableComponent(summaryResult, results);
    //Domain Summary
    for (const summary of summaryDomainResult) {
      domainSummaryTableContent += HtmlWebComponent.domainSummaryTableComponent(summary);
      domainFilterOptions += HtmlWebComponent.optionComponent(summary.domain, summary.domain);
    }

    const allFeatureNames: string[] = results.map(f => f.featureName);
    const uniqueFeatureNames: string[] = [...new Set(allFeatureNames)];
    uniqueFeatureNames.sort();
    for (const featureName of uniqueFeatureNames) {
      featureFilterOptions += HtmlWebComponent.optionComponent(featureName, featureName);
    }

    //Test Results
    for (const result of results) {
      testTableContent += HtmlWebComponent.testResultComponent(result, ++iterator, htmlParameters);
    }

    //replace placeholders
    htmlContent = htmlContent.replace('##summary_rows##', summaryTableContent);
    htmlContent = htmlContent.replace('##domain_list##', summaryDomainResult.map(d => `'${d.domain}'`).toString());
    htmlContent = htmlContent.replace('##domain_list_passed##', summaryDomainResult.map(d => d.passed).toString());
    htmlContent = htmlContent.replace('##domain_list_failed##', summaryDomainResult.map(d => d.failed).toString());
    htmlContent = htmlContent.replace('##domain_list_ignored##', summaryDomainResult.map(d => d.ignored).toString());
    htmlContent = htmlContent.replace('##domain_summary_rows##', domainSummaryTableContent);
    htmlContent = htmlContent.replace('##test_rows##', testTableContent);
    htmlContent = htmlContent.replace('##domainFilterOptions##', domainFilterOptions);
    htmlContent = htmlContent.replace('##featureFilterOptions##', featureFilterOptions);
    htmlContent = htmlContent.replace('##report_title##', htmlParameters.title);
    htmlContent = htmlContent.replace('##report_title_h1##', htmlParameters.title);

    return htmlContent;
  }
  static async generateMailHtml(
    summaryResult: ISummaryResult,
    summaryDomainResult: ISummaryResult[],
    results: IUnitTestResult[],
    htmlParameters: IHtmlGeneratorParameters
  ): Promise<string> {
    let htmlContent: string = htmlMailTemplate;
    let domainSummaryTableContent = '';
    //Domain Summary
    for (const summary of summaryDomainResult) {
      domainSummaryTableContent += HtmlMailComponent.domainSummaryTableComponent(summary);
    }

    //replace placeholders
    htmlContent = htmlContent.replace('##report_title##', htmlParameters.title);
    htmlContent = htmlContent.replace('##report_title_h1##', htmlParameters.title);
    htmlContent = htmlContent.replace('##project_logo##', await HtmlMailComponent.projectLogo(htmlParameters));
    htmlContent = htmlContent.replace('##branch_name##', await HtmlMailComponent.branchName(htmlParameters));
    htmlContent = htmlContent.replace('##download_url##', await HtmlMailComponent.downloadUrl(htmlParameters));
    htmlContent = htmlContent.replace('##summary_numbers##', HtmlMailComponent.summaryNumbers(summaryResult, results));
    htmlContent = htmlContent.replace('##summary_percentage##', HtmlMailComponent.summaryPercentage(summaryResult));
    htmlContent = htmlContent.replace('##summary_duration##', HtmlMailComponent.summaryDuration(summaryResult));
    htmlContent = htmlContent.replace('##domain_summary_rows##', domainSummaryTableContent);

    return htmlContent;
  }

  static saveHtml(outputHTMLPath: string, htmlContent: string, shouldMinify: boolean): void {
    FileUtils.createDirectories(outputHTMLPath);
    htmlContent = shouldMinify ? this.minifyHtml(htmlContent) : htmlContent;
    fs.writeFileSync(outputHTMLPath, htmlContent, 'utf-8');
  }

  private static minifyHtml(htmlContent: string): string {
    const options: Options = {
      collapseWhitespace: true,
      removeComments: true,
      minifyCSS: true,
      minifyJS: true,
      minifyURLs: true
    };
    return minify(htmlContent, options);
  }
}
