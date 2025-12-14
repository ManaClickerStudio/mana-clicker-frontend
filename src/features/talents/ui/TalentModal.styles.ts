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

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  z-index: 1000;
  animation: ${fadeIn} 0.2s ease-out;
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 1200px;
  max-height: 90vh;
  background: linear-gradient(145deg, rgba(15, 10, 30, 0.98), rgba(30, 20, 50, 0.95));
  border: 1px solid rgba(138, 43, 226, 0.5);
  border-radius: 16px;
  box-shadow: 0 0 60px rgba(138, 43, 226, 0.3),
              0 0 100px rgba(75, 0, 130, 0.2);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  animation: ${slideIn} 0.3s ease-out;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid rgba(138, 43, 226, 0.3);
`;

export const ModalTitle = styled.h2`
  font-family: "Cinzel", serif;
  font-size: 1.5rem;
  color: #e0b0ff;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  text-shadow: 0 0 20px rgba(186, 85, 211, 0.5);
`;

export const EssenceInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "Orbitron", monospace;
  font-size: 1.1rem;
  color: #e0b0ff;
  background: rgba(138, 43, 226, 0.2);
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid rgba(186, 85, 211, 0.3);
`;

export const CloseButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(255, 100, 100, 0.4);
  background: rgba(255, 100, 100, 0.1);
  color: rgba(255, 150, 150, 0.9);
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 100, 100, 0.2);
    border-color: rgba(255, 100, 100, 0.6);
    transform: rotate(90deg);
  }
`;

export const ModalContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(138, 43, 226, 0.1);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(138, 43, 226, 0.4);
    border-radius: 4px;
  }
`;

export const TalentTreeWrapper = styled.div`
  min-height: 100%;
`;

// Button to open the modal
export const OpenTalentsButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 14px 20px;
  margin: 16px 0;
  font-family: "Cinzel", serif;
  font-size: 1rem;
  font-weight: 600;
  color: #e0b0ff;
  background: linear-gradient(135deg, rgba(75, 0, 130, 0.4), rgba(138, 43, 226, 0.3));
  border: 1px solid rgba(186, 85, 211, 0.4);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, rgba(75, 0, 130, 0.5), rgba(138, 43, 226, 0.4));
    border-color: rgba(186, 85, 211, 0.6);
    box-shadow: 0 0 20px rgba(138, 43, 226, 0.3);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const TalentCount = styled.span`
  font-family: "Orbitron", monospace;
  font-size: 0.85rem;
  background: rgba(138, 43, 226, 0.3);
  padding: 4px 10px;
  border-radius: 12px;
`;

