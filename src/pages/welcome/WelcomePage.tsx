import React from "react";
import { SignInButton } from "@clerk/clerk-react";
import {
  WelcomeContainer,
  LogoIcon,
  Title,
  Subtitle,
  SignInButtonWrapper,
  PlayButton,
  Footer,
} from "./WelcomePage.styles";

export const WelcomePage: React.FC = () => {
  return (
    <WelcomeContainer>
      <LogoIcon>⚡</LogoIcon>
      <Title>Mana Clicker</Title>
      <Subtitle>
        Collect mana, build your magical empire, and become the most powerful
        wizard!
      </Subtitle>
      <SignInButtonWrapper>
        <SignInButton mode="modal">
          <PlayButton>🎮 Sign in &amp; Play</PlayButton>
        </SignInButton>
      </SignInButtonWrapper>
      <Footer>Free idle game • Cloud saves • Play on any device</Footer>
    </WelcomeContainer>
  );
};
