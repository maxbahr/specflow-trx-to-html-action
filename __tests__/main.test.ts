/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * These should be run as if the action was called from a workflow.
 * Specifically, the inputs listed in `action.yml` should be set as environment
 * variables following the pattern `INPUT_<INPUT_NAME>`.
 */

import * as core from '@actions/core';
import * as main from '../src/main';

// Mock the action's main function
const runMock = jest.spyOn(main, 'run');

// Mock the GitHub Actions core library
let errorMock: jest.SpiedFunction<typeof core.error>;
let getInputMock: jest.SpiedFunction<typeof core.getInput>;
let setFailedMock: jest.SpiedFunction<typeof core.setFailed>;

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    errorMock = jest.spyOn(core, 'error').mockImplementation();
    getInputMock = jest.spyOn(core, 'getInput').mockImplementation();
    setFailedMock = jest.spyOn(core, 'setFailed').mockImplementation();
  });

  it('should generate html', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'trxDirPath':
          return '__tests__/trx';
        case 'attachmentsDirPath':
          return '__tests__/attachments';
        case 'outputHtmlPath':
          return 'output/results.html';
        default:
          return '';
      }
    });

    await main.run();
    expect(runMock).toHaveReturned();

    // Verify that all of the core library functions were called correctly
    expect(errorMock).not.toHaveBeenCalled();
  });

  it('should generate html without attachments', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'trxDirPath':
          return '__tests__/trx';
        case 'outputHtmlPath':
          return 'output/results.html';
        default:
          return '';
      }
    });

    await main.run();
    expect(runMock).toHaveReturned();

    // Verify that all of the core library functions were called correctly
    expect(errorMock).not.toHaveBeenCalled();
  });

  it('should generate html without logs', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'trxDirPath':
          return '__tests__/trx';
        case 'outputHtmlPath':
          return 'output/results.html';
        case 'noLogs':
          return 'true';
        default:
          return '';
      }
    });

    await main.run();
    expect(runMock).toHaveReturned();

    // Verify that all of the core library functions were called correctly
    expect(errorMock).not.toHaveBeenCalled();
  });

  it('should generate html with only summary', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'trxDirPath':
          return '__tests__/trx';
        case 'outputHtmlPath':
          return 'output/results.html';
        case 'onlySummary':
          return 'true';
        default:
          return '';
      }
    });

    await main.run();
    expect(runMock).toHaveReturned();

    // Verify that all of the core library functions were called correctly
    expect(errorMock).not.toHaveBeenCalled();
  });

  it('should generate html with my report title', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'trxDirPath':
          return '__tests__/trx';
        case 'outputHtmlPath':
          return 'output/results.html';
        case 'reportTitle':
          return 'My report title';
        default:
          return '';
      }
    });

    await main.run();
    expect(runMock).toHaveReturned();

    // Verify that all of the core library functions were called correctly
    expect(errorMock).not.toHaveBeenCalled();
  });

  it('should generate html with project logo', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'trxDirPath':
          return '__tests__/trx';
        case 'outputHtmlPath':
          return 'output/results.html';
        case 'projectLogoSrc':
          return 'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png';
        case 'outputHtmlEmailPath':
          return 'output/email-body-results.html';
        default:
          return '';
      }
    });

    await main.run();
    expect(runMock).toHaveReturned();

    // Verify that all of the core library functions were called correctly
    expect(errorMock).not.toHaveBeenCalled();
  });

  it('should generate html for sending email', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'trxDirPath':
          return '__tests__/trx';
        case 'outputHtmlPath':
          return 'output/results.html';
        case 'outputHtmlEmailPath':
          return 'output/email-body-results.html';
        default:
          return '';
      }
    });

    await main.run();
    expect(runMock).toHaveReturned();

    // Verify that all of the core library functions were called correctly
    expect(errorMock).not.toHaveBeenCalled();
  });

  it.skip('sets a failed status', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'trxDirPath':
          return 'Invalid folder path';
        case 'attachmentsDirPath':
          return 'Invalid folder path';
        case 'outputHtmlPath':
          return 'Invalid file path';
        default:
          return '';
      }
    });

    await main.run();
    expect(runMock).toHaveReturned();

    // Verify that all of the core library functions were called correctly
    expect(setFailedMock).toHaveBeenNthCalledWith(
      1,
      "'Invalid folder path' is not valid folder path. Should include path separator"
    );
    expect(errorMock).not.toHaveBeenCalled();
  });
});
