import React, { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalIcon,
  ModalTitle,
  ModalBody,
  ModalMessage,
  ModalDetails,
  DetailItem,
  DetailLabel,
  DetailValue,
  WarningBox,
  WarningIcon,
  WarningText,
  ModalFooter,
  Button,
} from "./ConfirmModal.styles";

export interface ConfirmModalDetail {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  message: string;
  icon?: string;
  variant?: "danger" | "warning" | "default";
  confirmText?: string;
  cancelText?: string;
  details?: ConfirmModalDetail[];
  warning?: string;
  isLoading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  title,
  message,
  icon = "✨",
  variant = "default",
  confirmText = "Confirm",
  cancelText = "Cancel",
  details,
  warning,
  isLoading = false,
}) => {
  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isLoading) {
        onCancel();
      }
    },
    [onCancel, isLoading]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return createPortal(
    <>
      <ModalOverlay onClick={!isLoading ? onCancel : undefined} />
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader $variant={variant}>
          <ModalIcon $variant={variant}>{icon}</ModalIcon>
          <ModalTitle>{title}</ModalTitle>
        </ModalHeader>

        <ModalBody>
          <ModalMessage>{message}</ModalMessage>

          {details && details.length > 0 && (
            <ModalDetails>
              {details.map((detail, index) => (
                <DetailItem key={index}>
                  <DetailLabel>{detail.label}</DetailLabel>
                  <DetailValue $highlight={detail.highlight}>
                    {detail.value}
                  </DetailValue>
                </DetailItem>
              ))}
            </ModalDetails>
          )}

          {warning && (
            <WarningBox>
              <WarningIcon>⚠️</WarningIcon>
              <WarningText>{warning}</WarningText>
            </WarningBox>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            $variant="secondary"
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            $variant="primary"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : confirmText}
          </Button>
        </ModalFooter>
      </ModalContainer>
    </>,
    document.body
  );
};

