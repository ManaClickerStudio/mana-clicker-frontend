import React, { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useGameStore } from "@/features/game-session";
import { formatNumber } from "@/shared/lib";
import {
  ShopContainer,
  ShopHeader,
  ShopTitle,
  EssenceBalance,
  RuneGrid,
  RuneCard,
  RuneHeader,
  RuneName,
  RuneLevel,
  RuneDescription,
  RuneFooter,
  RuneCost,
  RuneStatus,
  LockedText,
} from "./RuneShop.styles";

export const RuneShop: React.FC = () => {
  const { getToken } = useAuth();
  const [purchasingId, setPurchasingId] = useState<string | null>(null);

  const currentEssence = useGameStore((s) => s.state.currentEssence);
  const permanentRunes = useGameStore((s) => s.state.permanentRunes);
  const ascensionCount = useGameStore((s) => s.state.ascensionCount);
  const staticRunes = useGameStore((s) => s.state.staticPermanentRunes);
  const buyRune = useGameStore((s) => s.buyRune);

  const getRuneLevel = (runeId: string) => {
    return permanentRunes.filter((r) => r === runeId).length;
  };

  const handleBuyRune = async (runeId: string) => {
    if (purchasingId) return;

    setPurchasingId(runeId);
    try {
      const token = await getToken();
      if (token) {
        await buyRune(runeId, token);
      }
    } catch (error) {
      console.error("Failed to buy rune:", error);
    } finally {
      setPurchasingId(null);
    }
  };

  return (
    <ShopContainer>
      <ShopHeader>
        <ShopTitle>
          <span>🔮</span>
          Permanent Runes
        </ShopTitle>
        <EssenceBalance>{formatNumber(currentEssence)} ✧</EssenceBalance>
      </ShopHeader>

      <RuneGrid>
        {staticRunes.map((rune) => {
          const currentLevel = getRuneLevel(rune.id);
          const isMaxed = currentLevel >= rune.maxLevel;
          const canAfford = currentEssence >= rune.cost;
          const meetsRequirement = !rune.requiredAscensions || ascensionCount >= rune.requiredAscensions;
          const isLocked = !meetsRequirement;
          const isPurchasing = purchasingId === rune.id;

          return (
            <RuneCard
              key={rune.id}
              $owned={isMaxed}
              $canAfford={canAfford && !isMaxed}
              $locked={isLocked}
              onClick={() => {
                if (!isMaxed && canAfford && !isLocked && !isPurchasing) {
                  handleBuyRune(rune.id);
                }
              }}
            >
              <RuneHeader>
                <RuneName>{rune.name}</RuneName>
                {rune.maxLevel > 1 && (
                  <RuneLevel>
                    Lv {currentLevel}/{rune.maxLevel}
                  </RuneLevel>
                )}
              </RuneHeader>

              <RuneDescription>{rune.description}</RuneDescription>

              <RuneFooter>
                {isLocked ? (
                  <LockedText>
                    🔒 Requires {rune.requiredAscensions} Ascensions
                  </LockedText>
                ) : isMaxed ? (
                  <RuneStatus $owned={true}>✓ Maxed</RuneStatus>
                ) : (
                  <>
                    <RuneCost $canAfford={canAfford}>
                      {isPurchasing ? "Purchasing..." : `${formatNumber(rune.cost)} ✧`}
                    </RuneCost>
                    <RuneStatus $owned={false}>
                      {canAfford ? "Click to buy" : "Not enough Essence"}
                    </RuneStatus>
                  </>
                )}
              </RuneFooter>
            </RuneCard>
          );
        })}
      </RuneGrid>
    </ShopContainer>
  );
};

