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

type UpgradeStatus = "available" | "locked" | "purchased";

const getUpgradeStatus = (
  upgrade: Upgrade,
  mana: number,
  buildings: Record<string, number>,
  purchasedUpgrades: string[]
): UpgradeStatus => {
  if (purchasedUpgrades.includes(upgrade.id)) return "purchased";

  const requiredBuildingCount = buildings[upgrade.requiredBuilding || ""] ?? 0;
  const isRequirementMet =
    !upgrade.requiredBuilding || requiredBuildingCount >= upgrade.requiredCount;
  const canAfford = mana >= upgrade.cost;

  if (canAfford && isRequirementMet) return "available";
  return "locked";
};

export const UpgradeList: React.FC = () => {
  const upgradeDefinitions = useGameStore(
    (state) => state.state.staticUpgrades
  );
  const mana = useGameStore((state) => state.state.mana);
  const buildings = useGameStore((state) => state.state.buildings);
  const purchasedUpgrades = useGameStore((state) => state.state.upgrades);

  const sortedUpgrades = useMemo(() => {
    if (!upgradeDefinitions || upgradeDefinitions.length === 0) return [];

    const statusPriority: Record<UpgradeStatus, number> = {
      available: 0,
      locked: 1,
      purchased: 2,
    };

    return [...upgradeDefinitions].sort((a, b) => {
      const statusA = getUpgradeStatus(a, mana, buildings, purchasedUpgrades);
      const statusB = getUpgradeStatus(b, mana, buildings, purchasedUpgrades);
      return statusPriority[statusA] - statusPriority[statusB];
    });
  }, [upgradeDefinitions, mana, buildings, purchasedUpgrades]);

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

