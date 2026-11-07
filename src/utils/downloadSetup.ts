/**
 * Cleanly downloads /downloads/Setup.exe as "Noir Archive Setup.exe"
 */
export async function downloadSetupExe(
  url = '/downloads/Setup.exe',
  filename = 'Noir Archive Setup.exe'
): Promise<boolean> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.status}`);
    }

    const blob = await response.blob();
    const octetBlob = new Blob([blob], { type: 'application/octet-stream' });
    const blobUrl = URL.createObjectURL(octetBlob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      URL.revokeObjectURL(blobUrl);
    }, 5000);

    return true;
  } catch (err) {
    console.error('Error downloading Setup.exe via blob:', err);

    try {
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    } catch {
      return false;
    }
  }
}
