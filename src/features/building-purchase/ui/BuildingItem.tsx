import React, { useMemo, useCallback } from "react";
import { useGameStore } from "@/features/game-session";
import { formatNumber } from "@/shared/lib";
import type { Building } from "@/entities/game";
import {
  calculateBuildingCost,
  calculateMultipleCost,
  calculateMaxAffordable,
} from "../model/calculations";
import {
  ItemContainer,
  Icon,
  Details,
  Title,
  Stats,
  PriceSection,
  QuantityBadge,
  CostButton,
} from "./BuildingItem.styles";

interface BuildingItemProps {
  building: Building;
}

const getBuildingIcon = (id: string): string => {
  const icons: Record<string, string> = {
    ArcaneDust: "✨",
    Apprentice: "🧙",
    Tower: "🏰",
    Portal: "🌀",
    Golem: "🤖",
    Lab: "🔬",
    Nexus: "💫",
    Plane: "🌌",
    Forge: "⭐",
    Grand: "🔮",
  };
  return icons[id] || "✨";
};

export const BuildingItem: React.FC<BuildingItemProps> = ({ building }) => {
  const mana = useGameStore((store) => store.state.mana);
  const buildings = useGameStore((store) => store.state.buildings);
  const buyMultipleBuildings = useGameStore(
    (store) => store.buyMultipleBuildings
  );
  const purchaseMultiplier = useGameStore((store) => store.purchaseMultiplier);

  const count = buildings?.[building.id] ?? 0;

  const { purchaseCount, totalCost, canAfford } = useMemo(() => {
    if (purchaseMultiplier === "max") {
      const maxCount = calculateMaxAffordable(building.baseCost, count, mana);
      const cost =
        maxCount > 0
          ? calculateMultipleCost(building.baseCost, count, maxCount)
          : calculateBuildingCost(building.baseCost, count);
      return {
        purchaseCount: maxCount,
        totalCost: cost,
        canAfford: maxCount > 0,
      };
    } else {
      const cost = calculateMultipleCost(
        building.baseCost,
        count,
        purchaseMultiplier
      );
      return {
        purchaseCount: purchaseMultiplier,
        totalCost: cost,
        canAfford: mana >= cost,
      };
    }
  }, [purchaseMultiplier, building.baseCost, count, mana]);

  const handleBuy = useCallback(() => {
    if (canAfford && purchaseCount > 0) {
      buyMultipleBuildings(building.id, purchaseCount);
    }
  }, [canAfford, purchaseCount, buyMultipleBuildings, building.id]);

  const showQuantity = purchaseMultiplier === "max" && purchaseCount > 0;

  return (
    <ItemContainer $canAfford={canAfford} onClick={handleBuy}>
      <Icon>{getBuildingIcon(building.id)}</Icon>
      <Details>
        <Title>
          {building.name} ({count})
        </Title>
        <Stats>+{formatNumber(building.baseMps)} MPS</Stats>
      </Details>
      <PriceSection>
        {showQuantity && <QuantityBadge>x{purchaseCount}</QuantityBadge>}
        <CostButton $canAfford={canAfford}>{formatNumber(totalCost)}</CostButton>
      </PriceSection>
    </ItemContainer>
  );
};

export default React.memo(BuildingItem);

