import { GherkinLogs } from '../src/gherkin-logs.class';

describe('GherkinLogs', () => {
  describe('parseGherkinLogs', () => {
    test('should parse gherkin logs correctly', () => {
      const logs = `-> before logs
Given step 1
-> done: finished (1.2s)
When step 2
-> error: finished (2.3s)
Then step 3
-> Attachment 'attachment1.png'
-> skipped (3.4s)
Given step 4
-> Attachment 'attachment2.png'
-> done: finished (4.5s)
Given step 5
--- table step argument ---
| Col1 | Col2 |
| Val1 | Val2 |
-> done: finished (5.5s)
-> after logs`;

      const parsedLogs = GherkinLogs.parseGherkinLogs(logs);

      expect(parsedLogs).toEqual([
        {
          key: 'Hook',
          step: 'Before',
          status: 'unknown',
          time: '0.0s',
          log: ['-> before logs']
        },
        {
          key: 'Given',
          step: 'step 1',
          status: 'done',
          time: '1.2s',
          log: ['-> done: finished (1.2s)']
        },
        {
          key: 'When',
          step: 'step 2',
          status: 'error',
          time: '2.3s',
          log: ['-> error: finished (2.3s)']
        },
        {
          key: 'Then',
          step: 'step 3',
          status: 'skipped',
          time: '3.4s',
          log: ["-> Attachment 'attachment1.png'", '-> skipped (3.4s)'],
          attachments: ['attachment1.png']
        },
        {
          key: 'Given',
          step: 'step 4',
          status: 'done',
          time: '4.5s',
          log: ["-> Attachment 'attachment2.png'", '-> done: finished (4.5s)'],
          attachments: ['attachment2.png']
        },
        {
          key: 'Given',
          step: 'step 5',
          status: 'done',
          time: '5.5s',
          log: ['-> done: finished (5.5s)'],
          table: ['--- table step argument ---', '| Col1 | Col2 |', '| Val1 | Val2 |']
        },
        {
          key: 'Hook',
          step: 'After',
          status: 'unknown',
          time: '0.0s',
          log: ['-> after logs']
        }
      ]);
    });
  });
});
