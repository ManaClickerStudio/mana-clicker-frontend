import React, { useCallback } from "react";
import { useGameStore } from "../store/gameStore";
import { Upgrade } from "../types/game";
import {
  ItemContainer,
  TitleRow,
  UpgradeTitle,
  StatusPill,
  UpgradeDescription,
  CostRow,
  CostText,
  BuyButton,
} from "./UpgradeItem.styles";

interface UpgradeItemProps {
  upgrade: Upgrade;
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) return (num / 1000000).toFixed(2) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return Math.ceil(num).toString();
};

const UpgradeItem: React.FC<UpgradeItemProps> = ({ upgrade }) => {
  const mana = useGameStore((s) => s.state.mana);
  const upgrades = useGameStore((s) => s.state.upgrades);
  const buildings = useGameStore((s) => s.state.buildings);
  const buyUpgrade = useGameStore((s) => s.buyUpgrade);

  const isPurchased = upgrades?.includes(upgrade.id) ?? false;
  const canAfford = mana >= upgrade.cost;

  const requiredBuildingCount = buildings?.[upgrade.requiredBuilding || ""] ?? 0;
  const isRequirementMet =
    !upgrade.requiredBuilding || requiredBuildingCount >= upgrade.requiredCount;

  const status: "available" | "purchased" | "locked" = isPurchased
    ? "purchased"
    : !isRequirementMet
    ? "locked"
    : canAfford
    ? "available"
    : "locked";

  const getStatusLabel = () => {
    if (isPurchased) return "PURCHASED";
    if (!isRequirementMet)
      return `Requires ${upgrade.requiredCount}x ${upgrade.requiredBuilding}`;
    if (!canAfford) return "TOO EXPENSIVE";
    return "AVAILABLE";
  };

  const handleBuy = useCallback(() => {
    if (status === "available") {
      buyUpgrade(upgrade.id);
    }
  }, [status, buyUpgrade, upgrade.id]);

  return (
    <ItemContainer $status={status} onClick={handleBuy}>
      <TitleRow>
        <UpgradeTitle>{upgrade.name}</UpgradeTitle>
        <StatusPill $status={status}>{getStatusLabel()}</StatusPill>
      </TitleRow>

      <UpgradeDescription>{upgrade.description}</UpgradeDescription>

      {!isPurchased && (
        <CostRow>
          <CostText $canAfford={canAfford && isRequirementMet}>
            Cost: {formatNumber(upgrade.cost)} Mana
          </CostText>
          <BuyButton
            $canAfford={canAfford && isRequirementMet}
            disabled={!canAfford || !isRequirementMet}
          >
            {status === "locked" ? "BLOCKED" : "BUY"}
          </BuyButton>
        </CostRow>
      )}
    </ItemContainer>
  );
};

export default React.memo(UpgradeItem);
