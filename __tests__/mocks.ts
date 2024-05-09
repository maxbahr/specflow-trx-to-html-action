import { IUnitTestResult } from '../src/interfaces/unit-test-result.type';
import { ISummaryResult } from '../src/interfaces/summary-result.type';

export const mockUnitTestResult: IUnitTestResult = {
  testId: '1',
  testDomainStartTime: new Date('2024-03-12T10:00:00Z'),
  testDomainEndTime: new Date('2024-03-12T10:30:00Z'),
  testDomain: 'Example Domain',
  featureName: 'Example Feature',
  testFullName: 'Example Test',
  testName: 'exampleTest',
  testParameters: 'param1, param2',
  outcome: 'passed',
  duration: 1500, // duration in milliseconds
  startTime: new Date('2024-03-12T10:05:00Z'),
  endTime: new Date('2024-03-12T10:10:00Z'),
  stdout: 'Example output',
  gherkinLogs: [
    {
      key: '1',
      step: 'Given I have a scenario',
      status: 'passed',
      time: '2024-03-12T10:06:00Z',
      log: ['Step passed successfully'],
      attachments: ['B2C_SignInAndSignUp\\SignUp_2024_12_3__05_13_24_113\\20240312_051645_screenshot.png']
    },
    {
      key: '2',
      step: 'When I perform an action',
      status: 'passed',
      time: '2024-03-12T10:08:00Z',
      log: ['Action performed successfully']
    }
  ],
  attachmentFiles: [
    {
      filePath: '/path/to/attachment1.jpg',
      fileName: 'attachment1.jpg',
      base64Data: 'base64EncodedData...',
      fileType: 'image/jpeg'
    }
  ],
  errMsg: null,
  rerun: false
};

export const mockSummaryResult: ISummaryResult = {
  domain: 'Example Domain',
  total: 10,
  passed: 8,
  failed: 1,
  ignored: 1,
  duration: 30000, // duration in milliseconds
  startDate: new Date('2024-03-12T09:00:00Z'),
  endDate: new Date('2024-03-12T09:30:00Z')
};

