import React from "react";
import { useGameStore } from "@/features/game-session";
import { BuildingItem } from "./BuildingItem";
import type { PurchaseMultiplier } from "@/entities/game";
import {
  SidePanel,
  PanelHeader,
  HeaderRow,
  MultiplierRow,
  MultiplierButton,
  PanelContent,
  EmptyState,
} from "./BuildingList.styles";

const MULTIPLIER_OPTIONS: PurchaseMultiplier[] = [1, 10, 25, 50, "max"];

export const BuildingList: React.FC = () => {
  const buildingDefinitions = useGameStore(
    (state) => state.state.staticBuildings
  );
  const purchaseMultiplier = useGameStore((state) => state.purchaseMultiplier);
  const setPurchaseMultiplier = useGameStore(
    (state) => state.setPurchaseMultiplier
  );

  return (
    <SidePanel>
      <PanelHeader>
        <HeaderRow>
          <h2>🏗️ Buildings</h2>
        </HeaderRow>
        <MultiplierRow>
          {MULTIPLIER_OPTIONS.map((mult) => (
            <MultiplierButton
              key={mult}
              $active={purchaseMultiplier === mult}
              onClick={() => setPurchaseMultiplier(mult)}
            >
              {mult === "max" ? "MAX" : `x${mult}`}
            </MultiplierButton>
          ))}
        </MultiplierRow>
      </PanelHeader>
      <PanelContent>
        {!buildingDefinitions || buildingDefinitions.length === 0 ? (
          <EmptyState>Loading buildings...</EmptyState>
        ) : (
          buildingDefinitions.map((building) => (
            <BuildingItem key={building.id} building={building} />
          ))
        )}
      </PanelContent>
    </SidePanel>
  );
};

