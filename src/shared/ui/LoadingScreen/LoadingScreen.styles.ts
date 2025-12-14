import styled from "styled-components";

export const LoadingContainer = styled.div<{ $color?: string }>`
  text-align: center;
  color: ${({ $color }) => $color || "white"};
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0f172a;
  font-size: 1.5rem;
`;
