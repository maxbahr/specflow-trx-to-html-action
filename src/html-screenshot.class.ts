import puppeteer from 'puppeteer';
import fs from 'fs/promises';

export class HtmlScreenshot {
  static async getScreenshotHtmlBase64(fileName: string, htmlPage: string): Promise<string> {
    const screenshotName = fileName.replace('.html', '.png');

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
      width: 1200,
      height: 0
    });
    await page.setContent(htmlPage);
    await page.screenshot({ path: screenshotName, fullPage: true });
    await browser.close();

    const data = await fs.readFile(screenshotName);
    return Buffer.from(data).toString('base64');
  }
}
