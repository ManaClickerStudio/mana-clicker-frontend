import React, { useEffect, useCallback, useRef, useState } from "react";
import { useAuth, UserButton } from "@clerk/clerk-react";
import { useGameStore, useGameLoop } from "@/features/game-session";
import { ManaCrystal } from "@/features/mana-click";
import { BuildingList } from "@/features/building-purchase";
import { UpgradeList } from "@/features/upgrade-purchase";
import { AscensionPanel, RuneShop, EssenceDisplay } from "@/features/ascension";
import {
  AutoClickerPanel,
  AutoBuyerPanel,
  useAutomation,
} from "@/features/automation";
import {
  ManaSurge,
  ActiveBoostsBar,
  useSurgeSpawner,
} from "@/features/mana-surge";
import { TalentButton, TalentModal } from "@/features/talents";
import { LoadingScreen } from "@/shared/ui";
import { formatNumber, formatMana } from "@/shared/lib";
import {
  GameContainer,
  ContentWrapper,
  Header,
  LogoSection,
  Logo,
  AutoSaveIndicator,
  StatsBar,
  StatItem,
  ProfileSection,
  LogoutButton,
  MainLayout,
  LeftPanel,
  AutomationPanels,
  CenterSection,
  ManaDisplay,
  ManaValue,
  ManaLabel,
  CrystalWrapper,
  QuickStats,
  QuickStat,
  BoostsWrapper,
  RightPanel,
  TabsHeader,
  TabButton,
  TabContent,
} from "./GamePage.styles";

type RightTab = "upgrades" | "ascension";

export const GamePage: React.FC = () => {
  const { getToken, signOut, isSignedIn } = useAuth();
  const [activeTab, setActiveTab] = useState<RightTab>("upgrades");
  const [isTalentModalOpen, setIsTalentModalOpen] = useState(false);

  const loadGame = useGameStore((s) => s.loadGame);
  const isGameLoading = useGameStore((s) => s.isGameLoading);
  const error = useGameStore((s) => s.error);
  const saveGame = useGameStore((s) => s.saveGame);
  const mana = useGameStore((s) => s.state.mana);
  const currentMPS = useGameStore((s) => s.state.currentMPS);
  const currentMPC = useGameStore((s) => s.state.currentMPC);
  const totalManaEarned = useGameStore((s) => s.state.totalManaEarned);
  const ascensionCount = useGameStore((s) => s.state.ascensionCount);

  const hasLoadedRef = useRef(false);
  const getTokenRef = useRef(getToken);
  getTokenRef.current = getToken;

  const isGameActive = !!isSignedIn && !isGameLoading && !error;

  // Game loop for passive mana generation
  useGameLoop(isGameActive);

  // Surge spawner for mana surges
  useSurgeSpawner(isGameActive);

  // Automation hooks
  useAutomation(isGameActive);

  useEffect(() => {
    const loadData = async () => {
      if (isSignedIn && !hasLoadedRef.current) {
        hasLoadedRef.current = true;
        const token = await getTokenRef.current();
        if (token) {
          loadGame(token);
        }
      }
    };
    loadData();
  }, [isSignedIn, loadGame]);

  useEffect(() => {
    if (isGameActive) {
      const saveInterval = setInterval(async () => {
        const token = await getTokenRef.current();
        if (token) {
          saveGame(token);
        }
      }, 10000); // Auto-save every 10 seconds

      return () => clearInterval(saveInterval);
    }
  }, [isGameActive, saveGame]);

  const handleLogout = useCallback(async () => {
    const token = await getTokenRef.current();
    if (token) {
      await saveGame(token);
    }
    hasLoadedRef.current = false;
    signOut();
  }, [signOut, saveGame]);

  if (!isSignedIn) {
    return <LoadingScreen message="Login to start the game!" />;
  }

  if (isGameLoading) {
    return <LoadingScreen message="Loading game data..." />;
  }

  if (error) {
    return <LoadingScreen message={`Error: ${error}`} color="red" />;
  }

  return (
    <GameContainer>
      <ContentWrapper>
        <Header>
          <LogoSection>
            <Logo>⚡ Mana Clicker</Logo>
            <AutoSaveIndicator>Auto-save every 10s</AutoSaveIndicator>
          </LogoSection>

          <StatsBar>
            <StatItem>
              <span>Total Earned</span>
              <span>{formatNumber(totalManaEarned)}</span>
            </StatItem>
            <StatItem>
              <span>Per Second</span>
              <span>{formatNumber(currentMPS)}</span>
            </StatItem>
            <StatItem>
              <span>Per Click</span>
              <span>{formatNumber(currentMPC)}</span>
            </StatItem>
            <StatItem>
              <span>Ascensions</span>
              <span>{ascensionCount}</span>
            </StatItem>
          </StatsBar>

          <ProfileSection>
            <EssenceDisplay />
            <UserButton
              appearance={{
                elements: {
                  avatarBox: {
                    width: 36,
                    height: 36,
                  },
                },
              }}
            />
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </ProfileSection>
        </Header>

        <MainLayout>
          {/* Left Panel - Buildings + Automation */}
          <LeftPanel>
            <BuildingList />
            <AutomationPanels>
              <AutoClickerPanel />
              <AutoBuyerPanel />
            </AutomationPanels>
          </LeftPanel>

          {/* Center Section - Crystal + Stats */}
          <CenterSection>
            <ManaDisplay>
              <ManaValue>{formatMana(mana)}</ManaValue>
              <ManaLabel>Mana</ManaLabel>
            </ManaDisplay>

            <CrystalWrapper>
              <ManaCrystal />
            </CrystalWrapper>

            <QuickStats>
              <QuickStat>
                <span className="label">Mana / sec</span>
                <span className="value">{formatNumber(currentMPS)}</span>
                <span className="unit">MPS</span>
              </QuickStat>
              <QuickStat>
                <span className="label">Mana / click</span>
                <span className="value">{formatNumber(currentMPC)}</span>
                <span className="unit">MPC</span>
              </QuickStat>
            </QuickStats>

            <BoostsWrapper>
              <ActiveBoostsBar />
            </BoostsWrapper>
          </CenterSection>

          {/* Right Panel - Upgrades / Ascension Tabs */}
          <RightPanel>
            <TabsHeader>
              <TabButton
                $active={activeTab === "upgrades"}
                onClick={() => setActiveTab("upgrades")}
              >
                Upgrades
              </TabButton>
              <TabButton
                $active={activeTab === "ascension"}
                onClick={() => setActiveTab("ascension")}
              >
                Ascension
              </TabButton>
            </TabsHeader>
            <TabContent>
              {activeTab === "upgrades" && <UpgradeList />}
              {activeTab === "ascension" && (
                <>
                  <AscensionPanel />
                  <TalentButton onClick={() => setIsTalentModalOpen(true)} />
                  <RuneShop />
                </>
              )}
            </TabContent>
          </RightPanel>
        </MainLayout>
      </ContentWrapper>

      {/* Mana Surge Popup */}
      <ManaSurge />

      {/* Talent Modal */}
      <TalentModal
        isOpen={isTalentModalOpen}
        onClose={() => setIsTalentModalOpen(false)}
      />
    </GameContainer>
  );
};
