import styled, { keyframes } from "styled-components";

const glow = keyframes`
  0%, 100% { text-shadow: 0 0 10px rgba(186, 85, 211, 0.5); }
  50% { text-shadow: 0 0 20px rgba(186, 85, 211, 0.8), 0 0 30px rgba(138, 43, 226, 0.4); }
`;

export const DisplayContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, rgba(75, 0, 130, 0.3), rgba(138, 43, 226, 0.2));
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid rgba(186, 85, 211, 0.3);
`;

export const EssenceIcon = styled.span`
  font-size: 1.1rem;
`;

export const EssenceAmount = styled.span`
  font-family: "Orbitron", monospace;
  font-size: 1rem;
  font-weight: bold;
  color: #e0b0ff;
  animation: ${glow} 3s ease-in-out infinite;
`;

export const EssenceLabel = styled.span`
  font-size: 0.8rem;
  color: rgba(200, 180, 220, 0.7);
  margin-left: 4px;
`;

