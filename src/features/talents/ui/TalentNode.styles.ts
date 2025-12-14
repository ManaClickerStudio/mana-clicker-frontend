import styled, { css } from "styled-components";

export const NodeContainer = styled.div<{
  $owned: boolean;
  $canAfford: boolean;
  $available: boolean;
  $color: string;
}>`
  background: ${({ $owned, $available }) =>
    $owned
      ? "linear-gradient(135deg, rgba(75, 0, 130, 0.5), rgba(138, 43, 226, 0.4))"
      : $available
      ? "rgba(30, 20, 45, 0.9)"
      : "rgba(25, 15, 35, 0.6)"};
  border: 2px solid ${({ $owned, $canAfford, $available, $color }) =>
    $owned
      ? `${$color}99`
      : $available && $canAfford
      ? `${$color}66`
      : "rgba(80, 60, 100, 0.4)"};
  border-radius: 12px;
  padding: 16px;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  cursor: ${({ $owned, $available, $canAfford }) =>
    $owned ? "default" : $available && $canAfford ? "pointer" : "not-allowed"};
  transition: all 0.2s ease;
  opacity: ${({ $available, $owned }) => ($available || $owned ? 1 : 0.5)};
  color: ${({ $color }) => $color};

  ${({ $owned, $color }) =>
    $owned &&
    css`
      box-shadow: 0 0 15px ${$color}66, inset 0 0 20px ${$color}11;
    `}

  ${({ $owned, $available, $canAfford }) =>
    !$owned &&
    $available &&
    $canAfford &&
    css`
      &:hover {
        transform: scale(1.02);
        border-color: currentColor;
        box-shadow: 0 0 20px currentColor;
      }
    `}
`;

export const NodeHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

export const NodeIcon = styled.div`
  font-size: 1.2rem;
`;

export const NodeName = styled.div`
  font-family: "Cinzel", serif;
  font-size: 1rem;
  color: #e0d0f0;
  font-weight: 600;
`;

export const NodeDescription = styled.div`
  font-size: 0.85rem;
  color: rgba(200, 180, 220, 0.85);
  line-height: 1.5;
  margin-bottom: 12px;
  flex: 1;
`;

export const NodeFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NodeCost = styled.div<{ $canAfford: boolean }>`
  font-family: "Orbitron", monospace;
  font-size: 0.8rem;
  color: ${({ $canAfford }) => ($canAfford ? "#e0b0ff" : "rgba(255, 100, 100, 0.8)")};
`;

export const NodeStatus = styled.div<{ $owned: boolean }>`
  font-size: 0.7rem;
  color: ${({ $owned }) => ($owned ? "rgba(144, 238, 144, 0.9)" : "rgba(200, 180, 220, 0.6)")};
`;

export const TierBadge = styled.div<{ $color: string }>`
  font-size: 0.65rem;
  color: ${({ $color }) => $color};
  background: ${({ $color }) => $color}22;
  padding: 2px 6px;
  border-radius: 8px;
`;

