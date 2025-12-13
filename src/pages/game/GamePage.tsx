import React, { useEffect, useCallback, useRef } from "react";
import { useAuth, UserButton } from "@clerk/clerk-react";
import { useGameStore, useGameLoop } from "@/features/game-session";
import { ManaCrystal } from "@/features/mana-click";
import { BuildingList } from "@/features/building-purchase";
import { UpgradeList } from "@/features/upgrade-purchase";
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
  CenterSection,
  ManaDisplay,
  ManaValue,
  ManaLabel,
  CrystalWrapper,
  QuickStats,
  QuickStat,
} from "./GamePage.styles";

export const GamePage: React.FC = () => {
  const { getToken, signOut, isSignedIn } = useAuth();

  const loadGame = useGameStore((s) => s.loadGame);
  const isGameLoading = useGameStore((s) => s.isGameLoading);
  const error = useGameStore((s) => s.error);
  const saveGame = useGameStore((s) => s.saveGame);
  const mana = useGameStore((s) => s.state.mana);
  const currentMPS = useGameStore((s) => s.state.currentMPS);
  const currentMPC = useGameStore((s) => s.state.currentMPC);
  const totalManaEarned = useGameStore((s) => s.state.totalManaEarned);

  const hasLoadedRef = useRef(false);
  const getTokenRef = useRef(getToken);
  getTokenRef.current = getToken;

  useGameLoop(!!isSignedIn && !isGameLoading);

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
    if (isSignedIn && !isGameLoading && !error) {
      const saveInterval = setInterval(async () => {
        const token = await getTokenRef.current();
        if (token) {
          saveGame(token);
        }
      }, 10000);

      return () => clearInterval(saveInterval);
    }
  }, [isSignedIn, isGameLoading, error, saveGame]);

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
          </StatsBar>

          <ProfileSection>
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
          <BuildingList />

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
          </CenterSection>

          <UpgradeList />
        </MainLayout>
      </ContentWrapper>
    </GameContainer>
  );
};
