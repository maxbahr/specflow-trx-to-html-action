import { HtmlComponent } from '../src/html-component.class'
import { IUnitTestResult } from '../src/interfaces/unit-test-result.type'
import { mockUnitTestResult } from './mocks'
import { ISummaryResult } from '../src/interfaces/summary-result.type'

describe('HtmlComponent', () => {
  describe('summaryTableComponent', () => {
    test('should return HTML string for summary table', () => {
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

      const results: IUnitTestResult[] = []
      const htmlString = HtmlComponent.summaryTableComponent(
        summaryResult,
        results
      )

      expect(htmlString).toContain(
        '<div class="row align-items-center row-summary">'
      )
    })
  })

  describe('testResultComponent', () => {
    test('should return HTML string for test result', () => {
      const result: IUnitTestResult = mockUnitTestResult
      const iterator = 1

      const htmlString = HtmlComponent.testResultComponent(result, iterator)

      expect(htmlString).toContain('<tr class="table-row"')
    })
  })

  describe('domainSummaryTableComponent', () => {
    test('should return HTML string for domain summary table', () => {
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

      const htmlString =
        HtmlComponent.domainSummaryTableComponent(summaryResult)

      expect(htmlString).toContain('<tr>')
    })
  })

  describe('optionComponent', () => {
    test('should return HTML string for option component', () => {
      const value = 'testValue'
      const text = 'Test Text'

      const htmlString = HtmlComponent.optionComponent(value, text)

      expect(htmlString).toContain(
        '<option value="testValue">Test Text</option>'
      )
    })
  })
})
