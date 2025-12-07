import React, { useEffect, useCallback, useRef } from "react";
import { useAuth } from "@clerk/clerk-react";
import { UserButton } from "@clerk/clerk-react";
import { useGameStore } from "../store/gameStore";
import { useGameLoop } from "../hooks/useGameLoop";
import ManaCrystal from "../components/ManaCrystal";
import UpgradeList from "../components/UpgradeList";
import BuildingList from "../components/BuildingList";

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
} from "./GameScreen.styles";

const LoadingScreen: React.FC<{ message: string; color?: string }> = ({
  message,
  color = "white",
}) => (
  <div
    style={{
      textAlign: "center",
      color: color,
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#0f172a",
      fontSize: "1.5rem",
    }}
  >
    {message}
  </div>
);

const formatNumber = (num: number): string => {
  if (num >= 1000000) return (num / 1000000).toFixed(2) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return Math.floor(num).toString();
};

const GameScreen: React.FC = () => {
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
      }, 60000);

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
        {/* Header */}
        <Header>
          <LogoSection>
            <Logo>⚡ Mana Clicker</Logo>
            <AutoSaveIndicator>Auto-save every 1 min</AutoSaveIndicator>
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

        {/* Main Game Area */}
        <MainLayout>
          {/* Left Panel - Buildings */}
          <BuildingList />

          {/* Center - Crystal & Mana */}
          <CenterSection>
            <ManaDisplay>
              <ManaValue>{formatNumber(mana)}</ManaValue>
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

          {/* Right Panel - Upgrades */}
          <UpgradeList />
        </MainLayout>
      </ContentWrapper>
    </GameContainer>
  );
};

export default GameScreen;
