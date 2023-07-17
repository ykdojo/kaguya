import { get_encoding } from "@dqbd/tiktoken";

export function countTokens(text) {
  const encoding = get_encoding("cl100k_base");
  const tokens = encoding.encode(text);
  const tokenCount = tokens.length;
  encoding.free();
  return tokenCount;
}