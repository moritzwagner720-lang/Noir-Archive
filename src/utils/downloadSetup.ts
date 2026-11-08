/**
 * Navigates to the official GitHub releases download page:
 * https://github.com/moritzwagner720-lang/noir-archive-downloads/releases/tag/v1.0.0
 */

export const GITHUB_DOWNLOAD_URL =
  'https://github.com/moritzwagner720-lang/noir-archive-downloads/releases/tag/v1.0.0';

export function downloadSetupExe(url = GITHUB_DOWNLOAD_URL): boolean {
  try {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    return true;
  } catch (err) {
    console.error('Error navigating to download page:', err);
    try {
      window.location.href = url;
      return true;
    } catch {
      return false;
    }
  }
}
