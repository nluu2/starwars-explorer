const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']

export function toRoman(n: number): string {
  return ROMAN[n] ?? String(n)
}

// URL helper
export function extractId(url: string) {
  const parts = url.split('/')
  const last = parts[parts.length - 1]
  return last !== '' ? last : parts[parts.length - 2]
}
