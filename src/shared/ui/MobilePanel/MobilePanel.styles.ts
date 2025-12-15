import styled, { keyframes, css } from "styled-components";

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const Overlay = styled.div<{ $isClosing: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 90;
  display: none;
  animation: ${({ $isClosing }) =>
    $isClosing
      ? css`${fadeOut} 0.3s ease forwards`
      : css`${fadeIn} 0.3s ease forwards`};

  @media (max-width: 1023px) {
    display: block;
  }
`;

export const PanelContainer = styled.div<{ $isClosing: boolean; $color?: string }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-height: 70vh;
  background: rgba(15, 23, 42, 0.98);
  backdrop-filter: blur(12px);
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
  border-top: 2px solid ${({ $color }) => $color || "rgba(139, 92, 246, 0.4)"};
  z-index: 95;
  display: none;
  flex-direction: column;
  overflow: hidden;
  animation: ${({ $isClosing }) =>
    $isClosing
      ? css`${slideDown} 0.3s ease forwards`
      : css`${slideUp} 0.3s ease forwards`};
  padding-bottom: calc(4.5rem + env(safe-area-inset-bottom));

  @media (max-width: 1023px) {
    display: flex;
  }
`;

export const PanelHandle = styled.div`
  width: 100%;
  padding: 0.75rem;
  display: flex;
  justify-content: center;
  cursor: grab;
  touch-action: none;

  &::before {
    content: "";
    width: 40px;
    height: 4px;
    background: rgba(139, 92, 246, 0.4);
    border-radius: 2px;
  }
`;

export const PanelHeader = styled.div<{ $color?: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem 0.75rem 1rem;
  border-bottom: 1px solid rgba(139, 92, 246, 0.2);
`;

export const PanelTitle = styled.h2<{ $color?: string }>`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ $color }) => $color || "#c084fc"};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const CloseButton = styled.button`
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 0.5rem;
  color: #fca5a5;
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  touch-action: manipulation;

  &:active {
    transform: scale(0.95);
    background: rgba(239, 68, 68, 0.3);
  }
`;

export const PanelContent = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0.5rem;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(139, 92, 246, 0.3);
    border-radius: 2px;
  }
`;

