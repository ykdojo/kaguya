import { get_encoding } from "@dqbd/tiktoken";

export function countTokens(text) {
  // Replace special tokens
  const cleanedText = text.replace(/<\|.{1,10}?\|>/g, '');
  const encoding = get_encoding("cl100k_base");
  const tokens = encoding.encode(cleanedText);
  const tokenCount = tokens.length;
  encoding.free();
  return tokenCount;
}