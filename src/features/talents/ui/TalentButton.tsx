import React from "react";
import { useGameStore } from "@/features/game-session";
import { OpenTalentsButton, TalentCount } from "./TalentModal.styles";

interface TalentButtonProps {
  onClick: () => void;
}

export const TalentButton: React.FC<TalentButtonProps> = ({ onClick }) => {
  const userTalents = useGameStore((s) => s.state.talents);
  const staticTalents = useGameStore((s) => s.state.staticTalents);

  const learnedCount = userTalents?.length || 0;
  const totalCount = staticTalents?.length || 0;

  return (
    <OpenTalentsButton onClick={onClick}>
      <span>🌟</span>
      Open Talent Tree
      <TalentCount>
        {learnedCount}/{totalCount}
      </TalentCount>
    </OpenTalentsButton>
  );
};

