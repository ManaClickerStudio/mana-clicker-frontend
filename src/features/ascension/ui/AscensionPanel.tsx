import React, { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useGameStore } from "@/features/game-session";
import { formatNumber } from "@/shared/lib";
import { ConfirmModal } from "@/shared/ui";
import {
  PanelContainer,
  PanelHeader,
  PanelTitle,
  PanelIcon,
  EssencePreview,
  EssenceLabel,
  EssenceValue,
  RequirementText,
  ProgressionInfo,
  AscendButton,
  WarningText,
  StatsGrid,
  StatItem,
  StatLabel,
  StatValue,
} from "./AscensionPanel.styles";

const MINIMUM_MANA_REQUIRED = 1000000;

// Calculates mana needed to gain next essence point
const calculateManaForNextEssence = (currentTotalMana: number): number => {
  if (currentTotalMana < MINIMUM_MANA_REQUIRED) return MINIMUM_MANA_REQUIRED;

  // Formula: essence = floor(log10(mana)^2.5)
  // Inverse: mana = 10^(essence^(1/2.5))
  const currentEssence = Math.floor(
    Math.pow(Math.log10(currentTotalMana), 2.5)
  );
  const nextEssence = currentEssence + 1;
  const manaForNext = Math.ceil(Math.pow(10, Math.pow(nextEssence, 1 / 2.5)));

  return manaForNext;
};

export const AscensionPanel: React.FC = () => {
  const { getToken } = useAuth();
  const [isAscending, setIsAscending] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const totalManaEarned = useGameStore((s) => s.state.totalManaEarned);
  const currentEssence = useGameStore((s) => s.state.currentEssence);
  const totalEssenceEarned = useGameStore((s) => s.state.totalEssenceEarned);
  const ascensionCount = useGameStore((s) => s.state.ascensionCount);
  const mana = useGameStore((s) => s.state.mana);
  const buildings = useGameStore((s) => s.state.buildings);
  const upgrades = useGameStore((s) => s.state.upgrades);
  const getEssencePreview = useGameStore((s) => s.getEssencePreview);
  const performAscension = useGameStore((s) => s.performAscension);

  const essenceToGain = getEssencePreview();
  const canAscend = totalManaEarned >= MINIMUM_MANA_REQUIRED;
  const manaForNextEssence = calculateManaForNextEssence(totalManaEarned);
  const manaNeededForNext = manaForNextEssence - totalManaEarned;

  const totalBuildings = Object.values(buildings).reduce(
    (sum, count) => sum + count,
    0
  );

  const handleAscendClick = () => {
    if (!canAscend || isAscending) return;
    setShowConfirm(true);
  };

  const handleConfirmAscend = async () => {
    setIsAscending(true);
    try {
      const token = await getToken();
      if (token) {
        await performAscension(token);
      }
      setShowConfirm(false);
    } catch (error) {
      console.error("Ascension failed:", error);
    } finally {
      setIsAscending(false);
    }
  };

  return (
    <>
      <PanelContainer>
        <PanelHeader>
          <PanelIcon>✨</PanelIcon>
          <PanelTitle>Ascension</PanelTitle>
        </PanelHeader>

        <EssencePreview>
          <EssenceLabel>Essence to gain on Ascension:</EssenceLabel>
          <EssenceValue $canAscend={canAscend}>
            +{formatNumber(essenceToGain)} ✧
          </EssenceValue>
          <RequirementText $met={canAscend}>
            {canAscend
              ? "✓ Requirements met!"
              : `Requires ${formatNumber(
                  MINIMUM_MANA_REQUIRED
                )} total mana (have ${formatNumber(totalManaEarned)})`}
          </RequirementText>
          {canAscend && manaNeededForNext > 0 && (
            <ProgressionInfo>
              Next +1 essence at {formatNumber(manaForNextEssence)} mana (
              {formatNumber(manaNeededForNext)} more)
            </ProgressionInfo>
          )}
        </EssencePreview>

        <AscendButton
          $canAscend={canAscend}
          onClick={handleAscendClick}
          disabled={!canAscend || isAscending}
        >
          {isAscending ? "Ascending..." : "Ascend"}
        </AscendButton>

        {canAscend && (
          <WarningText>
            ⚠ Ascending will reset your progress but grant permanent Essence
          </WarningText>
        )}

        <StatsGrid>
          <StatItem>
            <StatLabel>Current Essence</StatLabel>
            <StatValue>{formatNumber(currentEssence)} ✧</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>Total Earned</StatLabel>
            <StatValue>{formatNumber(totalEssenceEarned)} ✧</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>Ascensions</StatLabel>
            <StatValue>{ascensionCount}</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>Total Mana</StatLabel>
            <StatValue>{formatNumber(totalManaEarned)}</StatValue>
          </StatItem>
        </StatsGrid>
      </PanelContainer>

      <ConfirmModal
        isOpen={showConfirm}
        onConfirm={handleConfirmAscend}
        onCancel={() => setShowConfirm(false)}
        title="Ascend to the Stars"
        message="Are you ready to transcend? Your progress will be reset, but you'll gain powerful Essence."
        icon="🌟"
        variant="warning"
        confirmText="Ascend"
        cancelText="Not Yet"
        isLoading={isAscending}
        details={[
          {
            label: "Essence to gain",
            value: `+${formatNumber(essenceToGain)} ✧`,
            highlight: true,
          },
          {
            label: "Current Mana",
            value: formatNumber(mana),
          },
          {
            label: "Buildings to reset",
            value: totalBuildings.toString(),
          },
          {
            label: "Upgrades to reset",
            value: upgrades.length.toString(),
          },
        ]}
        warning="This will reset your Mana, Buildings, and Upgrades. Achievements and Permanent Runes will be kept."
      />
    </>
  );
};
