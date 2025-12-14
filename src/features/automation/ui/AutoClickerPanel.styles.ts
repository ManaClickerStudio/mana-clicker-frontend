import styled from "styled-components";

export const PanelContainer = styled.div<{ $unlocked: boolean }>`
  background: linear-gradient(145deg, rgba(20, 30, 40, 0.95), rgba(30, 50, 60, 0.9));
  border: 1px solid ${({ $unlocked }) =>
    $unlocked ? "rgba(100, 200, 150, 0.4)" : "rgba(100, 100, 100, 0.3)"};
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
  color: #90ee90;
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
    background: linear-gradient(135deg, #4caf50, #66bb6a);
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

export const StatsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-top: 1px solid rgba(100, 200, 150, 0.2);
`;

export const StatLabel = styled.span`
  font-size: 0.85rem;
  color: rgba(200, 220, 210, 0.8);
`;

export const StatValue = styled.span`
  font-family: "Orbitron", monospace;
  font-size: 0.9rem;
  color: #90ee90;
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

