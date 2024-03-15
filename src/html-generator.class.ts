import * as fs from 'fs';
import { Options, minify } from 'html-minifier';
import { IUnitTestResult } from './interfaces/unit-test-result.type';
import { ISummaryResult } from './interfaces/summary-result.type';
import { FileUtils } from './fs-utils.class';
import { HtmlComponent } from './html-component.class';
import { IHtmlGeneratorParameters } from './interfaces/html-generator-param.type';
import { getHtmlTemplate } from './html-template';

export class HtmlGenerator {
  static generateHTML(
    summaryResult: ISummaryResult,
    summaryDomainResult: ISummaryResult[],
    results: IUnitTestResult[],
    htmlParameters: IHtmlGeneratorParameters
  ): string {
    let htmlContent: string = getHtmlTemplate(htmlParameters);
    let iterator = 0;
    let testTableContent = '';
    let domainSummaryTableContent = '';
    let domainFilterOptions = '';
    let featureFilterOptions = '';
    const summaryTableContent: string = HtmlComponent.summaryTableComponent(summaryResult, results);
    //Domain Summary
    for (const summary of summaryDomainResult) {
      domainSummaryTableContent += HtmlComponent.domainSummaryTableComponent(summary);
      domainFilterOptions += HtmlComponent.optionComponent(summary.domain, summary.domain);
    }

    const allFeatureNames: string[] = results.map(f => f.featureName);
    const uniqueFeatureNames: string[] = [...new Set(allFeatureNames)];
    uniqueFeatureNames.sort();
    for (const featureName of uniqueFeatureNames) {
      featureFilterOptions += HtmlComponent.optionComponent(featureName, featureName);
    }

    //Test Results
    for (const result of results) {
      testTableContent += HtmlComponent.testResultComponent(result, ++iterator, htmlParameters.noLogs);
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

  static saveHtml(outputHTMLPath: string, htmlContent: string, shouldMinify: boolean): void {
    FileUtils.createDirectories(outputHTMLPath);
    htmlContent = shouldMinify ? this.minifyHtml(htmlContent) : htmlContent;
    fs.writeFileSync(outputHTMLPath, htmlContent, 'utf-8');
    console.log(`HTML file saved at: ${outputHTMLPath}`);
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
