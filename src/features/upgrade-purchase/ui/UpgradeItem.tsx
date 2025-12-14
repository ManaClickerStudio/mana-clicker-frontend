import React, { useCallback } from "react";
import { useGameStore } from "@/features/game-session";
import { formatNumber } from "@/shared/lib";
import type { Upgrade } from "@/entities/game";
import {
  ItemContainer,
  TitleRow,
  UpgradeTitle,
  StatusPill,
  UpgradeDescription,
  CostRow,
  CostText,
  BuyButton,
  type StatusType,
} from "./UpgradeItem.styles";

interface UpgradeItemProps {
  upgrade: Upgrade;
}

const UpgradeItemComponent: React.FC<UpgradeItemProps> = ({ upgrade }) => {
  const mana = useGameStore((s) => s.state.mana);
  // Select only the specific values needed to avoid re-renders
  const isPurchased = useGameStore(
    (s) => s.state.upgrades?.includes(upgrade.id) ?? false
  );
  const requiredBuildingCount = useGameStore(
    (s) => s.state.buildings?.[upgrade.requiredBuilding || ""] ?? 0
  );
  const buyUpgrade = useGameStore((s) => s.buyUpgrade);

  const canAfford = mana >= upgrade.cost;
  const isRequirementMet =
    !upgrade.requiredBuilding || requiredBuildingCount >= upgrade.requiredCount;

  const status: StatusType = isPurchased
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

export const UpgradeItem = React.memo(UpgradeItemComponent);
