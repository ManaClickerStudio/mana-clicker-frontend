// Usuwa zbędne zera po przecinku: "1.0" -> "1", "1.40" -> "1.4"
const trimTrailingZeros = (str: string): string => {
  if (!str.includes(".")) return str;
  return str.replace(/\.?0+$/, "");
};

// Formatuje liczby dla statystyk (MPS/MPC) - bez ".0" dla całkowitych
export const formatNumber = (num: number): string => {
  if (num >= 1e12) return trimTrailingZeros((num / 1e12).toFixed(2)) + "T";
  if (num >= 1e9) return trimTrailingZeros((num / 1e9).toFixed(2)) + "B";
  if (num >= 1e6) return trimTrailingZeros((num / 1e6).toFixed(2)) + "M";
  if (num >= 1000) return trimTrailingZeros((num / 1000).toFixed(1)) + "K";
  if (num < 10) return trimTrailingZeros(num.toFixed(1));
  return Math.floor(num).toString();
};

// Formatuje manę - pokazuje dziesiętne do 1000, powyżej używa sufiksów
export const formatMana = (num: number): string => {
  if (num >= 1e12) return trimTrailingZeros((num / 1e12).toFixed(2)) + "T";
  if (num >= 1e9) return trimTrailingZeros((num / 1e9).toFixed(2)) + "B";
  if (num >= 1e6) return trimTrailingZeros((num / 1e6).toFixed(2)) + "M";
  if (num >= 1000) return trimTrailingZeros((num / 1000).toFixed(1)) + "K";
  return trimTrailingZeros(num.toFixed(1));
};
