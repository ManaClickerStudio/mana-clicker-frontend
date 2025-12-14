import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { 
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.9);
  }
  to { 
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(138, 43, 226, 0.4); }
  50% { box-shadow: 0 0 40px rgba(138, 43, 226, 0.6); }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  z-index: 2000;
  animation: ${fadeIn} 0.2s ease-out;
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 440px;
  background: linear-gradient(145deg, rgba(20, 10, 35, 0.98), rgba(40, 20, 60, 0.95));
  border: 1px solid rgba(138, 43, 226, 0.5);
  border-radius: 16px;
  box-shadow: 0 0 60px rgba(138, 43, 226, 0.3);
  z-index: 2001;
  animation: ${slideIn} 0.25s ease-out;
  overflow: hidden;
`;

export const ModalHeader = styled.div<{ $variant?: "danger" | "warning" | "default" }>`
  padding: 20px 24px 16px;
  background: ${({ $variant }) =>
    $variant === "danger"
      ? "linear-gradient(135deg, rgba(220, 38, 38, 0.2), rgba(185, 28, 28, 0.1))"
      : $variant === "warning"
      ? "linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(217, 119, 6, 0.1))"
      : "linear-gradient(135deg, rgba(138, 43, 226, 0.2), rgba(75, 0, 130, 0.1))"};
  border-bottom: 1px solid rgba(138, 43, 226, 0.2);
`;

export const ModalIcon = styled.div<{ $variant?: "danger" | "warning" | "default" }>`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  margin: 0 auto 16px;
  background: ${({ $variant }) =>
    $variant === "danger"
      ? "linear-gradient(135deg, rgba(220, 38, 38, 0.3), rgba(185, 28, 28, 0.2))"
      : $variant === "warning"
      ? "linear-gradient(135deg, rgba(245, 158, 11, 0.3), rgba(217, 119, 6, 0.2))"
      : "linear-gradient(135deg, rgba(138, 43, 226, 0.3), rgba(75, 0, 130, 0.2))"};
  border: 2px solid ${({ $variant }) =>
    $variant === "danger"
      ? "rgba(239, 68, 68, 0.5)"
      : $variant === "warning"
      ? "rgba(251, 191, 36, 0.5)"
      : "rgba(167, 139, 250, 0.5)"};
  animation: ${pulse} 2s ease-in-out infinite;
`;

export const ModalTitle = styled.h3`
  font-family: "Cinzel", serif;
  font-size: 1.4rem;
  color: #e0d0f0;
  margin: 0;
  text-align: center;
  text-shadow: 0 0 20px rgba(186, 85, 211, 0.4);
`;

export const ModalBody = styled.div`
  padding: 24px;
`;

export const ModalMessage = styled.p`
  font-size: 1rem;
  color: rgba(220, 200, 240, 0.9);
  line-height: 1.6;
  margin: 0 0 16px;
  text-align: center;
`;

export const ModalDetails = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(138, 43, 226, 0.2);
  border-radius: 10px;
  padding: 16px;
  margin-top: 16px;
`;

export const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;

  &:not(:last-child) {
    border-bottom: 1px solid rgba(138, 43, 226, 0.15);
  }
`;

export const DetailLabel = styled.span`
  font-size: 0.9rem;
  color: rgba(200, 180, 220, 0.7);
`;

export const DetailValue = styled.span<{ $highlight?: boolean }>`
  font-family: "Orbitron", monospace;
  font-size: 1rem;
  font-weight: bold;
  color: ${({ $highlight }) => ($highlight ? "#a855f7" : "#e0d0f0")};
  text-shadow: ${({ $highlight }) =>
    $highlight ? "0 0 10px rgba(168, 85, 247, 0.5)" : "none"};
`;

export const WarningBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid rgba(251, 191, 36, 0.3);
  border-radius: 8px;
  padding: 12px;
  margin-top: 16px;
`;

export const WarningIcon = styled.span`
  font-size: 1.2rem;
  flex-shrink: 0;
`;

export const WarningText = styled.span`
  font-size: 0.85rem;
  color: rgba(251, 191, 36, 0.9);
  line-height: 1.5;
`;

export const ModalFooter = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px 24px 24px;
`;

export const Button = styled.button<{ $variant: "primary" | "secondary" }>`
  flex: 1;
  padding: 14px 20px;
  font-family: "Cinzel", serif;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${({ $variant }) =>
    $variant === "primary"
      ? `
        background: linear-gradient(135deg, #8b5cf6, #7c3aed);
        color: white;
        border: none;
        box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4);
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(139, 92, 246, 0.5);
        }
        
        &:active {
          transform: translateY(0);
        }
      `
      : `
        background: rgba(60, 50, 80, 0.5);
        color: rgba(200, 180, 220, 0.9);
        border: 1px solid rgba(138, 43, 226, 0.3);
        
        &:hover {
          background: rgba(70, 60, 90, 0.6);
          border-color: rgba(138, 43, 226, 0.5);
        }
      `}
`;

