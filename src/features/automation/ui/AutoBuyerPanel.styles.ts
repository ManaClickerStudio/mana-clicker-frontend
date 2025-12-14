import styled from "styled-components";

export const PanelContainer = styled.div<{ $unlocked: boolean }>`
  background: linear-gradient(145deg, rgba(30, 20, 40, 0.95), rgba(50, 30, 60, 0.9));
  border: 1px solid ${({ $unlocked }) =>
    $unlocked ? "rgba(180, 130, 200, 0.4)" : "rgba(100, 100, 100, 0.3)"};
  border-radius: 12px;
  padding: 16px;
  opacity: ${({ $unlocked }) => ($unlocked ? 1 : 0.6)};
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const PanelTitle = styled.div`
  font-family: "Cinzel", serif;
  font-size: 1rem;
  color: #dda0dd;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
`;

export const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background: linear-gradient(135deg, #9c27b0, #ba68c8);
  }

  &:checked + span:before {
    transform: translateX(24px);
  }
`;

export const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(60, 60, 60, 0.8);
  transition: 0.3s;
  border-radius: 24px;

  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background: white;
    transition: 0.3s;
    border-radius: 50%;
  }
`;

export const ConfigSection = styled.div`
  margin-top: 12px;
`;

export const ConfigRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-top: 1px solid rgba(180, 130, 200, 0.2);
`;

export const ConfigLabel = styled.span`
  font-size: 0.85rem;
  color: rgba(220, 200, 230, 0.8);
`;

export const ModeSelector = styled.select`
  background: rgba(40, 30, 50, 0.9);
  border: 1px solid rgba(180, 130, 200, 0.4);
  border-radius: 6px;
  color: #dda0dd;
  padding: 6px 10px;
  font-size: 0.8rem;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: rgba(180, 130, 200, 0.8);
  }

  option {
    background: #2a1a3a;
  }
`;

export const PercentSlider = styled.input`
  width: 100px;
  height: 6px;
  background: rgba(180, 130, 200, 0.3);
  border-radius: 3px;
  appearance: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    background: #dda0dd;
    border-radius: 50%;
    cursor: pointer;
  }
`;

export const PercentValue = styled.span`
  font-family: "Orbitron", monospace;
  font-size: 0.85rem;
  color: #dda0dd;
  min-width: 40px;
  text-align: right;
`;

export const LockedOverlay = styled.div`
  text-align: center;
  padding: 16px;
`;

export const LockedText = styled.div`
  font-size: 0.85rem;
  color: rgba(255, 200, 100, 0.8);
  margin-bottom: 8px;
`;

export const UnlockHint = styled.div`
  font-size: 0.75rem;
  color: rgba(200, 180, 160, 0.6);
  font-style: italic;
`;

