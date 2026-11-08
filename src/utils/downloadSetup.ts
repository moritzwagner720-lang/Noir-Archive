/**
 * Cleanly downloads the Windows installer from:
 * https://github.com/moritzwagner720-lang/noir-archive-downloads/releases/latest/download/Setup.exe
 * Filename: "Noir Archive Setup.exe"
 */

export const GITHUB_DOWNLOAD_URL =
  'https://github.com/moritzwagner720-lang/noir-archive-downloads/releases/latest/download/Setup.exe';

export async function downloadSetupExe(
  url = GITHUB_DOWNLOAD_URL,
  filename = 'Noir Archive Setup.exe'
): Promise<boolean> {
  try {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.setAttribute('download', filename);
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return true;
  } catch (err) {
    console.error('Error initiating installer download:', err);
    try {
      window.location.assign(url);
      return true;
    } catch {
      return false;
    }
  }
}

