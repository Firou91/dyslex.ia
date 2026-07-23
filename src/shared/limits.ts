export const TEXT_LIMITS = {
  defaultMaxChars: 120_000,
  terminalMaxChars: 200_000,
  diffMaxChars: 200_000
} as const;

export function assertSize(name: string, text: string, maxChars: number = TEXT_LIMITS.defaultMaxChars): void {
  if (text.length > maxChars) {
    throw new Error(`${name} is too large (${text.length} chars). Limit is ${maxChars} chars. Provide a smaller excerpt or split the input.`);
  }
}
