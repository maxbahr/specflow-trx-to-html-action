import { HtmlGenerator } from '../src/html-generator.class'
import { ISummaryResult } from '../src/interfaces/summary-result.type'
import { IUnitTestResult } from '../src/interfaces/unit-test-result.type'

describe('HtmlGenerator', () => {
  describe('generateHTML', () => {
    test('should generate HTML content correctly', () => {
      const summaryResult: ISummaryResult = {
        domain: 'TestDomain',
        total: 10,
        passed: 7,
        failed: 2,
        ignored: 1,
        duration: 3600,
        startDate: new Date(),
        endDate: new Date()
      }

      const summaryDomainResult: ISummaryResult[] = [
        {
          domain: 'TestDomain1',
          total: 5,
          passed: 3,
          failed: 1,
          ignored: 1,
          duration: 1800,
          startDate: new Date(),
          endDate: new Date()
        },
        {
          domain: 'TestDomain2',
          total: 8,
          passed: 6,
          failed: 1,
          ignored: 1,
          duration: 2700,
          startDate: new Date(),
          endDate: new Date()
        }
      ]

      const results: IUnitTestResult[] = [
        {
          testId: '123',
          testDomain: 'TestDomain',
          featureName: 'Feature1',
          testName: 'Test1',
          testParameters: 'Params1',
          outcome: 'Passed',
          duration: 10,
          startTime: new Date(),
          endTime: new Date(),
          errMsg: null,
          rerun: false,
          gherkinLogs: null,
          attachmentFiles: undefined,
          previousRun: undefined,
          stdout: '-> stdout',
          testFullName: 'Test full name',
          testDomainEndTime: new Date(),
          testDomainStartTime: new Date()
        }
      ]

      const templatePath = 'src/templates/template.html'

      const generatedHtml = HtmlGenerator.generateHTML(
        summaryResult,
        summaryDomainResult,
        results,
        templatePath
      )

      expect(typeof generatedHtml).toBe('string')
      expect(generatedHtml.length).toBeGreaterThan(0)
      expect(generatedHtml).toContain(
        '<div class="row align-items-center row-summary">'
      )
      expect(generatedHtml).toContain('TestDomain')
      expect(generatedHtml).toContain('Test1')
    })
  })

  describe('saveHtml', () => {
    test.skip('should save HTML content correctly', () => {
      const outputHTMLPath = 'sample/output.html'
      const htmlContent = '<html><body><h1>Hello, World!</h1></body></html>'
      const shouldMinify = false // For testing purposes, set to true if you want to test minification

      // Mocking FileUtils.createDirectories
      //   const createDirectoriesMock = jest.spyOn(HtmlGenerator, 'createDirectories');
      //   createDirectoriesMock.mockImplementation();

      //   const writeFileSyncMock = jest.spyOn(fs, 'writeFileSync');
      //   writeFileSyncMock.mockImplementation();

      HtmlGenerator.saveHtml(outputHTMLPath, htmlContent, shouldMinify)

      //   expect(createDirectoriesMock).toHaveBeenCalledWith(outputHTMLPath);
      //   expect(writeFileSyncMock).toHaveBeenCalledWith(outputHTMLPath, htmlContent, 'utf-8');
    })
  })
})
