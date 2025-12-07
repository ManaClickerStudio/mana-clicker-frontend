import React, { useRef, useCallback } from "react";
import { useGameStore } from "../store/gameStore";
import {
  CrystalContainer,
  BurstText,
  CrystalImage,
} from "./ManaCrystal.styles";

const ManaCrystal: React.FC = () => {
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

export default React.memo(ManaCrystal);
