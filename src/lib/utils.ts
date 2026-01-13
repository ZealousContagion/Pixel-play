import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getContrastRatio(hex1: string, hex2: string) {
  const getLuminance = (hex: string) => {
    const rgb = hex.startsWith('#') 
      ? [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)]
      : [0, 0, 0];
    const a = rgb.map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  const brightest = Math.max(l1, l2);
  const darkest = Math.min(l1, l2);
  return (brightest + 0.05) / (darkest + 0.05);
}

export function getContrastScore(ratio: number) {
    if (ratio >= 7) return "AAA_PASS";
    if (ratio >= 4.5) return "AA_PASS";
    if (ratio >= 3) return "LARGE_ONLY";
    return "FAIL";
}
