import React, { useRef, useCallback } from "react";
import { useGameStore } from "@/features/game-session";
import { CrystalContainer, BurstText, CrystalImage } from "./ManaCrystal.styles";

export const ManaCrystal: React.FC = () => {
  const clickMana = useGameStore((state) => state.clickMana);
  const mpc = useGameStore((state) => state.state.currentMPC);

  const burstRef = useRef<HTMLSpanElement>(null);

  const handleManaClick = useCallback(() => {
    clickMana();

    if (burstRef.current) {
      burstRef.current.classList.remove("active");
      void burstRef.current.offsetWidth;
      burstRef.current.classList.add("active");
    }
  }, [clickMana]);

  return (
    <CrystalContainer onClick={handleManaClick}>
      <CrystalImage />
      <BurstText ref={burstRef}>+{Math.ceil(mpc)}</BurstText>
    </CrystalContainer>
  );
};

