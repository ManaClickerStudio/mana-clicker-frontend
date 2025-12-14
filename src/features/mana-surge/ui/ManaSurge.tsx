import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useGameStore } from "@/features/game-session";
import type { SurgeType } from "@/shared/types";
import {
  SurgeOverlay,
  SurgeContainer,
  SurgeOrb,
  SurgeRing,
  SurgeInfo,
  SurgeName,
  SurgeDescription,
  TimerBar,
  TimerFill,
  ClickHint,
} from "./ManaSurge.styles";

const SURGE_ICONS: Record<SurgeType, string> = {
  GoldenOrb: "✨",
  ClickFrenzy: "⚡",
  BuildingBoost: "🏛️",
  LuckyDrop: "💎",
};

export const ManaSurge: React.FC = () => {
  const { getToken } = useAuth();
  const activeSurge = useGameStore((s) => s.activeSurge);
  const staticSurgeTypes = useGameStore((s) => s.state.staticSurgeTypes);
  const claimSurge = useGameStore((s) => s.claimSurge);
  const dismissSurge = useGameStore((s) => s.dismissSurge);

  const [timeRemaining, setTimeRemaining] = useState(1);
  const [isExpiring, setIsExpiring] = useState(false);

  const surgeData = activeSurge
    ? staticSurgeTypes?.find((s) => s.id === activeSurge.type)
    : null;

  // Update timer
  useEffect(() => {
    if (!activeSurge) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const remaining = Math.max(0, (activeSurge.expiresAt - now) / (surgeData?.timeToClick || 10) / 1000);
      setTimeRemaining(remaining);

      if (remaining <= 0) {
        setIsExpiring(true);
        setTimeout(() => {
          dismissSurge();
          setIsExpiring(false);
        }, 500);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [activeSurge, surgeData, dismissSurge]);

  const handleClick = useCallback(async () => {
    if (!activeSurge || isExpiring) return;

    try {
      const token = await getToken();
      if (token) {
        await claimSurge(activeSurge.type, token);
      }
    } catch (error) {
      console.error("Failed to claim surge:", error);
    }
  }, [activeSurge, isExpiring, getToken, claimSurge]);

  if (!activeSurge || !surgeData) return null;

  return (
    <SurgeOverlay $isExpiring={isExpiring} onClick={handleClick}>
      <SurgeContainer $color={surgeData.color}>
        <TimerBar>
          <TimerFill $progress={timeRemaining} $color={surgeData.color} />
        </TimerBar>

        <SurgeOrb $color={surgeData.color}>
          <SurgeRing $color={surgeData.color} />
          {SURGE_ICONS[activeSurge.type]}
        </SurgeOrb>

        <ClickHint>CLICK!</ClickHint>

        <SurgeInfo>
          <SurgeName>{surgeData.name}</SurgeName>
          <SurgeDescription>{surgeData.description}</SurgeDescription>
        </SurgeInfo>
      </SurgeContainer>
    </SurgeOverlay>
  );
};

