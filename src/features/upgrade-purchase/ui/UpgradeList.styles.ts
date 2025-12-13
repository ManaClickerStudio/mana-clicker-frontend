import styled from "styled-components";

export const SidePanel = styled.aside`
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(8px);
  border-radius: 1rem;
  border: 1px solid rgba(139, 92, 246, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const PanelHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid rgba(139, 92, 246, 0.2);
  background: rgba(34, 197, 94, 0.1);

  h2 {
    font-size: 0.875rem;
    font-weight: 700;
    color: #86efac;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
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
    background: rgba(34, 197, 94, 0.3);
    border-radius: 2px;
  }
`;

export const EmptyState = styled.p`
  color: #64748b;
  text-align: center;
  padding: 2rem 1rem;
  font-size: 0.875rem;
`;

