// Configuration
const COST_MULTIPLIER = 1.18; // 18% cost multiplier for buildings

/**
 * Calculate the cost of a building based on its base cost and current count
 */
export const calculateBuildingCost = (
  baseCost: number,
  currentCount: number
): number => {
  return Math.ceil(baseCost * Math.pow(COST_MULTIPLIER, currentCount));
};

/**
 * Calculate total cost for buying N buildings
 */
export const calculateMultipleCost = (
  baseCost: number,
  currentCount: number,
  amount: number
): number => {
  let totalCost = 0;
  for (let i = 0; i < amount; i++) {
    totalCost += calculateBuildingCost(baseCost, currentCount + i);
  }
  return totalCost;
};

/**
 * Calculate max buildings affordable with current mana
 */
export const calculateMaxAffordable = (
  baseCost: number,
  currentCount: number,
  mana: number
): number => {
  let count = 0;
  let totalCost = 0;
  while (true) {
    const nextCost = calculateBuildingCost(baseCost, currentCount + count);
    if (totalCost + nextCost > mana) break;
    totalCost += nextCost;
    count++;
  }
  return count;
};
