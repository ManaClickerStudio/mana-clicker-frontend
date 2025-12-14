import React from "react";
import { useGameStore } from "@/features/game-session";
import { formatNumber } from "@/shared/lib";
import {
  DisplayContainer,
  EssenceIcon,
  EssenceAmount,
  EssenceLabel,
} from "./EssenceDisplay.styles";

export const EssenceDisplay: React.FC = () => {
  const currentEssence = useGameStore((s) => s.state.currentEssence);

  return (
    <DisplayContainer>
      <EssenceIcon>✧</EssenceIcon>
      <EssenceAmount>{formatNumber(currentEssence)}</EssenceAmount>
      <EssenceLabel>Essence</EssenceLabel>
    </DisplayContainer>
  );
};

