import * as fs from 'fs'
import { Options, minify } from 'html-minifier'
import { IUnitTestResult } from './interfaces/unit-test-result.type.js'
import _ from 'lodash'
import { ISummaryResult } from './interfaces/summary-result.type.js'
import { FileUtils } from './fs-utils.class.js'
import { HtmlComponent } from './html-component.class.js'

export class HtmlGenerator {
  public static generateHTML(
    summaryResult: ISummaryResult,
    summaryDomainResult: ISummaryResult[],
    results: IUnitTestResult[],
    templatePath: string
  ): string {
    let htmlContent: string = fs.readFileSync(templatePath, 'utf-8')
    let iterator: number = 0
    let testTableContent: string = ''
    let domainSummaryTableContent: string = ''
    let domainFilterOptions: string = ''
    let featureFilterOptions: string = ''
    const summaryTableContent: string = HtmlComponent.summaryTableComponent(
      summaryResult,
      results
    )
    //Domain Summary
    for (const summary of summaryDomainResult) {
      domainSummaryTableContent +=
        HtmlComponent.domainSummaryTableComponent(summary)
      domainFilterOptions += HtmlComponent.optionComponent(
        summary.domain,
        summary.domain
      )
    }

    const allFeatureNames: string[] = results.map(f => f.featureName)
    const uniqueFeatureNames: string[] = [...new Set(allFeatureNames)]
    uniqueFeatureNames.sort()
    uniqueFeatureNames.forEach(
      featureName =>
        (featureFilterOptions += HtmlComponent.optionComponent(
          featureName,
          featureName
        ))
    )

    //Test Results
    for (const result of results) {
      testTableContent += HtmlComponent.testResultComponent(result, ++iterator)
    }

    //replace placeholders
    htmlContent = htmlContent.replace('##summary_rows##', summaryTableContent)
    htmlContent = htmlContent.replace(
      '##domain_list##',
      summaryDomainResult.map(d => `'${d.domain}'`).toString()
    )
    htmlContent = htmlContent.replace(
      '##domain_list_passed##',
      summaryDomainResult.map(d => d.passed).toString()
    )
    htmlContent = htmlContent.replace(
      '##domain_list_failed##',
      summaryDomainResult.map(d => d.failed).toString()
    )
    htmlContent = htmlContent.replace(
      '##domain_list_ignored##',
      summaryDomainResult.map(d => d.ignored).toString()
    )
    htmlContent = htmlContent.replace(
      '##domain_summary_rows##',
      domainSummaryTableContent
    )
    htmlContent = htmlContent.replace('##test_rows##', testTableContent)
    htmlContent = htmlContent.replace(
      '##domainFilterOptions##',
      domainFilterOptions
    )
    htmlContent = htmlContent.replace(
      '##featureFilterOptions##',
      featureFilterOptions
    )

    return htmlContent
  }

  public static saveHtml(
    outputHTMLPath: string,
    htmlContent: string,
    minify: boolean
  ): void {
    FileUtils.createDirectories(outputHTMLPath)
    htmlContent = minify ? this.minifyHtml(htmlContent) : htmlContent
    fs.writeFileSync(outputHTMLPath, htmlContent, 'utf-8')
    console.log(`HTML file saved at: ${outputHTMLPath}`)
  }

  private static minifyHtml(htmlContent: string): string {
    const options: Options = {
      collapseWhitespace: true,
      removeComments: true,
      minifyCSS: true,
      minifyJS: true,
      minifyURLs: true
    }
    return minify(htmlContent, options)
  }
}
