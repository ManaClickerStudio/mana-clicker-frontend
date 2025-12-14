import styled, { keyframes } from "styled-components";
import crystalImage from "@/assets/crystal-mana.png";

const manaBurst = keyframes`
  0% { 
    transform: translate(-50%, -50%) translateY(0) scale(1); 
    opacity: 1; 
  }
  100% { 
    transform: translate(-50%, -50%) translateY(-60px) scale(1.5); 
    opacity: 0; 
  }
`;

const float = keyframes`
  0%, 100% { 
    transform: translateY(0); 
  }
  50% { 
    transform: translateY(-10px); 
  }
`;

const glow = keyframes`
  0%, 100% {
    filter: drop-shadow(0 0 15px rgba(139, 92, 246, 0.6)) drop-shadow(0 0 30px rgba(139, 92, 246, 0.3));
  }
  50% {
    filter: drop-shadow(0 0 25px rgba(168, 85, 247, 0.8)) drop-shadow(0 0 50px rgba(168, 85, 247, 0.4));
  }
`;

export const CrystalContainer = styled.div`
  width: 220px;
  height: 220px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: transform 100ms ease-out;
  animation: ${float} 4s ease-in-out infinite;

  &:hover {
    transform: scale(1.08);
    animation-play-state: paused;
  }
  
  &:active {
    transform: scale(0.92);
  }
  
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 280px;
    height: 280px;
    background: radial-gradient(
      circle,
      rgba(139, 92, 246, 0.2) 0%,
      rgba(139, 92, 246, 0.05) 40%,
      transparent 70%
    );
    border-radius: 50%;
    pointer-events: none;
  }
`;

export const CrystalImage = styled.img.attrs({
  src: crystalImage,
  alt: "Mana Crystal",
})`
  width: 100%;
  height: 100%;
  object-fit: contain;
  animation: ${glow} 2s ease-in-out infinite;
  user-select: none;
  -webkit-user-drag: none;
`;

export const BurstText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #a5f3fc;
  font-weight: 900;
  font-size: 1.5rem;
  opacity: 0;
  pointer-events: none;
  text-shadow: 
    0 0 10px rgba(165, 243, 252, 0.8),
    0 0 20px rgba(165, 243, 252, 0.5);

  &.active {
    animation: ${manaBurst} 0.6s ease-out forwards;
  }
`;

