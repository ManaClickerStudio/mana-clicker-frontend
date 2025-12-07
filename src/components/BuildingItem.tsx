import React, { useMemo, useCallback } from "react";
import { useGameStore } from "../store/gameStore";
import { Building } from "../types/game";
import { calculateBuildingCost } from "../store/gameStore";
import {
  ItemContainer,
  Icon,
  Details,
  Title,
  Stats,
  CostButton,
} from "./BuildingItem.styles";

interface BuildingItemProps {
  building: Building;
}

const formatNumber = (num: number): string => {
  if (num >= 1000000000) return (num / 1000000000).toFixed(2) + "B";
  if (num >= 1000000) return (num / 1000000).toFixed(2) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return Math.ceil(num).toString();
};

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

const BuildingItem: React.FC<BuildingItemProps> = ({ building }) => {
  const mana = useGameStore((store) => store.state.mana);
  const buildings = useGameStore((store) => store.state.buildings);
  const buyBuilding = useGameStore((store) => store.buyBuilding);

  const count = buildings?.[building.id] ?? 0;

  const nextCost = useMemo(
    () => calculateBuildingCost(building.baseCost, count),
    [count, building.baseCost]
  );

  const canAfford = mana >= nextCost;

  const handleBuy = useCallback(() => {
    if (canAfford) {
      buyBuilding(building.id);
    }
  }, [canAfford, buyBuilding, building.id]);

  return (
    <ItemContainer $canAfford={canAfford} onClick={handleBuy}>
      <Icon>{getBuildingIcon(building.id)}</Icon>
      <Details>
        <Title>
          {building.name} ({count})
        </Title>
        <Stats>+{formatNumber(building.baseMps)} MPS</Stats>
      </Details>
      <CostButton $canAfford={canAfford}>
        {formatNumber(nextCost)}
      </CostButton>
    </ItemContainer>
  );
};

export default React.memo(BuildingItem);
