import fetch from 'node-fetch';

export function formatTime(seconds: number): string {
  if (seconds < 60) {
    return `${Math.round(seconds)}s`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${Math.round(remainingSeconds)}s`;
  } else {
    const hours = Math.floor(seconds / 3600);
    const remainingMinutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}h ${remainingMinutes}m ${Math.round(remainingSeconds)}s`;
  }
}

export function truncateText(text: string, maxLength: number): string {
  text = text.replace(/[\r\n]+/g, ' ');
  if (text.length > maxLength) {
    return `${text.substring(0, maxLength)}...`;
  } else {
    return text;
  }
}

export function calculatePercentage(part: number, total: number): number {
  if (total === 0) {
    return 0;
  }

  const percentage = (part / total) * 100;
  return parseFloat(percentage.toFixed(1));
}

export const iconTotal = '🧾';
export const iconPassed = '✅';
export const iconFailed = '❌';
export const iconIgnored = '⚪';
export const iconRerun = '🔄';

export async function getImageAsBase64(url: string): Promise<string> {
  const imageType = guessImageTypeFromExtension(url);
  const prefix = `data:${imageType};base64,`;

  try {
    const response = await fetch(new URL(url));
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    const imageBuffer = await response.buffer();
    const base64Data = imageBuffer.toString('base64');
    return prefix + base64Data;
  } catch (error) {
    console.error(`Error fetching image from url: '${url}':`, error);
    throw error;
  }
}

function guessImageTypeFromExtension(url: string): string | undefined {
  const extension = url.split('.').pop()?.toLowerCase();
  const extensionToMIME: { [key: string]: string } = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    svg: 'image/svg+xml'
  };
  if (extension && Object.prototype.hasOwnProperty.call(extensionToMIME, extension)) {
    return extensionToMIME[extension];
  } else {
    return undefined;
  }
}
