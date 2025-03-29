export function extractFileExtension(fileName: string): string | null {
  if (!fileName || !fileName.includes(".")) {
    return null;
  }

  const parts = fileName.split(".");
  const fileExtension = parts[parts.length - 1];
  return fileExtension;
}
