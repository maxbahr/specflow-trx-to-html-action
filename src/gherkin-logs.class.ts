import { IGherkinStep } from './interfaces/gherkin-step.type';

export class GherkinLogs {
  static parseGherkinLogs(logs: string): IGherkinStep[] {
    const lines = logs.split('\n');
    const result: IGherkinStep[] = [];
    let currentStep: IGherkinStep | null = null;
    let isEndStep = false;

    currentStep = {
      key: 'Hook',
      step: 'Before',
      status: 'unknown',
      time: '0.0s',
      log: []
    }; // logs for before

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.startsWith('Given') || line.startsWith('When') || line.startsWith('Then')) {
        if (currentStep !== null) {
          this.addStepResult(result, currentStep);
        }
        const step = this.getStepKey(line);
        currentStep = {
          key: step.key,
          step: step.text,
          status: 'unknown',
          time: '0.0s',
          log: []
        }; // Nowy krok
        isEndStep = false;
      } else if (currentStep !== null) {
        if (line.startsWith('-> done:') || line.startsWith('-> error:') || line.startsWith('-> skipped')) {
          currentStep.status = this.getStatusFromLine(line);
          currentStep.time = this.getTimeFromLine(line);
          currentStep.log.push(line);
          isEndStep = true;
        } else if (line.startsWith('-> Attachment')) {
          if (currentStep.attachments == null) {
            currentStep.attachments = [];
          }
          currentStep.attachments.push(this.getAttachmentFilePath(line));
          currentStep.log.push(line);
        } else if (line.trimStart().startsWith('--- table step argument ---') || this.isTableRow(line)) {
          if (currentStep.table == null) {
            currentStep.table = [];
          }
          currentStep.table.push(line);
        } else {
          //After
          if (isEndStep === true && this.isAfter(lines, i)) {
            if (currentStep && currentStep.step !== 'After') {
              this.addStepResult(result, currentStep);
              currentStep = {
                key: 'Hook',
                step: 'After',
                status: 'unknown',
                time: '0.0s',
                log: []
              };
            }
          }
          currentStep.log.push(line);
        }
      }
    }

    if (currentStep !== null) {
      this.addStepResult(result, currentStep);
    }

    return result;
  }

  private static addStepResult(result: IGherkinStep[], currentStep: IGherkinStep): void {
    if (currentStep.status === 'error') {
      currentStep.time = this.getTimeFromLine(currentStep.log[currentStep.log.length - 1]);
    }
    result.push(currentStep);
  }

  private static getStepKey(line: string): { key: string; text: string } {
    const parts = line.split(' ');
    const key = parts[0];
    const text = parts.slice(1).join(' ');
    return { key, text };
  }

  private static getStatusFromLine(line: string): string {
    if (line.startsWith('-> done:')) return 'done';
    if (line.startsWith('-> error:')) return 'error';
    if (line.startsWith('-> skipped')) return 'skipped';
    return '';
  }

  private static getTimeFromLine(line: string): string {
    const regex = /\((\d+\.\d+s)\)/;
    const match = line.match(regex);

    if (match && match.length > 1) {
      const time = match[1];
      return time;
    } else {
      return '0.0s';
    }
  }

  private static getAttachmentFilePath(line: string): string {
    const regex = /'([^']+)'/;
    const match = line.match(regex);

    if (match && match.length > 0) {
      const m = match[1];
      return m;
    } else {
      return '';
    }
  }

  private static isTableRow(line: string): boolean {
    const regex = /^\s*\|.*\|.*$/gm;
    const match = line.match(regex);

    if (match && match.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  private static isAfter(lines: string[], currentIndex: number): boolean {
    let moreSteps = false;

    for (let i = currentIndex + 1; i < lines.length; i++) {
      const nextLine = lines[i];

      if (nextLine.startsWith('Given') || nextLine.startsWith('When') || nextLine.startsWith('Then')) {
        moreSteps = true;
        break;
      }
    }

    if (moreSteps) {
      return false;
    } else {
      return true;
    }
  }
}
