import styled from "styled-components";

export const ShopContainer = styled.div`
  background: linear-gradient(145deg, rgba(20, 10, 40, 0.95), rgba(40, 20, 60, 0.9));
  border: 1px solid rgba(138, 43, 226, 0.4);
  border-radius: 12px;
  padding: 20px;
`;

export const ShopHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const ShopTitle = styled.h3`
  font-family: "Cinzel", serif;
  font-size: 1.2rem;
  color: #dda0ff;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const EssenceBalance = styled.div`
  font-family: "Orbitron", monospace;
  font-size: 1rem;
  color: #e0b0ff;
  background: rgba(138, 43, 226, 0.2);
  padding: 6px 12px;
  border-radius: 20px;
  border: 1px solid rgba(186, 85, 211, 0.3);
`;

export const RuneGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 400px;
  overflow-y: auto;
  padding-right: 4px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(138, 43, 226, 0.1);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(138, 43, 226, 0.4);
    border-radius: 3px;
  }
`;

export const RuneCard = styled.div<{ $owned: boolean; $canAfford: boolean; $locked: boolean }>`
  background: ${({ $owned, $locked }) =>
    $owned
      ? "linear-gradient(135deg, rgba(75, 0, 130, 0.4), rgba(138, 43, 226, 0.3))"
      : $locked
      ? "rgba(40, 30, 50, 0.5)"
      : "rgba(30, 20, 45, 0.8)"};
  border: 1px solid ${({ $owned, $canAfford, $locked }) =>
    $owned
      ? "rgba(144, 238, 144, 0.4)"
      : $locked
      ? "rgba(100, 80, 120, 0.3)"
      : $canAfford
      ? "rgba(186, 85, 211, 0.5)"
      : "rgba(100, 80, 120, 0.3)"};
  border-radius: 8px;
  padding: 14px;
  transition: all 0.2s ease;
  opacity: ${({ $locked }) => ($locked ? 0.6 : 1)};

  ${({ $owned, $canAfford, $locked }) =>
    !$owned && !$locked && $canAfford &&
    `
    cursor: pointer;
    &:hover {
      transform: translateX(4px);
      border-color: rgba(186, 85, 211, 0.8);
      box-shadow: 0 0 15px rgba(138, 43, 226, 0.3);
    }
  `}
`;

export const RuneHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

export const RuneName = styled.div`
  font-family: "Cinzel", serif;
  font-size: 1rem;
  color: #e0d0f0;
`;

export const RuneLevel = styled.div`
  font-size: 0.75rem;
  color: rgba(180, 160, 200, 0.8);
  background: rgba(138, 43, 226, 0.2);
  padding: 2px 8px;
  border-radius: 10px;
`;

export const RuneDescription = styled.div`
  font-size: 0.85rem;
  color: rgba(200, 180, 220, 0.8);
  margin-bottom: 10px;
  line-height: 1.4;
`;

export const RuneFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const RuneCost = styled.div<{ $canAfford: boolean }>`
  font-family: "Orbitron", monospace;
  font-size: 0.9rem;
  color: ${({ $canAfford }) => ($canAfford ? "#e0b0ff" : "rgba(255, 100, 100, 0.8)")};
`;

export const RuneStatus = styled.div<{ $owned: boolean }>`
  font-size: 0.8rem;
  color: ${({ $owned }) => ($owned ? "rgba(144, 238, 144, 0.9)" : "rgba(200, 180, 220, 0.6)")};
`;

export const LockedText = styled.div`
  font-size: 0.75rem;
  color: rgba(255, 180, 100, 0.8);
  font-style: italic;
`;

