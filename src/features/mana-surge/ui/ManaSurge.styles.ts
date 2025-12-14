import styled, { keyframes, css } from "styled-components";

const float = keyframes`
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-10px) scale(1.05); }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 20px currentColor, 0 0 40px currentColor; }
  50% { box-shadow: 0 0 40px currentColor, 0 0 80px currentColor, 0 0 120px currentColor; }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.5); }
  to { opacity: 1; transform: scale(1); }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.5); }
`;

export const SurgeOverlay = styled.div<{ $isExpiring: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
  
  ${({ $isExpiring }) =>
    $isExpiring &&
    css`
      animation: ${fadeOut} 0.5s ease-out forwards;
    `}
`;

export const SurgeContainer = styled.div<{ $color: string }>`
  position: relative;
  cursor: pointer;
  animation: ${float} 2s ease-in-out infinite;
`;

export const SurgeOrb = styled.div<{ $color: string }>`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, white, ${({ $color }) => $color});
  color: ${({ $color }) => $color};
  animation: ${pulse} 1.5s ease-in-out infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  
  &:hover {
    transform: scale(1.1);
    transition: transform 0.2s ease;
  }
`;

export const SurgeRing = styled.div<{ $color: string }>`
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border: 3px solid ${({ $color }) => $color};
  border-radius: 50%;
  border-top-color: transparent;
  animation: ${spin} 2s linear infinite;
`;

export const SurgeInfo = styled.div`
  position: absolute;
  bottom: -80px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  width: 200px;
`;

export const SurgeName = styled.div`
  font-family: "Cinzel", serif;
  font-size: 1.2rem;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
  margin-bottom: 4px;
`;

export const SurgeDescription = styled.div`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.8);
`;

export const TimerBar = styled.div`
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  width: 140px;
  height: 8px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  overflow: hidden;
`;

export const TimerFill = styled.div<{ $progress: number; $color: string }>`
  height: 100%;
  width: ${({ $progress }) => $progress * 100}%;
  background: ${({ $color }) => $color};
  border-radius: 4px;
  transition: width 0.1s linear;
`;

export const ClickHint = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: "Orbitron", monospace;
  font-size: 0.9rem;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
  pointer-events: none;
  animation: ${pulse} 1s ease-in-out infinite;
`;

