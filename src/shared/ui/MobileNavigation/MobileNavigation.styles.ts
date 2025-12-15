import styled from "styled-components";

export const NavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: none;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(12px);
  border-top: 1px solid rgba(139, 92, 246, 0.3);
  padding: 0.5rem;
  padding-bottom: calc(0.5rem + env(safe-area-inset-bottom));
  z-index: 100;

  @media (max-width: 1023px) {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`;

export const NavButton = styled.button<{ $active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.5rem 1rem;
  background: ${({ $active }) =>
    $active
      ? "linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(99, 102, 241, 0.3) 100%)"
      : "transparent"};
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  &:active {
    transform: scale(0.95);
  }
`;

export const NavIcon = styled.span<{ $active?: boolean; $color?: string }>`
  font-size: 1.5rem;
  filter: ${({ $active }) => ($active ? "brightness(1.2)" : "brightness(0.8)")};
  transition: filter 0.2s ease;
`;

export const NavLabel = styled.span<{ $active?: boolean; $color?: string }>`
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ $active, $color }) =>
    $active ? $color || "#c084fc" : "#64748b"};
  transition: color 0.2s ease;
`;

