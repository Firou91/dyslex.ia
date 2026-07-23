const tokenPattern =
  /(`[^`]+`|https?:\/\/[^\s),;]+|(?:[A-Za-z]:\\|\/|\.\.?\/)[^\s"',;<>]+|--?[A-Za-z0-9][\w-]*|[A-Z_][A-Z0-9_]{2,}|@[a-z0-9_.-]+\/[a-z0-9_.-]+|[a-z0-9_.-]+@[a-z0-9_.-]+|[a-f0-9]{7,40})/gi;

export interface ProtectedText {
  text: string;
  tokens: string[];
}

export function protectTechnicalTokens(input: string): ProtectedText {
  const tokens: string[] = [];
  const text = input.replace(tokenPattern, (match) => {
    const index = tokens.push(match) - 1;
    return `__DYX_TOKEN_${index}__`;
  });
  return { text, tokens };
}

export function restoreTechnicalTokens(input: string, tokens: string[]): string {
  return input.replace(/__DYX_TOKEN_(\d+)__/g, (_, rawIndex: string) => tokens[Number(rawIndex)] ?? _);
}

export function listTechnicalTokens(input: string): string[] {
  return Array.from(new Set(input.match(tokenPattern) ?? []));
}
