import React, { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useGameStore } from "@/features/game-session";
import { TalentNode } from "./TalentNode";
import { ConfirmModal } from "@/shared/ui";
import { formatNumber } from "@/shared/lib";
import type { TalentPath } from "@/shared/types";
import {
  TreeContainer,
  TreeHeader,
  TreeTitle,
  ResetButton,
  PathsContainer,
  PathColumn,
  PathHeader,
  PathName,
  PathDescription,
  UltimateSection,
  UltimateHeader,
  UltimateTitle,
  ConnectorLine,
} from "./TalentTree.styles";

const PATH_COLORS: Record<TalentPath, string> = {
  hand: "#FF6B6B",
  tower: "#4ECDC4",
  fortune: "#FFD93D",
  ultimate: "#FFD700",
};

const PATH_NAMES: Record<TalentPath, string> = {
  hand: "Path of the Hand",
  tower: "Path of the Tower",
  fortune: "Path of Fortune",
  ultimate: "Ultimate",
};

const PATH_DESCRIPTIONS: Record<TalentPath, string> = {
  hand: "Click power & combos",
  tower: "Idle efficiency & buildings",
  fortune: "Events & luck",
  ultimate: "Master all paths",
};

export const TalentTree: React.FC = () => {
  const { getToken } = useAuth();
  const [isResetting, setIsResetting] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [purchasingId, setPurchasingId] = useState<string | null>(null);

  const currentEssence = useGameStore((s) => s.state.currentEssence);
  const userTalents = useGameStore((s) => s.state.talents);
  const staticTalents = useGameStore((s) => s.state.staticTalents);
  const buyTalent = useGameStore((s) => s.buyTalent);
  const resetTalents = useGameStore((s) => s.resetTalents);

  // Calculate total spent essence
  const totalSpentEssence = userTalents.reduce((sum, talentId) => {
    const talent = staticTalents.find((t) => t.id === talentId);
    return sum + (talent?.essenceCost || 0);
  }, 0);
  const refundAmount = Math.floor(totalSpentEssence * 0.75);

  // Group talents by path
  const talentsByPath = staticTalents.reduce((acc, talent) => {
    if (!acc[talent.path]) {
      acc[talent.path] = [];
    }
    acc[talent.path].push(talent);
    return acc;
  }, {} as Record<TalentPath, typeof staticTalents>);

  // Sort by tier within each path
  Object.keys(talentsByPath).forEach((path) => {
    talentsByPath[path as TalentPath].sort((a, b) => a.tier - b.tier);
  });

  const checkTalentAvailable = (talentId: string): boolean => {
    const talent = staticTalents.find((t) => t.id === talentId);
    if (!talent) return false;

    if (talent.requires.length === 0) return true;
    return talent.requires.every((req) => userTalents.includes(req));
  };

  const handleBuyTalent = async (talentId: string) => {
    if (purchasingId) return;

    setPurchasingId(talentId);
    try {
      const token = await getToken();
      if (token) {
        await buyTalent(talentId, token);
      }
    } catch (error) {
      console.error("Failed to buy talent:", error);
    } finally {
      setPurchasingId(null);
    }
  };

  const handleResetClick = () => {
    if (isResetting || userTalents.length === 0) return;
    setShowResetConfirm(true);
  };

  const handleConfirmReset = async () => {
    setIsResetting(true);
    try {
      const token = await getToken();
      if (token) {
        await resetTalents(token);
      }
      setShowResetConfirm(false);
    } catch (error) {
      console.error("Failed to reset talents:", error);
    } finally {
      setIsResetting(false);
    }
  };

  const renderPath = (path: TalentPath) => {
    const talents = talentsByPath[path] || [];
    const color = PATH_COLORS[path];

    return (
      <PathColumn key={path}>
        <PathHeader $color={color}>
          <PathName $color={color}>{PATH_NAMES[path]}</PathName>
          <PathDescription>{PATH_DESCRIPTIONS[path]}</PathDescription>
        </PathHeader>

        {talents.map((talent, index) => {
          const owned = userTalents.includes(talent.id);
          const available = checkTalentAvailable(talent.id);
          const canAfford = currentEssence >= talent.essenceCost;

          return (
            <React.Fragment key={talent.id}>
              {index > 0 && (
                <ConnectorLine
                  $color={color}
                  $active={userTalents.includes(talents[index - 1].id)}
                />
              )}
              <TalentNode
                talent={talent}
                owned={owned}
                canAfford={canAfford}
                available={available}
                color={color}
                onBuy={() => handleBuyTalent(talent.id)}
              />
            </React.Fragment>
          );
        })}
      </PathColumn>
    );
  };

  const ultimateTalent = talentsByPath["ultimate"]?.[0];

  return (
    <>
      <TreeContainer>
        <TreeHeader>
          <TreeTitle>
            <span>🌟</span>
            Stellar Talents
          </TreeTitle>
          <ResetButton
            onClick={handleResetClick}
            disabled={isResetting || userTalents.length === 0}
          >
            {isResetting ? "Resetting..." : "Reset (75% refund)"}
          </ResetButton>
        </TreeHeader>

        <PathsContainer>
          {renderPath("hand")}
          {renderPath("tower")}
          {renderPath("fortune")}
        </PathsContainer>

        {ultimateTalent && (
          <UltimateSection>
            <UltimateHeader>
              <UltimateTitle>✧ Ultimate Talent ✧</UltimateTitle>
            </UltimateHeader>
            <TalentNode
              talent={ultimateTalent}
              owned={userTalents.includes(ultimateTalent.id)}
              canAfford={currentEssence >= ultimateTalent.essenceCost}
              available={checkTalentAvailable(ultimateTalent.id)}
              color={PATH_COLORS.ultimate}
              onBuy={() => handleBuyTalent(ultimateTalent.id)}
            />
          </UltimateSection>
        )}
      </TreeContainer>

      <ConfirmModal
        isOpen={showResetConfirm}
        onConfirm={handleConfirmReset}
        onCancel={() => setShowResetConfirm(false)}
        title="Reset Talents"
        message="Are you sure you want to reset all your learned talents?"
        icon="🔄"
        variant="danger"
        confirmText="Reset Talents"
        cancelText="Keep Talents"
        isLoading={isResetting}
        details={[
          {
            label: "Talents to reset",
            value: userTalents.length.toString(),
          },
          {
            label: "Total spent",
            value: `${formatNumber(totalSpentEssence)} ✧`,
          },
          {
            label: "Refund (75%)",
            value: `+${formatNumber(refundAmount)} ✧`,
            highlight: true,
          },
        ]}
        warning="This action cannot be undone. You will need to repurchase talents with Essence."
      />
    </>
  );
};

