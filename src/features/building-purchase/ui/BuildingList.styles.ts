import styled from "styled-components";

export const SidePanel = styled.aside`
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(8px);
  border-radius: 1rem;
  border: 1px solid rgba(139, 92, 246, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex: 1;
  min-height: 0;
`;

export const PanelHeader = styled.div`
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(139, 92, 246, 0.2);
  background: rgba(239, 68, 68, 0.1);

  h2 {
    font-size: 0.875rem;
    font-weight: 700;
    color: #fca5a5;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

export const MultiplierRow = styled.div`
  display: flex;
  gap: 0.25rem;
`;

export const MultiplierButton = styled.button<{ $active: boolean }>`
  padding: 0.25rem 0.5rem;
  font-size: 0.65rem;
  font-weight: 600;
  border: 1px solid
    ${({ $active }) => ($active ? "#ef4444" : "rgba(239, 68, 68, 0.3)")};
  border-radius: 0.25rem;
  background: ${({ $active }) =>
    $active ? "rgba(239, 68, 68, 0.3)" : "transparent"};
  color: ${({ $active }) => ($active ? "#fca5a5" : "#94a3b8")};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: rgba(239, 68, 68, 0.2);
    border-color: rgba(239, 68, 68, 0.5);
    color: #fca5a5;
  }
`;

export const PanelContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(239, 68, 68, 0.3);
    border-radius: 2px;
  }
`;

export const EmptyState = styled.p`
  color: #64748b;
  text-align: center;
  padding: 2rem 1rem;
  font-size: 0.875rem;
`;
