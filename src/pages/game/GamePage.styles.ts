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
  display: flex;
  flex-direction: column;
`;

// ============ HEADER ============
export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.5rem;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(139, 92, 246, 0.3);
  flex-shrink: 0;
`;

export const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
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
`;

export const StatsBar = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  background: rgba(30, 41, 59, 0.6);
  padding: 0.5rem 1.5rem;
  border-radius: 9999px;
  border: 1px solid rgba(139, 92, 246, 0.2);
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

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

// ============ MAIN LAYOUT ============
export const MainLayout = styled.main`
  flex: 1;
  display: grid;
  grid-template-columns: 320px 1fr 320px;
  gap: 1rem;
  padding: 1rem;
  min-height: 0;
  color: white;
`;

// ============ CENTER SECTION ============
export const CenterSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
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
`;

export const ManaLabel = styled.div`
  font-size: 1.25rem;
  color: #94a3b8;
  font-weight: 500;
  margin-top: 0.5rem;
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
  }
`;

export const QuickStats = styled.div`
  display: flex;
  gap: 3rem;
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
`;
