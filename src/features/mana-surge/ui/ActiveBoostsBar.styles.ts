import styled, { keyframes, css } from "styled-components";

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

export const BoostsContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  padding: 8px;
  min-height: 48px;
`;

export const BoostPill = styled.div<{ $color: string; $isExpiring: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(135deg, ${({ $color }) => $color}33, ${({ $color }) => $color}1a);
  border: 1px solid ${({ $color }) => $color}66;
  border-radius: 20px;
  padding: 6px 12px;
  font-size: 0.8rem;
  color: ${({ $color }) => $color};
  
  ${({ $isExpiring }) =>
    $isExpiring &&
    css`
      animation: ${pulse} 0.5s ease-in-out infinite;
    `}
`;

export const BoostIcon = styled.span`
  font-size: 1rem;
`;

export const BoostInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BoostName = styled.span`
  font-weight: bold;
  font-size: 0.75rem;
`;

export const BoostTimer = styled.span`
  font-family: "Orbitron", monospace;
  font-size: 0.7rem;
  opacity: 0.8;
`;

export const NoBoostsText = styled.div`
  font-size: 0.8rem;
  color: rgba(200, 180, 220, 0.5);
  font-style: italic;
  padding: 8px;
`;

