export interface IHtmlGeneratorParameters {
  title: string;
  heading: string;
  onlySummary: boolean;
  noLogs: boolean;
  projectLogoSrc: string | undefined;
  branchName: string | undefined;
  downloadUrl: string | undefined;
}
