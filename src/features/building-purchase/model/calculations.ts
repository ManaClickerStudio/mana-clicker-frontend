const COST_MULTIPLIER = 1.18;

// Oblicza koszt budynku na podstawie kosztu bazowego i ilości posiadanych
export const calculateBuildingCost = (
  baseCost: number,
  currentCount: number
): number => {
  return Math.ceil(baseCost * Math.pow(COST_MULTIPLIER, currentCount));
};

// Oblicza łączny koszt zakupu N budynków
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

// Oblicza maksymalną ilość budynków możliwych do kupienia za obecną manę
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
