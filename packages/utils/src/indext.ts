// URL helper
export function extractId(url: string) {
  const parts = url.split("/");
  return parts[parts.length - 2];
}