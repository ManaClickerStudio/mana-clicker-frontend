import React, { useEffect, useState } from "react";
import { useGameStore } from "@/features/game-session";
import type { SurgeType } from "@/shared/types";
import {
  BoostsContainer,
  BoostPill,
  BoostIcon,
  BoostInfo,
  BoostName,
  BoostTimer,
  NoBoostsText,
} from "./ActiveBoostsBar.styles";

const BOOST_ICONS: Record<SurgeType, string> = {
  GoldenOrb: "✨",
  ClickFrenzy: "⚡",
  BuildingBoost: "🏛️",
  LuckyDrop: "💎",
};

const BOOST_COLORS: Record<SurgeType, string> = {
  GoldenOrb: "#FFD700",
  ClickFrenzy: "#FF4500",
  BuildingBoost: "#9932CC",
  LuckyDrop: "#00FF7F",
};

const formatTimeRemaining = (ms: number): string => {
  const seconds = Math.ceil(ms / 1000);
  if (seconds >= 60) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  }
  return `${seconds}s`;
};

export const ActiveBoostsBar: React.FC = () => {
  const activeBoosts = useGameStore((s) => s.state.activeBoosts);
  const staticSurgeTypes = useGameStore((s) => s.state.staticSurgeTypes);
  const [now, setNow] = useState(Date.now());

  // Update timer every second
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Filter out expired boosts
  const validBoosts = activeBoosts.filter((boost) => boost.expiresAt > now);

  if (validBoosts.length === 0) {
    return (
      <BoostsContainer>
        <NoBoostsText>No active boosts</NoBoostsText>
      </BoostsContainer>
    );
  }

  return (
    <BoostsContainer>
      {validBoosts.map((boost, index) => {
        const surgeData = staticSurgeTypes?.find((s) => s.id === boost.type);
        const timeRemaining = boost.expiresAt - now;
        const isExpiring = timeRemaining < 10000;
        const color = BOOST_COLORS[boost.type];

        return (
          <BoostPill
            key={`${boost.type}-${index}`}
            $color={color}
            $isExpiring={isExpiring}
          >
            <BoostIcon>{BOOST_ICONS[boost.type]}</BoostIcon>
            <BoostInfo>
              <BoostName>
                {surgeData?.name || boost.type}
                {boost.target && ` (${boost.target})`}
              </BoostName>
              <BoostTimer>
                x{boost.multiplier} • {formatTimeRemaining(timeRemaining)}
              </BoostTimer>
            </BoostInfo>
          </BoostPill>
        );
      })}
    </BoostsContainer>
  );
};
