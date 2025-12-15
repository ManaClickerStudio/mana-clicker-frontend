import styled, { keyframes } from "styled-components";
import background from "@/assets/background.png";

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

export const GameContainer = styled.div`
  background-image: url(${background});
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      180deg,
      rgba(15, 23, 42, 0.95) 0%,
      rgba(15, 23, 42, 0.7) 50%,
      rgba(15, 23, 42, 0.9) 100%
    );
    z-index: 0;
  }
`;

export const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  height: 100vh;
  height: 100dvh;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.5rem;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(139, 92, 246, 0.3);
  flex-shrink: 0;

  @media (max-width: 1023px) {
    padding: 0.5rem 1rem;
  }
`;

export const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 1023px) {
    gap: 0.5rem;
  }
`;

export const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #c084fc 0%, #6366f1 50%, #22d3ee 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${shimmer} 3s linear infinite;

  @media (max-width: 1023px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const AutoSaveIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #64748b;

  &::before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #22c55e;
    animation: ${pulse} 2s ease-in-out infinite;
  }

  @media (max-width: 1023px) {
    display: none;
  }
`;

export const StatsBar = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  background: rgba(30, 41, 59, 0.6);
  padding: 0.5rem 1.5rem;
  border-radius: 9999px;
  border: 1px solid rgba(139, 92, 246, 0.2);

  @media (max-width: 1023px) {
    display: none;
  }
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #94a3b8;
  }

  span:last-child {
    font-size: 1rem;
    font-weight: 700;
    color: #e2e8f0;
  }
`;

export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 1023px) {
    gap: 0.5rem;
  }
`;

export const LogoutButton = styled.button`
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.8rem;
  transition: all 0.2s ease;
  box-shadow: 0 2px 10px rgba(239, 68, 68, 0.3);
  touch-action: manipulation;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 1023px) {
    padding: 0.4rem 0.75rem;
    font-size: 0.7rem;
  }
`;

export const MainLayout = styled.main`
  flex: 1;
  display: grid;
  grid-template-columns: 380px 1fr 380px;
  gap: 1rem;
  padding: 1rem;
  min-height: 0;
  color: white;

  @media (max-width: 1023px) {
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    padding-bottom: calc(4.5rem + env(safe-area-inset-bottom));
  }
`;

export const CenterSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  @media (max-width: 1023px) {
    flex: 1;
    gap: 1rem;
    justify-content: center;
    padding: 0.5rem;
  }
`;

export const ManaDisplay = styled.div`
  text-align: center;
`;

export const ManaValue = styled.div`
  font-size: 4rem;
  font-weight: 900;
  background: linear-gradient(135deg, #c084fc 0%, #a855f7 50%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 60px rgba(168, 85, 247, 0.5);
  line-height: 1;

  @media (max-width: 1023px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const ManaLabel = styled.div`
  font-size: 1.25rem;
  color: #94a3b8;
  font-weight: 500;
  margin-top: 0.5rem;

  @media (max-width: 1023px) {
    font-size: 1rem;
    margin-top: 0.25rem;
  }
`;

export const CrystalWrapper = styled.div`
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 300px;
    background: radial-gradient(
      circle,
      rgba(139, 92, 246, 0.15) 0%,
      transparent 70%
    );
    border-radius: 50%;
    pointer-events: none;

    @media (max-width: 480px) {
      width: 240px;
      height: 240px;
    }
  }
`;

export const QuickStats = styled.div`
  display: flex;
  gap: 3rem;

  @media (max-width: 1023px) {
    gap: 1rem;
  }
`;

export const QuickStat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(30, 41, 59, 0.5);
  border-radius: 1rem;
  border: 1px solid rgba(139, 92, 246, 0.2);

  .label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #64748b;
    margin-bottom: 0.25rem;
  }

  .value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #e2e8f0;
  }

  .unit {
    font-size: 0.875rem;
    color: #94a3b8;
  }

  @media (max-width: 1023px) {
    padding: 0.75rem 1.25rem;

    .label {
      font-size: 0.65rem;
    }

    .value {
      font-size: 1.1rem;
    }

    .unit {
      font-size: 0.75rem;
    }
  }

  @media (max-width: 480px) {
    padding: 0.5rem 1rem;

    .value {
      font-size: 1rem;
    }
  }
`;

export const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 0;

  @media (max-width: 1023px) {
    display: none;
  }
`;

export const AutomationPanels = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  flex-shrink: 0;
`;

export const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 0;
  background: rgba(15, 23, 42, 0.6);
  border-radius: 1rem;
  border: 1px solid rgba(139, 92, 246, 0.2);
  overflow: hidden;

  @media (max-width: 1023px) {
    display: none;
  }
`;

export const TabsHeader = styled.div`
  display: flex;
  background: rgba(30, 41, 59, 0.8);
  border-bottom: 1px solid rgba(139, 92, 246, 0.2);
  flex-shrink: 0;
`;

export const TabButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 0.75rem 1rem;
  background: ${(props) =>
    props.$active
      ? "linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(99, 102, 241, 0.3) 100%)"
      : "transparent"};
  color: ${(props) => (props.$active ? "#e2e8f0" : "#94a3b8")};
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  border-bottom: 2px solid
    ${(props) => (props.$active ? "#8b5cf6" : "transparent")};

  &:hover {
    background: ${(props) =>
      props.$active
        ? "linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(99, 102, 241, 0.3) 100%)"
        : "rgba(139, 92, 246, 0.1)"};
    color: #e2e8f0;
  }
`;

export const TabContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(30, 41, 59, 0.5);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(139, 92, 246, 0.3);
    border-radius: 3px;
  }
`;

export const BoostsWrapper = styled.div`
  margin-top: 1rem;

  @media (max-width: 1023px) {
    margin-top: 0.5rem;
  }
`;

export const MobileStatsBar = styled.div`
  display: none;

  @media (max-width: 1023px) {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    background: rgba(30, 41, 59, 0.6);
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    border: 1px solid rgba(139, 92, 246, 0.2);
    flex-wrap: wrap;
  }
`;

export const MobileStatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 0.6rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #94a3b8;
  }

  span:last-child {
    font-size: 0.85rem;
    font-weight: 700;
    color: #e2e8f0;
  }
`;
