import { COLORS, ColorType } from "@/constants/app";

export function colorFromText(text: string): ColorType {
  const lastChar = text.charAt(text.length - 1);
  const charCode = lastChar.toLowerCase().charCodeAt(0);
  const index = charCode % COLORS.length;
  return COLORS[index];
}
