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
