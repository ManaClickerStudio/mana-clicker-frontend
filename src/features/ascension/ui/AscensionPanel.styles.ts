import styled, { keyframes, css } from "styled-components";

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.05); opacity: 1; }
`;

export const PanelContainer = styled.div`
  background: linear-gradient(145deg, rgba(20, 10, 40, 0.95), rgba(40, 20, 60, 0.9));
  border: 1px solid rgba(138, 43, 226, 0.4);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

export const PanelTitle = styled.h3`
  font-family: "Cinzel", serif;
  font-size: 1.3rem;
  color: #dda0ff;
  margin: 0;
  text-shadow: 0 0 10px rgba(186, 85, 211, 0.5);
`;

export const PanelIcon = styled.span`
  font-size: 1.5rem;
`;

export const EssencePreview = styled.div`
  background: linear-gradient(135deg, rgba(75, 0, 130, 0.3), rgba(138, 43, 226, 0.2));
  border: 1px solid rgba(186, 85, 211, 0.3);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

export const EssenceLabel = styled.div`
  font-size: 0.85rem;
  color: rgba(200, 180, 220, 0.8);
  margin-bottom: 8px;
`;

export const EssenceValue = styled.div<{ $canAscend: boolean }>`
  font-family: "Orbitron", monospace;
  font-size: 2rem;
  font-weight: bold;
  color: ${({ $canAscend }) => ($canAscend ? "#e0b0ff" : "rgba(180, 160, 200, 0.5)")};
  text-shadow: ${({ $canAscend }) =>
    $canAscend ? "0 0 20px rgba(186, 85, 211, 0.8)" : "none"};
  
  ${({ $canAscend }) =>
    $canAscend &&
    css`
      background: linear-gradient(90deg, #e0b0ff, #ff80ff, #e0b0ff);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: ${shimmer} 3s linear infinite;
    `}
`;

export const RequirementText = styled.div<{ $met: boolean }>`
  font-size: 0.8rem;
  color: ${({ $met }) => ($met ? "rgba(144, 238, 144, 0.9)" : "rgba(255, 100, 100, 0.9)")};
  margin-top: 8px;
`;

export const AscendButton = styled.button<{ $canAscend: boolean }>`
  width: 100%;
  padding: 16px 24px;
  font-family: "Cinzel", serif;
  font-size: 1.1rem;
  font-weight: bold;
  letter-spacing: 2px;
  text-transform: uppercase;
  border: none;
  border-radius: 8px;
  cursor: ${({ $canAscend }) => ($canAscend ? "pointer" : "not-allowed")};
  transition: all 0.3s ease;
  
  ${({ $canAscend }) =>
    $canAscend
      ? css`
          background: linear-gradient(135deg, #8b00ff, #da70d6);
          color: white;
          box-shadow: 0 4px 20px rgba(138, 43, 226, 0.5),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2);
          animation: ${pulse} 2s ease-in-out infinite;
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 30px rgba(138, 43, 226, 0.7),
                        inset 0 1px 0 rgba(255, 255, 255, 0.3);
          }
          
          &:active {
            transform: translateY(0);
          }
        `
      : css`
          background: rgba(60, 40, 80, 0.5);
          color: rgba(180, 160, 200, 0.5);
          box-shadow: none;
        `}
`;

export const WarningText = styled.div`
  font-size: 0.75rem;
  color: rgba(255, 200, 100, 0.8);
  text-align: center;
  margin-top: 12px;
  font-style: italic;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(138, 43, 226, 0.2);
`;

export const StatItem = styled.div`
  text-align: center;
`;

export const StatLabel = styled.div`
  font-size: 0.75rem;
  color: rgba(200, 180, 220, 0.7);
  margin-bottom: 4px;
`;

export const StatValue = styled.div`
  font-family: "Orbitron", monospace;
  font-size: 1rem;
  color: #c9a0dc;
`;

