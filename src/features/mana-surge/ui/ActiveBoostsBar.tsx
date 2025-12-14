import React, { useEffect, useState, memo } from "react";
import { useGameStore } from "@/features/game-session";
import type { SurgeType, ActiveBoost, StaticSurgeType } from "@/shared/types";
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

// Separate component for timer - only this re-renders every second
interface BoostPillTimerProps {
  boost: ActiveBoost;
  surgeData: StaticSurgeType | undefined;
}

const BoostPillTimer = memo<BoostPillTimerProps>(({ boost, surgeData }) => {
  const [timeRemaining, setTimeRemaining] = useState(
    boost.expiresAt - Date.now()
  );
  const isExpiring = timeRemaining < 10000;
  const color = BOOST_COLORS[boost.type];

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = boost.expiresAt - Date.now();
      setTimeRemaining(remaining);
    }, 1000);
    return () => clearInterval(interval);
  }, [boost.expiresAt]);

  // Don't render if expired
  if (timeRemaining <= 0) return null;

  return (
    <BoostPill $color={color} $isExpiring={isExpiring}>
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
});

BoostPillTimer.displayName = "BoostPillTimer";

export const ActiveBoostsBar: React.FC = () => {
  const activeBoosts = useGameStore((s) => s.state.activeBoosts);
  const staticSurgeTypes = useGameStore((s) => s.state.staticSurgeTypes);

  // Filter out boosts that are definitely expired (with some buffer)
  const potentiallyValidBoosts = activeBoosts.filter(
    (boost) => boost.expiresAt > Date.now() - 2000
  );

  if (potentiallyValidBoosts.length === 0) {
    return (
      <BoostsContainer>
        <NoBoostsText>No active boosts</NoBoostsText>
      </BoostsContainer>
    );
  }

  return (
    <BoostsContainer>
      {potentiallyValidBoosts.map((boost, index) => {
        const surgeData = staticSurgeTypes?.find((s) => s.id === boost.type);
        return (
          <BoostPillTimer
            key={`${boost.type}-${boost.expiresAt}-${index}`}
            boost={boost}
            surgeData={surgeData}
          />
        );
      })}
    </BoostsContainer>
  );
};
