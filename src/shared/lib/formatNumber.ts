/**
 * Formats a number into a human-readable string with appropriate suffixes.
 * @param num - The number to format
 * @returns Formatted string (e.g., "1.5K", "2.3M", "1.0B")
 */
export const formatNumber = (num: number): string => {
  if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  if (num < 10) return num.toFixed(1);
  return Math.floor(num).toString();
};
