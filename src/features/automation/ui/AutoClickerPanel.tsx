import React from "react";
import { useAuth } from "@clerk/clerk-react";
import { useGameStore } from "@/features/game-session";
import { formatNumber } from "@/shared/lib";
import {
  PanelContainer,
  PanelHeader,
  PanelTitle,
  ToggleSwitch,
  ToggleInput,
  ToggleSlider,
  StatsRow,
  StatLabel,
  StatValue,
  LockedOverlay,
  LockedText,
  UnlockHint,
} from "./AutoClickerPanel.styles";

export const AutoClickerPanel: React.FC = () => {
  const { getToken } = useAuth();

  const autoClicker = useGameStore((s) => s.state.autoClicker);
  const currentMPC = useGameStore((s) => s.state.currentMPC);
  const toggleAutoClicker = useGameStore((s) => s.toggleAutoClicker);

  const handleToggle = async () => {
    try {
      const token = await getToken();
      if (token) {
        await toggleAutoClicker(!autoClicker.enabled, token);
      }
    } catch (error) {
      console.error("Failed to toggle auto-clicker:", error);
    }
  };

  // Auto-clicker produces 25% of MPC per click by default
  const clickEfficiency = 0.25;
  const clicksPerSecond = autoClicker.level;
  const manaPerSecond = currentMPC * clickEfficiency * clicksPerSecond;

  return (
    <PanelContainer $unlocked={autoClicker.unlocked}>
      <PanelHeader>
        <PanelTitle>
          <span>🤖</span>
          Auto-Clicker
        </PanelTitle>
        {autoClicker.unlocked && (
          <ToggleSwitch>
            <ToggleInput
              type="checkbox"
              checked={autoClicker.enabled}
              onChange={handleToggle}
            />
            <ToggleSlider />
          </ToggleSwitch>
        )}
      </PanelHeader>

      {autoClicker.unlocked ? (
        <>
          <StatsRow>
            <StatLabel>Level</StatLabel>
            <StatValue>{autoClicker.level}</StatValue>
          </StatsRow>
          <StatsRow>
            <StatLabel>Clicks/sec</StatLabel>
            <StatValue>{clicksPerSecond}</StatValue>
          </StatsRow>
          <StatsRow>
            <StatLabel>Efficiency</StatLabel>
            <StatValue>{(clickEfficiency * 100).toFixed(0)}% MPC</StatValue>
          </StatsRow>
          <StatsRow>
            <StatLabel>Mana/sec</StatLabel>
            <StatValue>+{formatNumber(manaPerSecond)}</StatValue>
          </StatsRow>
        </>
      ) : (
        <LockedOverlay>
          <LockedText>🔒 Locked</LockedText>
          <UnlockHint>Purchase "Rune of Automation" to unlock</UnlockHint>
        </LockedOverlay>
      )}
    </PanelContainer>
  );
};

