import React from "react";
import { LoadingContainer } from "./LoadingScreen.styles";

interface LoadingScreenProps {
  message: string;
  color?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message,
  color = "white",
}) => <LoadingContainer $color={color}>{message}</LoadingContainer>;
