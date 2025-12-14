import React from "react";
import type { Talent } from "@/shared/types";
import { formatNumber } from "@/shared/lib";
import {
  NodeContainer,
  NodeHeader,
  NodeIcon,
  NodeName,
  NodeDescription,
  NodeFooter,
  NodeCost,
  NodeStatus,
  TierBadge,
} from "./TalentNode.styles";

const PATH_ICONS: Record<string, string> = {
  hand: "👋",
  tower: "🏛️",
  fortune: "🍀",
  ultimate: "⭐",
};

interface TalentNodeProps {
  talent: Talent;
  owned: boolean;
  canAfford: boolean;
  available: boolean;
  color: string;
  onBuy: () => void;
}

export const TalentNode: React.FC<TalentNodeProps> = ({
  talent,
  owned,
  canAfford,
  available,
  color,
  onBuy,
}) => {
  const handleClick = () => {
    if (!owned && available && canAfford) {
      onBuy();
    }
  };

  return (
    <NodeContainer
      $owned={owned}
      $canAfford={canAfford}
      $available={available}
      $color={color}
      onClick={handleClick}
    >
      <NodeHeader>
        <NodeIcon>{PATH_ICONS[talent.path]}</NodeIcon>
        <NodeName>{talent.name}</NodeName>
        <TierBadge $color={color}>T{talent.tier}</TierBadge>
      </NodeHeader>

      <NodeDescription>{talent.description}</NodeDescription>

      <NodeFooter>
        {owned ? (
          <NodeStatus $owned={true}>✓ Learned</NodeStatus>
        ) : (
          <>
            <NodeCost $canAfford={canAfford}>
              {formatNumber(talent.essenceCost)} ✧
            </NodeCost>
            <NodeStatus $owned={false}>
              {!available
                ? "Locked"
                : canAfford
                ? "Click to learn"
                : "Need more Essence"}
            </NodeStatus>
          </>
        )}
      </NodeFooter>
    </NodeContainer>
  );
};

