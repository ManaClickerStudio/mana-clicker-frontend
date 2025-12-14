import React from "react";
import { useAuth } from "@clerk/clerk-react";
import { useGameStore } from "@/features/game-session";
import type { AutoBuyerMode } from "@/shared/types";
import {
  PanelContainer,
  PanelHeader,
  PanelTitle,
  ToggleSwitch,
  ToggleInput,
  ToggleSlider,
  ConfigSection,
  ConfigRow,
  ConfigLabel,
  ModeSelector,
  PercentSlider,
  PercentValue,
  LockedOverlay,
  LockedText,
  UnlockHint,
} from "./AutoBuyerPanel.styles";

const MODE_LABELS: Record<AutoBuyerMode, string> = {
  cheapest: "Buy Cheapest",
  mostEfficient: "Most Efficient",
  targetBuilding: "Target Building",
};

export const AutoBuyerPanel: React.FC = () => {
  const { getToken } = useAuth();

  const autoBuyer = useGameStore((s) => s.state.autoBuyer);
  const staticBuildings = useGameStore((s) => s.state.staticBuildings);
  const configureAutoBuyer = useGameStore((s) => s.configureAutoBuyer);

  const handleToggle = async () => {
    try {
      const token = await getToken();
      if (token) {
        await configureAutoBuyer({ enabled: !autoBuyer.enabled }, token);
      }
    } catch (error) {
      console.error("Failed to toggle auto-buyer:", error);
    }
  };

  const handleModeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      const token = await getToken();
      if (token) {
        await configureAutoBuyer(
          { mode: e.target.value as AutoBuyerMode },
          token
        );
      }
    } catch (error) {
      console.error("Failed to change mode:", error);
    }
  };

  const handleTargetChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    try {
      const token = await getToken();
      if (token) {
        await configureAutoBuyer(
          { targetBuilding: e.target.value || null },
          token
        );
      }
    } catch (error) {
      console.error("Failed to change target:", error);
    }
  };

  const handlePercentChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const token = await getToken();
      if (token) {
        await configureAutoBuyer(
          { maxSpendPercent: parseInt(e.target.value, 10) },
          token
        );
      }
    } catch (error) {
      console.error("Failed to change percent:", error);
    }
  };

  return (
    <PanelContainer $unlocked={autoBuyer.unlocked}>
      <PanelHeader>
        <PanelTitle>
          <span>🛒</span>
          Auto-Buyer
        </PanelTitle>
        {autoBuyer.unlocked && (
          <ToggleSwitch>
            <ToggleInput
              type="checkbox"
              checked={autoBuyer.enabled}
              onChange={handleToggle}
            />
            <ToggleSlider />
          </ToggleSwitch>
        )}
      </PanelHeader>

      {autoBuyer.unlocked ? (
        <ConfigSection>
          <ConfigRow>
            <ConfigLabel>Mode</ConfigLabel>
            <ModeSelector value={autoBuyer.mode} onChange={handleModeChange}>
              {Object.entries(MODE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </ModeSelector>
          </ConfigRow>

          {autoBuyer.mode === "targetBuilding" && (
            <ConfigRow>
              <ConfigLabel>Target</ConfigLabel>
              <ModeSelector
                value={autoBuyer.targetBuilding || ""}
                onChange={handleTargetChange}
              >
                <option value="">Select building...</option>
                {staticBuildings.map((building) => (
                  <option key={building.id} value={building.id}>
                    {building.name}
                  </option>
                ))}
              </ModeSelector>
            </ConfigRow>
          )}

          <ConfigRow>
            <ConfigLabel>Max Spend</ConfigLabel>
            <PercentSlider
              type="range"
              min="1"
              max="50"
              value={autoBuyer.maxSpendPercent}
              onChange={handlePercentChange}
            />
            <PercentValue>{autoBuyer.maxSpendPercent}%</PercentValue>
          </ConfigRow>
        </ConfigSection>
      ) : (
        <LockedOverlay>
          <LockedText>🔒 Locked</LockedText>
          <UnlockHint>Requires 5 Ascensions + "Rune of Wealth"</UnlockHint>
        </LockedOverlay>
      )}
    </PanelContainer>
  );
};
