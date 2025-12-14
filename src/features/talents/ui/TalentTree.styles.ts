import styled from "styled-components";

export const TreeContainer = styled.div`
  background: transparent;
  padding: 0;
`;

export const TreeHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 24px;
`;

export const TreeTitle = styled.h3`
  font-family: "Cinzel", serif;
  font-size: 1.2rem;
  color: #dda0ff;
  margin: 0;
  display: none; /* Title is now in the modal header */
`;

export const ResetButton = styled.button`
  background: rgba(255, 100, 100, 0.2);
  border: 1px solid rgba(255, 100, 100, 0.4);
  border-radius: 8px;
  color: rgba(255, 150, 150, 0.9);
  padding: 8px 16px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 100, 100, 0.3);
    border-color: rgba(255, 100, 100, 0.6);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const PathsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
`;

export const PathColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const PathHeader = styled.div<{ $color: string }>`
  text-align: center;
  padding: 8px;
  background: linear-gradient(135deg, ${({ $color }) => $color}22, ${({ $color }) => $color}11);
  border: 1px solid ${({ $color }) => $color}44;
  border-radius: 8px;
  margin-bottom: 8px;
`;

export const PathName = styled.div<{ $color: string }>`
  font-family: "Cinzel", serif;
  font-size: 0.9rem;
  color: ${({ $color }) => $color};
`;

export const PathDescription = styled.div`
  font-size: 0.7rem;
  color: rgba(200, 180, 220, 0.7);
  margin-top: 4px;
`;

export const UltimateSection = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(138, 43, 226, 0.3);
`;

export const UltimateHeader = styled.div`
  text-align: center;
  margin-bottom: 12px;
`;

export const UltimateTitle = styled.div`
  font-family: "Cinzel", serif;
  font-size: 1rem;
  color: #ffd700;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
`;

export const ConnectorLine = styled.div<{ $color: string; $active: boolean }>`
  width: 2px;
  height: 20px;
  background: ${({ $active, $color }) =>
    $active ? $color : "rgba(100, 80, 120, 0.3)"};
  margin: 0 auto;
`;

