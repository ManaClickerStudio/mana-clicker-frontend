import React, { useMemo } from "react";
import { useGameStore } from "@/features/game-session";
import { UpgradeItem } from "./UpgradeItem";
import type { Upgrade } from "@/entities/game";
import {
  SidePanel,
  PanelHeader,
  PanelContent,
  EmptyState,
} from "./UpgradeList.styles";

// Sort upgrades by: 1) not purchased first, 2) lower cost first
// This is more stable than sorting by affordability (which changes every click)
const getSortKey = (
  upgrade: Upgrade,
  buildings: Record<string, number>,
  purchasedUpgrades: string[]
): number => {
  const isPurchased = purchasedUpgrades.includes(upgrade.id);
  if (isPurchased) return Number.MAX_SAFE_INTEGER;

  // Check if requirements are met (building count based - changes less often than mana)
  const requiredBuildingCount = buildings[upgrade.requiredBuilding || ""] ?? 0;
  const isRequirementMet =
    !upgrade.requiredBuilding || requiredBuildingCount >= upgrade.requiredCount;

  // Prioritize: requirements met first, then by cost
  return isRequirementMet ? upgrade.cost : upgrade.cost + 1e12;
};

export const UpgradeList: React.FC = () => {
  const upgradeDefinitions = useGameStore(
    (state) => state.state.staticUpgrades
  );
  const buildings = useGameStore((state) => state.state.buildings);
  const purchasedUpgrades = useGameStore((state) => state.state.upgrades);

  // Sort only when buildings or purchased upgrades change (not on every mana change)
  // Individual UpgradeItem components handle their own "can afford" styling
  const sortedUpgrades = useMemo(() => {
    if (!upgradeDefinitions || upgradeDefinitions.length === 0) return [];

    return [...upgradeDefinitions].sort((a, b) => {
      const keyA = getSortKey(a, buildings, purchasedUpgrades);
      const keyB = getSortKey(b, buildings, purchasedUpgrades);
      return keyA - keyB;
    });
  }, [upgradeDefinitions, buildings, purchasedUpgrades]);

  return (
    <SidePanel>
      <PanelHeader>
        <h2>✨ Upgrades</h2>
      </PanelHeader>
      <PanelContent>
        {sortedUpgrades.length === 0 ? (
          <EmptyState>Loading upgrades...</EmptyState>
        ) : (
          sortedUpgrades.map((upgrade) => (
            <UpgradeItem key={upgrade.id} upgrade={upgrade} />
          ))
        )}
      </PanelContent>
    </SidePanel>
  );
};
