import React, { useState, useCallback, useEffect } from "react";
import {
  Overlay,
  PanelContainer,
  PanelHandle,
  PanelHeader,
  PanelTitle,
  CloseButton,
  PanelContent,
} from "./MobilePanel.styles";

interface MobilePanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon?: string;
  color?: string;
  children: React.ReactNode;
}

export const MobilePanel: React.FC<MobilePanelProps> = ({
  isOpen,
  onClose,
  title,
  icon,
  color,
  children,
}) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 280);
  }, [onClose]);

  // Reset closing state when panel opens
  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);

  if (!isOpen && !isClosing) {
    return null;
  }

  return (
    <>
      <Overlay $isClosing={isClosing} onClick={handleClose} />
      <PanelContainer $isClosing={isClosing} $color={color}>
        <PanelHandle />
        <PanelHeader $color={color}>
          <PanelTitle $color={color}>
            {icon && <span>{icon}</span>}
            {title}
          </PanelTitle>
          <CloseButton onClick={handleClose}>Close</CloseButton>
        </PanelHeader>
        <PanelContent>{children}</PanelContent>
      </PanelContainer>
    </>
  );
};

