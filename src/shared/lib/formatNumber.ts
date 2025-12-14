// Removes trailing zeros: "1.0" -> "1", "1.40" -> "1.4"
const trimTrailingZeros = (str: string): string => {
  if (!str.includes(".")) return str;
  return str.replace(/\.?0+$/, "");
};

const SUFFIXES = [
  { threshold: 1e12, suffix: "T", decimals: 2 },
  { threshold: 1e9, suffix: "B", decimals: 2 },
  { threshold: 1e6, suffix: "M", decimals: 2 },
  { threshold: 1000, suffix: "K", decimals: 1 },
] as const;

interface FormatOptions {
  alwaysShowDecimals?: boolean;
}

// Formats large numbers with suffixes (K, M, B, T)
const formatWithSuffix = (num: number, options: FormatOptions = {}): string => {
  const { alwaysShowDecimals = false } = options;

  for (const { threshold, suffix, decimals } of SUFFIXES) {
    if (num >= threshold) {
      return trimTrailingZeros((num / threshold).toFixed(decimals)) + suffix;
    }
  }

  if (num < 10) {
    return trimTrailingZeros(num.toFixed(1));
  }

  if (alwaysShowDecimals) {
    return trimTrailingZeros(num.toFixed(1));
  }

  return Math.floor(num).toString();
};

// Formats numbers for stats display (MPS/MPC)
export const formatNumber = (num: number): string => {
  return formatWithSuffix(num, { alwaysShowDecimals: false });
};

// Formats mana display with decimals
export const formatMana = (num: number): string => {
  return formatWithSuffix(num, { alwaysShowDecimals: true });
};
