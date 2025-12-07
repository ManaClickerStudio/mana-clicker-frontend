import styled from "styled-components";

export const ItemContainer = styled.div<{ $canAfford: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: ${({ $canAfford }) => 
    $canAfford 
      ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%)'
      : 'rgba(30, 41, 59, 0.5)'
  };
  border: 1px solid ${({ $canAfford }) => ($canAfford ? "rgba(99, 102, 241, 0.4)" : "rgba(71, 85, 105, 0.3)")};
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border-radius: 0.75rem;
  cursor: ${({ $canAfford }) => ($canAfford ? "pointer" : "not-allowed")};
  opacity: ${({ $canAfford }) => ($canAfford ? 1 : 0.5)};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $canAfford }) => 
      $canAfford 
        ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(139, 92, 246, 0.2) 100%)'
        : 'rgba(30, 41, 59, 0.5)'
    };
    transform: ${({ $canAfford }) => ($canAfford ? "translateX(4px)" : "none")};
    border-color: ${({ $canAfford }) => ($canAfford ? "rgba(99, 102, 241, 0.6)" : "rgba(71, 85, 105, 0.3)")};
  }
`;

export const Icon = styled.div`
  font-size: 1.5rem;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(139, 92, 246, 0.2);
  border-radius: 0.5rem;
  flex-shrink: 0;
`;

export const Details = styled.div`
  flex: 1;
  min-width: 0;
`;

export const Title = styled.h3`
  font-size: 0.8rem;
  font-weight: 600;
  color: #e2e8f0;
  margin: 0 0 0.125rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Stats = styled.p`
  font-size: 0.7rem;
  color: #64748b;
  margin: 0;
  
  &:first-of-type {
    color: #a78bfa;
  }
`;

export const CostButton = styled.div<{ $canAfford: boolean }>`
  padding: 0.4rem 0.75rem;
  background: ${({ $canAfford }) => 
    $canAfford 
      ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
      : 'rgba(71, 85, 105, 0.5)'
  };
  color: white;
  border-radius: 0.5rem;
  font-weight: 700;
  font-size: 0.7rem;
  text-align: center;
  white-space: nowrap;
  box-shadow: ${({ $canAfford }) => 
    $canAfford 
      ? '0 2px 8px rgba(99, 102, 241, 0.3)'
      : 'none'
  };
`;