export const mockTrxParsedResult: IUnitTestResult[] = [
  {
    testId: 'f3f5623c-d2b4-b906-907c-16405bc94284',
    testDomainStartTime: new Date('2024-03-12T05:12:10.7544238+00:00'),
    testDomainEndTime: new Date('2024-03-12T05:16:45.9327168+00:00'),
    testDomain: 'B2C',
    featureName: 'B2C - SignInAndSignUp',
    testFullName: 'Sign Up',
    testName: 'Sign Up',
    testParameters: '',
    testRequirementsIds: 'TC-21808, TC-18024, TC-19803, TC-17729',
    outcome: 'Failed',
    duration: 201.557,
    startTime: new Date('2024-03-12T05:13:24.119Z'),
    endTime: new Date('2024-03-12T05:16:45.676Z'),
    stdout:
      "-> Report_Req_Ids: TC-21808, TC-18024, TC-19803, TC-17729\n-> Screen Resolution: 1920 x 1080\nGiven application is open\n-> DRIVER: Navigated to https://app.com/\n-> Application successfully launched\n-> done: SignInSignUpSteps.GivenApplicationIsOpen() (1.0s)\nThen sign in page is displayed\n-> done: SignInSignUpSteps.SignInPageIsDisplayed() (4.8s)\nWhen sign up button is clicked on sign in page\n-> DRIVER: Finding By css selector: [class*=loader]\n-> DRIVER: Finding By css selector: #createAccount\n-> DRIVER: Finding By css selector: [class*=loader]\n-> DRIVER: Finding By css selector: #createAccount\n-> DRIVER: Clicked <a> text='SIGN UP' value='' data-testid='' type='' id='createAccount' name='' class='btn btn-outline-primary w-100 sign-up-button' \n-> done: SignInSignUpSteps.SignUpButtonIsClickedOnSignInPage() (0.6s)\nThen page subheader 'Accept Terms of Use.' is displayed\n-> DRIVER: Finding By css selector: [class*=loader]\n-> DRIVER: Finding By css selector: .header-container :nth-child(2)\n-> done: SignInSignUpSteps.PageSubHeaderIsDisplayed(\"Accept Terms of Use.\") (0.5s)\nWhen terms of use are read on sign up page\n-> DRIVER: Finding By css selector: [class*=loader]\n-> DRIVER: Finding By css selector: #tou_container p\n-> DRIVER: Finding By css selector: [class*=loader]\n-> DRIVER: Finding By css selector: #tou_container p\n-> DRIVER: Clicked <p> text='Version 1.1, Modified 16 July 2020' value='' data-testid='' type='' id='' name='' class='' \n-> done: SignInSignUpSteps.TermOfUseAreReadOnSignUpPage() (0.5s)\nThen submit button 'Accept & Continue' is enabled\n-> DRIVER: Finding By css selector: [class*=loader]\n-> DRIVER: Finding By css selector: [id*=continue]\n-> done: SignInSignUpSteps.ThenSubmitButtonIsDisabled(\"Accept & Continue\", \"enabled\") (1.0s)\nWhen submit button 'Accept & Continue' is clicked\n-> DRIVER: Finding By css selector: [class*=loader]\n-> DRIVER: Finding By css selector: [id*=continue]\n-> DRIVER: Finding By css selector: [class*=loader]\n-> DRIVER: Finding By css selector: [id*=continue]\n-> DRIVER: Clicked <button> text='ACCEPT AND CONTINUE' value='' data-testid='' type='submit' id='continue' name='' class='btn btn-primary' \n-> done: SignInSignUpSteps.WhenSubmitButtonIsClicked(\"Accept & Continue\") (0.3s)\nThen page subheader 'Accept Privacy Policy.' is displayed\n-> DRIVER: Finding By css selector: [class*=loader]\n-> DRIVER: Finding By css selector: .header-container :nth-child(2)\n-> done: SignInSignUpSteps.PageSubHeaderIsDisplayed(\"Accept Privacy Po...\") (1.1s)\nWhen privacy policy is read on sign up page\n-> DRIVER: Finding By css selector: [class*=loader]\n-> DRIVER: Finding By css selector: #pp_container p\n-> DRIVER: Finding By css selector: [class*=loader]\n-> DRIVER: Finding By css selector: #pp_container p\n-> DRIVER: Clicked <p> text='Version 1.1, Modified 16 July 2020' value='' data-testid='' type='' id='' name='' class='' \n-> done: SignInSignUpSteps.PrivacyPolicyIsReadOnSignUpPage() (0.4s)\nThen submit button 'Accept & Continue' is enabled\n-> DRIVER: Finding By css selector: [class*=loader]\n-> DRIVER: Finding By css selector: [id*=continue]\n-> done: SignInSignUpSteps.ThenSubmitButtonIsDisabled(\"Accept & Continue\", \"enabled\") (1.0s)\nWhen submit button 'Accept & Continue' is clicked\n-> DRIVER: Finding By css selector: [class*=loader]\n-> DRIVER: Finding By css selector: [id*=continue]\n-> DRIVER: Finding By css selector: [class*=loader]\n-> DRIVER: Finding By css selector: [id*=continue]\n-> DRIVER: Clicked <button> text='ACCEPT AND CONTINUE' value='' data-testid='' type='submit' id='continue' name='' class='btn btn-primary' \n-> done: SignInSignUpSteps.WhenSubmitButtonIsClicked(\"Accept & Continue\") (0.3s)\nThen page subheader 'Please enter your email. We will send a verification code to your email inbox.' is displayed\n-> DRIVER: Finding By css selector: [class*=loader]\n-> DRIVER: Finding By css selector: .header-container :nth-child(2)\n-> done: SignInSignUpSteps.PageSubHeaderIsDisplayed(\"Please enter your...\") (1.1s)\nThen submit button 'Send Code' is disabled\n-> DRIVER: Finding By css selector: [class*=loader]\n-> DRIVER: Finding By css selector: [id*=send_code]\n-> done: SignInSignUpSteps.ThenSubmitButtonIsDisabled(\"Send Code\", \"disabled\") (1.0s)\nWhen email is verified on sign up page\n-> DRIVER: Finding By css selector: [class*=loader]\n-> DRIVER: Finding By css selector: #email\n-> DRIVER: Finding By css selector: [class*=loader]\n-> DRIVER: Finding By css selector: #email\n-> DRIVER: Changed value from '' to 'trx@gmail.com'\n-> DRIVER: Finding By css selector: [class*=loader]\n-> DRIVER: Finding By css selector: [id$=send_code]\n-> DRIVER: Finding By css selector: [class*=loader]\n-> DRIVER: Finding By css selector: [id$=send_code]\n-> DRIVER: Clicked <button> text='SEND CODE' value='' data-testid='' type='button' id='emailVerificationControlOnSignUp_but_send_code' name='' class='sendCode btn btn-primary' \n-> error: There is no email with Verify your Email Address after 3/12/2024 5:13:38 AM (187.2s)\nThen submit button 'Verify Code' is enabled\n-> skipped because of previous errors\nWhen submit button 'Verify Code' is clicked\n-> skipped because of previous errors\nThen page subheader 'Please enter your information.' is displayed\n-> skipped because of previous errors\nThen submit button 'Continue' is disabled\n-> skipped because of previous errors\nWhen personal data values are entered:\n  --- table step argument ---\n  | key       | value    |\n  | FirstName | {TEXT}60 |\n  | LastName  | {TEXT}60 |\n-> skipped because of previous errors\nThen submit button 'Continue' is enabled\n-> skipped because of previous errors\nWhen submit button 'Continue' is clicked\n-> skipped because of previous errors\nThen page subheader 'Please create your password.' is displayed\n-> skipped because of previous errors\nThen submit button 'Create password' is disabled\n-> skipped because of previous errors\nWhen password is entered on sign up page\n-> skipped because of previous errors\nThen submit button 'Create account' is enabled\n-> skipped because of previous errors\nWhen submit button 'Create account' is clicked\n-> skipped because of previous errors\nThen sign in page is displayed\n-> skipped because of previous errors\nWhen new user is signed in\n-> skipped because of previous errors\nThen welcome page is displayed\n-> skipped because of previous errors\nThen text 'Welcome to {AppSettings}ApplicationName! Follow these quick steps to create your account.' in 'Welcome Title' component is displayed\n-> skipped because of previous errors\n-> Attachment '/TestData/B2C_SignInAndSignUp/SignUp_2024_12_3__05_13_24_113/20240312_051645_screenshot.png' added (not forwarded to the test runner).",
    gherkinLogs: [
      {
        key: 'Hook',
        step: 'Before',
        status: 'unknown',
        time: '0.0s',
        log: ['-> Report_Req_Ids: TC-21808, TC-18024, TC-19803, TC-17729', '-> Screen Resolution: 1920 x 1080']
      },
      {
        key: 'Given',
        step: 'application is open',
        status: 'done',
        time: '1.0s',
        log: [
          '-> DRIVER: Navigated to https://app.com/',
          '-> Application successfully launched',
          '-> done: SignInSignUpSteps.GivenApplicationIsOpen() (1.0s)'
        ]
      },
      {
        key: 'Then',
        step: 'sign in page is displayed',
        status: 'done',
        time: '4.8s',
        log: ['-> done: SignInSignUpSteps.SignInPageIsDisplayed() (4.8s)']
      },
      {
        key: 'When',
        step: 'sign up button is clicked on sign in page',
        status: 'done',
        time: '0.6s',
        log: [
          '-> DRIVER: Finding By css selector: [class*=loader]',
          '-> DRIVER: Finding By css selector: #createAccount',
          '-> DRIVER: Finding By css selector: [class*=loader]',
          '-> DRIVER: Finding By css selector: #createAccount',
          "-> DRIVER: Clicked <a> text='SIGN UP' value='' data-testid='' type='' id='createAccount' name='' class='btn btn-outline-primary w-100 sign-up-button' ",
          '-> done: SignInSignUpSteps.SignUpButtonIsClickedOnSignInPage() (0.6s)'
        ]
      },
      {
        key: 'Then',
        step: "page subheader 'Accept Terms of Use.' is displayed",
        status: 'done',
        time: '0.5s',
        log: [
          '-> DRIVER: Finding By css selector: [class*=loader]',
          '-> DRIVER: Finding By css selector: .header-container :nth-child(2)',
          '-> done: SignInSignUpSteps.PageSubHeaderIsDisplayed("Accept Terms of Use.") (0.5s)'
        ]
      },
      {
        key: 'When',
        step: 'terms of use are read on sign up page',
        status: 'done',
        time: '0.5s',
        log: [
          '-> DRIVER: Finding By css selector: [class*=loader]',
          '-> DRIVER: Finding By css selector: #tou_container p',
          '-> DRIVER: Finding By css selector: [class*=loader]',
          '-> DRIVER: Finding By css selector: #tou_container p',
          "-> DRIVER: Clicked <p> text='Version 1.1, Modified 16 July 2020' value='' data-testid='' type='' id='' name='' class='' ",
          '-> done: SignInSignUpSteps.TermOfUseAreReadOnSignUpPage() (0.5s)'
        ]
      },
      {
        key: 'Then',
        step: "submit button 'Accept & Continue' is enabled",
        status: 'done',
        time: '1.0s',
        log: [
          '-> DRIVER: Finding By css selector: [class*=loader]',
          '-> DRIVER: Finding By css selector: [id*=continue]',
          '-> done: SignInSignUpSteps.ThenSubmitButtonIsDisabled("Accept & Continue", "enabled") (1.0s)'
        ]
      },
      {
        key: 'When',
        step: "submit button 'Accept & Continue' is clicked",
        status: 'done',
        time: '0.3s',
        log: [
          '-> DRIVER: Finding By css selector: [class*=loader]',
          '-> DRIVER: Finding By css selector: [id*=continue]',
          '-> DRIVER: Finding By css selector: [class*=loader]',
          '-> DRIVER: Finding By css selector: [id*=continue]',
          "-> DRIVER: Clicked <button> text='ACCEPT AND CONTINUE' value='' data-testid='' type='submit' id='continue' name='' class='btn btn-primary' ",
          '-> done: SignInSignUpSteps.WhenSubmitButtonIsClicked("Accept & Continue") (0.3s)'
        ]
      },
      {
        key: 'Then',
        step: "page subheader 'Accept Privacy Policy.' is displayed",
        status: 'done',
        time: '1.1s',
        log: [
          '-> DRIVER: Finding By css selector: [class*=loader]',
          '-> DRIVER: Finding By css selector: .header-container :nth-child(2)',
          '-> done: SignInSignUpSteps.PageSubHeaderIsDisplayed("Accept Privacy Po...") (1.1s)'
        ]
      },
      {
        key: 'When',
        step: 'privacy policy is read on sign up page',
        status: 'done',
        time: '0.4s',
        log: [
          '-> DRIVER: Finding By css selector: [class*=loader]',
          '-> DRIVER: Finding By css selector: #pp_container p',
          '-> DRIVER: Finding By css selector: [class*=loader]',
          '-> DRIVER: Finding By css selector: #pp_container p',
          "-> DRIVER: Clicked <p> text='Version 1.1, Modified 16 July 2020' value='' data-testid='' type='' id='' name='' class='' ",
          '-> done: SignInSignUpSteps.PrivacyPolicyIsReadOnSignUpPage() (0.4s)'
        ]
      },
      {
        key: 'Then',
        step: "submit button 'Accept & Continue' is enabled",
        status: 'done',
        time: '1.0s',
        log: [
          '-> DRIVER: Finding By css selector: [class*=loader]',
          '-> DRIVER: Finding By css selector: [id*=continue]',
          '-> done: SignInSignUpSteps.ThenSubmitButtonIsDisabled("Accept & Continue", "enabled") (1.0s)'
        ]
      },
      {
        key: 'When',
        step: "submit button 'Accept & Continue' is clicked",
        status: 'done',
        time: '0.3s',
        log: [
          '-> DRIVER: Finding By css selector: [class*=loader]',
          '-> DRIVER: Finding By css selector: [id*=continue]',
          '-> DRIVER: Finding By css selector: [class*=loader]',
          '-> DRIVER: Finding By css selector: [id*=continue]',
          "-> DRIVER: Clicked <button> text='ACCEPT AND CONTINUE' value='' data-testid='' type='submit' id='continue' name='' class='btn btn-primary' ",
          '-> done: SignInSignUpSteps.WhenSubmitButtonIsClicked("Accept & Continue") (0.3s)'
        ]
      },
      {
        key: 'Then',
        step: "page subheader 'Please enter your email. We will send a verification code to your email inbox.' is displayed",
        status: 'done',
        time: '1.1s',
        log: [
          '-> DRIVER: Finding By css selector: [class*=loader]',
          '-> DRIVER: Finding By css selector: .header-container :nth-child(2)',
          '-> done: SignInSignUpSteps.PageSubHeaderIsDisplayed("Please enter your...") (1.1s)'
        ]
      },
      {
        key: 'Then',
        step: "submit button 'Send Code' is disabled",
        status: 'done',
        time: '1.0s',
        log: [
          '-> DRIVER: Finding By css selector: [class*=loader]',
          '-> DRIVER: Finding By css selector: [id*=send_code]',
          '-> done: SignInSignUpSteps.ThenSubmitButtonIsDisabled("Send Code", "disabled") (1.0s)'
        ]
      },
      {
        key: 'When',
        step: 'email is verified on sign up page',
        status: 'error',
        time: '187.2s',
        log: [
          '-> DRIVER: Finding By css selector: [class*=loader]',
          '-> DRIVER: Finding By css selector: #email',
          '-> DRIVER: Finding By css selector: [class*=loader]',
          '-> DRIVER: Finding By css selector: #email',
          "-> DRIVER: Changed value from '' to 'trx@gmail.com'",
          '-> DRIVER: Finding By css selector: [class*=loader]',
          '-> DRIVER: Finding By css selector: [id$=send_code]',
          '-> DRIVER: Finding By css selector: [class*=loader]',
          '-> DRIVER: Finding By css selector: [id$=send_code]',
          "-> DRIVER: Clicked <button> text='SEND CODE' value='' data-testid='' type='button' id='emailVerificationControlOnSignUp_but_send_code' name='' class='sendCode btn btn-primary' ",
          '-> error: There is no email with Verify your Email Address after 3/12/2024 5:13:38 AM (187.2s)'
        ]
      },
      {
        key: 'Then',
        step: "submit button 'Verify Code' is enabled",
        status: 'skipped',
        time: '0.0s',
        log: ['-> skipped because of previous errors']
      },
      {
        key: 'When',
        step: "submit button 'Verify Code' is clicked",
        status: 'skipped',
        time: '0.0s',
        log: ['-> skipped because of previous errors']
      },
      {
        key: 'Then',
        step: "page subheader 'Please enter your information.' is displayed",
        status: 'skipped',
        time: '0.0s',
        log: ['-> skipped because of previous errors']
      },
      {
        key: 'Then',
        step: "submit button 'Continue' is disabled",
        status: 'skipped',
        time: '0.0s',
        log: ['-> skipped because of previous errors']
      },
      {
        key: 'When',
        step: 'personal data values are entered:',
        status: 'skipped',
        time: '0.0s',
        log: ['-> skipped because of previous errors'],
        table: [
          '  --- table step argument ---',
          '  | key       | value    |',
          '  | FirstName | {TEXT}60 |',
          '  | LastName  | {TEXT}60 |'
        ]
      },
      {
        key: 'Then',
        step: "submit button 'Continue' is enabled",
        status: 'skipped',
        time: '0.0s',
        log: ['-> skipped because of previous errors']
      },
      {
        key: 'When',
        step: "submit button 'Continue' is clicked",
        status: 'skipped',
        time: '0.0s',
        log: ['-> skipped because of previous errors']
      },
      {
        key: 'Then',
        step: "page subheader 'Please create your password.' is displayed",
        status: 'skipped',
        time: '0.0s',
        log: ['-> skipped because of previous errors']
      },
      {
        key: 'Then',
        step: "submit button 'Create password' is disabled",
        status: 'skipped',
        time: '0.0s',
        log: ['-> skipped because of previous errors']
      },
      {
        key: 'When',
        step: 'password is entered on sign up page',
        status: 'skipped',
        time: '0.0s',
        log: ['-> skipped because of previous errors']
      },
      {
        key: 'Then',
        step: "submit button 'Create account' is enabled",
        status: 'skipped',
        time: '0.0s',
        log: ['-> skipped because of previous errors']
      },
      {
        key: 'When',
        step: "submit button 'Create account' is clicked",
        status: 'skipped',
        time: '0.0s',
        log: ['-> skipped because of previous errors']
      },
      {
        key: 'Then',
        step: 'sign in page is displayed',
        status: 'skipped',
        time: '0.0s',
        log: ['-> skipped because of previous errors']
      },
      {
        key: 'When',
        step: 'new user is signed in',
        status: 'skipped',
        time: '0.0s',
        log: ['-> skipped because of previous errors']
      },
      {
        key: 'Then',
        step: 'welcome page is displayed',
        status: 'skipped',
        time: '0.0s',
        log: ['-> skipped because of previous errors']
      },
      {
        key: 'Then',
        step: "text 'Welcome to {AppSettings}ApplicationName! Follow these quick steps to create your account.' in 'Welcome Title' component is displayed",
        status: 'skipped',
        time: '0.0s',
        log: [
          '-> skipped because of previous errors',
          "-> Attachment '/TestData/B2C_SignInAndSignUp/SignUp_2024_12_3__05_13_24_113/20240312_051645_screenshot.png' added (not forwarded to the test runner)."
        ],
        attachments: ['/TestData/B2C_SignInAndSignUp/SignUp_2024_12_3__05_13_24_113/20240312_051645_screenshot.png']
      }
    ],
    errMsg: 'System.Exception : There is no email with Verify your Email Address after 3/12/2024 5:13:38 AM',
    rerun: false
  },
  {
    testId: 'e9e9cfd1-a7ad-b87c-11ce-a511407fda4a',
    testDomainStartTime: new Date('2024-03-12T05:12:10.7544238+00:00'),
    testDomainEndTime: new Date('2024-03-12T05:16:45.9327168+00:00'),
    testDomain: 'B2C',
    featureName: 'B2C - SignInAndSignUp',
    testFullName: 'Sign In and Sign out',
    testName: 'Sign In and Sign out',
    testParameters: '',
    testRequirementsIds: undefined,
    outcome: 'Passed',
    duration: 72.301,
    startTime: new Date('2024-03-12T05:12:11.811Z'),
    endTime: new Date('2024-03-12T05:13:24.112Z'),
    stdout:
      "-> Screen Resolution: 1920 x 1080\nGiven owner user is signed in\n-> done: TestSteps.GivenOwnerUserIsSignedIn(\"\", \"in\") (11.0s)\nGiven application is open\n-> DRIVER: Navigated to https://app.com/?orgId=12bc\n-> Application successfully launched in context of organization 12bc\n-> done: SignInSignUpSteps.GivenApplicationIsOpen() (1.5s)\nThen sign in page is displayed\n-> done: SignInSignUpSteps.SignInPageIsDisplayed() (4.8s)\nWhen owner is signed in\n-> DRIVER: Finding By css selector: [class*=loader]\n-> DRIVER: Finding By css selector: #signInName\n-> DRIVER: Finding By css selector: [class*=loader]\n-> DRIVER: Finding By css selector: #signInName\n-> DRIVER: Changed value from '' to 'trx@gmail.com'\n-> DRIVER: Finding By css selector: [class*=loader]\n-> DRIVER: Finding By css selector: #password\n-> DRIVER: Finding By css selector: [class*=loader]\n-> DRIVER: Finding By css selector: #password\n-> DRIVER: Changed value from '' to '**********'\n-> DRIVER: Finding By css selector: [class*=loader]\n-> DRIVER: Finding By css selector: [type=submit]\n-> DRIVER: Finding By css selector: [class*=loader]\n-> DRIVER: Finding By css selector: [type=submit]\n-> DRIVER: Clicked <button> text='LOG IN' value='' data-testid='' type='submit' id='next' name='' class='btn btn-primary' \n-> done: SignInSignUpSteps.UserIsSignedIn(\"owner\") (3.0s)\nThen home page is displayed\n-> DRIVER: Finding By css selector: [class*=loader]\n-> DRIVER: Finding By css selector: [class*=appContainer]\n-> done: NavigationBarSteps.ThenPageIsDisplayed(\"home\") (1.5s)\nWhen 'Locations' on navigation bar is clicked\n-> DRIVER: Finding By css selector: [class*=loader]\n-> DRIVER: Finding By css selector: [class$=appContent]\n-> DRIVER: Finding By css selector: [data-testdevice]\n-> done: NavigationBarSteps.WhenOnNavigationBarIsClicked(\"Locations\") (4.1s)\nThen locations page is displayed\n-> DRIVER: Finding By css selector: [class*=loader]\n-> DRIVER: Finding By css selector: [class*=appContainer]\n-> done: NavigationBarSteps.ThenPageIsDisplayed(\"locations\") (0.0s)\nWhen 'Sign Out' on navigation bar is clicked\n-> DRIVER: Finding By css selector: [class*=loader]\n-> DRIVER: Finding By css selector: [class$=appContent]\n-> DRIVER: Finding By css selector: [class*=loader]\n-> DRIVER: Finding By css selector: [data-testid='side-nav-menu']\n-> DRIVER: Finding By css selector: [class*=loader]\n-> DRIVER: Finding By css selector: [data-testid^='nav-link--']\n-> done: NavigationBarSteps.WhenOnNavigationBarIsClicked(\"Sign Out\") (3.7s)\nThen sign in page is displayed\n-> done: SignInSignUpSteps.SignInPageIsDisplayed() (4.9s)\n",
    gherkinLogs: [
      {
        key: 'Hook',
        step: 'Before',
        status: 'unknown',
        time: '0.0s',
        log: ['-> Screen Resolution: 1920 x 1080']
      },
      {
        key: 'Given',
        step: 'owner user is signed in',
        status: 'done',
        time: '11.0s',
        log: ['-> done: TestSteps.GivenOwnerUserIsSignedIn("", "in") (11.0s)']
      },
      {
        key: 'Given',
        step: 'application is open',
        status: 'done',
        time: '1.5s',
        log: [
          '-> DRIVER: Navigated to https://app.com/?orgId=12bc',
          '-> Application successfully launched in context of organization 12bc',
          '-> done: SignInSignUpSteps.GivenApplicationIsOpen() (1.5s)'
        ]
      },
      {
        key: 'Then',
        step: 'sign in page is displayed',
        status: 'done',
        time: '4.8s',
        log: ['-> done: SignInSignUpSteps.SignInPageIsDisplayed() (4.8s)']
      },
      {
        key: 'When',
        step: 'owner is signed in',
        status: 'done',
        time: '3.0s',
        log: [
          '-> DRIVER: Finding By css selector: [class*=loader]',
          '-> DRIVER: Finding By css selector: #signInName',
          '-> DRIVER: Finding By css selector: [class*=loader]',
          '-> DRIVER: Finding By css selector: #signInName',
          "-> DRIVER: Changed value from '' to 'trx@gmail.com'",
          '-> DRIVER: Finding By css selector: [class*=loader]',
          '-> DRIVER: Finding By css selector: #password',
          '-> DRIVER: Finding By css selector: [class*=loader]',
          '-> DRIVER: Finding By css selector: #password',
          "-> DRIVER: Changed value from '' to '**********'",
          '-> DRIVER: Finding By css selector: [class*=loader]',
          '-> DRIVER: Finding By css selector: [type=submit]',
          '-> DRIVER: Finding By css selector: [class*=loader]',
          '-> DRIVER: Finding By css selector: [type=submit]',
          "-> DRIVER: Clicked <button> text='LOG IN' value='' data-testid='' type='submit' id='next' name='' class='btn btn-primary' ",
          '-> done: SignInSignUpSteps.UserIsSignedIn("owner") (3.0s)'
        ]
      },
      {
        key: 'Then',
        step: 'home page is displayed',
        status: 'done',
        time: '1.5s',
        log: [
          '-> DRIVER: Finding By css selector: [class*=loader]',
          '-> DRIVER: Finding By css selector: [class*=appContainer]',
          '-> done: NavigationBarSteps.ThenPageIsDisplayed("home") (1.5s)'
        ]
      },
      {
        key: 'When',
        step: "'Locations' on navigation bar is clicked",
        status: 'done',
        time: '4.1s',
        log: [
          '-> DRIVER: Finding By css selector: [class*=loader]',
          '-> DRIVER: Finding By css selector: [class$=appContent]',
          '-> DRIVER: Finding By css selector: [data-testdevice]',
          '-> done: NavigationBarSteps.WhenOnNavigationBarIsClicked("Locations") (4.1s)'
        ]
      },
      {
        key: 'Then',
        step: 'locations page is displayed',
        status: 'done',
        time: '0.0s',
        log: [
          '-> DRIVER: Finding By css selector: [class*=loader]',
          '-> DRIVER: Finding By css selector: [class*=appContainer]',
          '-> done: NavigationBarSteps.ThenPageIsDisplayed("locations") (0.0s)'
        ]
      },
      {
        key: 'When',
        step: "'Sign Out' on navigation bar is clicked",
        status: 'done',
        time: '3.7s',
        log: [
          '-> DRIVER: Finding By css selector: [class*=loader]',
          '-> DRIVER: Finding By css selector: [class$=appContent]',
          '-> DRIVER: Finding By css selector: [class*=loader]',
          "-> DRIVER: Finding By css selector: [data-testid='side-nav-menu']",
          '-> DRIVER: Finding By css selector: [class*=loader]',
          "-> DRIVER: Finding By css selector: [data-testid^='nav-link--']",
          '-> done: NavigationBarSteps.WhenOnNavigationBarIsClicked("Sign Out") (3.7s)'
        ]
      },
      {
        key: 'Then',
        step: 'sign in page is displayed',
        status: 'done',
        time: '4.9s',
        log: ['-> done: SignInSignUpSteps.SignInPageIsDisplayed() (4.9s)']
      },
      {
        key: 'Hook',
        step: 'After',
        status: 'unknown',
        time: '0.0s',
        log: ['']
      }
    ],
    errMsg: '',
    rerun: false
  }
];
