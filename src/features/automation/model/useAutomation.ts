import { useAutoClicker } from "./useAutoClicker";
import { useAutoBuyer } from "./useAutoBuyer";

// Combined automation hook for both auto-clicker and auto-buyer
export const useAutomation = (isActive: boolean) => {
  useAutoClicker(isActive);
  useAutoBuyer(isActive);
};
