import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useGameStore } from "@/features/game-session";
import { formatNumber } from "@/shared/lib";
import { TalentTree } from "./TalentTree";
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  EssenceInfo,
  CloseButton,
  ModalContent,
  TalentTreeWrapper,
} from "./TalentModal.styles";

interface TalentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TalentModal: React.FC<TalentModalProps> = ({ isOpen, onClose }) => {
  const currentEssence = useGameStore((s) => s.state.currentEssence);
  const userTalents = useGameStore((s) => s.state.talents);
  const staticTalents = useGameStore((s) => s.state.staticTalents);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const learnedCount = userTalents?.length || 0;
  const totalCount = staticTalents?.length || 0;

  return createPortal(
    <>
      <ModalOverlay onClick={onClose} />
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>
            <span>🌟</span>
            Stellar Talents
            <span style={{ fontSize: "0.9rem", opacity: 0.7 }}>
              ({learnedCount}/{totalCount} learned)
            </span>
          </ModalTitle>

          <EssenceInfo>
            <span>✧</span>
            {formatNumber(currentEssence)} Essence
          </EssenceInfo>

          <CloseButton onClick={onClose} title="Close (Esc)">
            ×
          </CloseButton>
        </ModalHeader>

        <ModalContent>
          <TalentTreeWrapper>
            <TalentTree />
          </TalentTreeWrapper>
        </ModalContent>
      </ModalContainer>
    </>,
    document.body
  );
};

