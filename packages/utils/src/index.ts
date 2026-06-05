// URL helper
export function extractId(url: string) {
  const parts = url.split('/')
  const last = parts[parts.length - 1]
  return last !== '' ? last : parts[parts.length - 2]
}
