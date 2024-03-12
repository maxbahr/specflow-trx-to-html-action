import * as fs from 'fs'
import { parseString } from 'xml2js'
import { IUnitTestResult } from './interfaces/unit-test-result.type.js'
import moment from 'moment'
import { GherkinLogs } from './gherkin-logs.class.js'

export class TrxParser {
  public static async parseTRXFileAsync(
    trxFilePath: string
  ): Promise<IUnitTestResult[]> {
    return new Promise((resolve, reject) => {
      fs.readFile(trxFilePath, 'utf-8', (err, trxFileContent) => {
        if (err) {
          reject(err)
          return
        }

        parseString(trxFileContent, (parseErr, result) => {
          if (parseErr) {
            reject(parseErr)
            return
          }

          const unitTestResults: IUnitTestResult[] = []

          if (
            result &&
            result.TestRun &&
            result.TestRun.Results &&
            result.TestRun.Results[0] &&
            result.TestRun.Results[0].UnitTestResult &&
            result.TestRun.TestDefinitions &&
            result.TestRun.TestDefinitions[0].UnitTest &&
            result.TestRun.TestDefinitions[0].UnitTest[0].TestMethod
          ) {
            const testResults = result.TestRun.Results[0].UnitTestResult
            testResults.forEach((testResult: any) => {
              let output: string
              try {
                output = testResult.Output[0].StdOut[0]
              } catch (error) {
                output = testResult.Output[0].ErrorInfo[0].Message[0]
              }
              let err: string
              try {
                err = testResult.Output[0].ErrorInfo[0].Message[0]
              } catch (error) {
                err = ''
              }
              const testId = testResult.$.testId
              const testDefinitions = result.TestRun.TestDefinitions[0]
              const unitTest = testDefinitions.UnitTest.find(
                (test: any) => test.$.id === testId
              )
              const className = unitTest.TestMethod[0].$.className
              const parts = className.split('.')
              const testDomain = parts[4]
              const featurName = parts[5]
                .replace('_', ' - ')
                .replace('Feature', '')
              const testDomainStartTime = result.TestRun.Times[0].$.start
              const testDomainEndTime = result.TestRun.Times[0].$.finish

              unitTestResults.push({
                testId: testId,
                testDomainStartTime: testDomainStartTime,
                testDomainEndTime: testDomainEndTime,
                testDomain: testDomain,
                featureName: featurName,
                testFullName: testResult.$.testName,
                testName: this.parseTestName(testResult.$.testName),
                testParameters: this.parseTestParameters(testResult.$.testName),
                outcome:
                  testResult.$.outcome === 'NotExecuted'
                    ? 'Ignored'
                    : testResult.$.outcome,
                duration: this.convertTimeToSeconds(testResult.$.duration),
                startTime: moment(testResult.$.endTime)
                  .subtract(
                    this.convertTimeToSeconds(testResult.$.duration),
                    'seconds'
                  )
                  .toDate(),
                endTime: moment(testResult.$.endTime).toDate(),
                stdout: output,
                gherkinLogs: GherkinLogs.parseGherkinLogs(output),
                errMsg: err,
                rerun: false
              })
            })
          }

          resolve(unitTestResults)
        })
      })
    })
  }

  private static convertTimeToSeconds(timeString: string) {
    const time = moment.duration(timeString)
    const seconds = time.asSeconds()
    return seconds
  }

  private static parseTestName(text: string): string {
    const regex = /\(.*exampleTags: \[\]\)/
    return text.replace(regex, '')
  }

  private static parseTestParameters(text: string): string {
    const regex = /\((.*?exampleTags:.*?)\)/
    const match = text.match(regex)
    let params: string = ''
    if (match) {
      params = match[1]
    }

    return params
  }
}
