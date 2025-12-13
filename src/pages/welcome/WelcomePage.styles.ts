import styled from "styled-components";

export const WelcomeContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%);
  color: white;
  text-align: center;
  padding: 2rem;
`;

export const LogoIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #c084fc 0%, #6366f1 50%, #22d3ee 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
`;

export const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #94a3b8;
  margin-bottom: 2rem;
  max-width: 400px;
`;

export const SignInButtonWrapper = styled.div`
  margin-bottom: 3rem;
`;

export const PlayButton = styled.button`
  padding: 1rem 2.5rem;
  font-size: 1.125rem;
  font-weight: 700;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 30px rgba(99, 102, 241, 0.5);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const Footer = styled.p`
  font-size: 0.875rem;
  color: #475569;
`;
