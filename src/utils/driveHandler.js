function convertGoogleDriveUrl(url) {
  const match = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
  if (match) {
    return `https://drive.google.com/uc?export=download&id=${match[1]}`;
  }
  return url; // Return original if not a Google Drive URL
}

export default convertGoogleDriveUrl;