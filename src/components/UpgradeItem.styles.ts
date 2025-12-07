import styled from "styled-components";

type StatusType = "available" | "purchased" | "locked";

const getStatusColors = (status: StatusType) => {
  switch (status) {
    case "purchased":
      return {
        bg: "rgba(34, 197, 94, 0.1)",
        border: "rgba(34, 197, 94, 0.4)",
        pill: "#22c55e",
      };
    case "available":
      return {
        bg: "linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(234, 179, 8, 0.1) 100%)",
        border: "rgba(245, 158, 11, 0.4)",
        pill: "#f59e0b",
      };
    case "locked":
    default:
      return {
        bg: "rgba(30, 41, 59, 0.5)",
        border: "rgba(71, 85, 105, 0.3)",
        pill: "#475569",
      };
  }
};

export const ItemContainer = styled.div<{ $status: StatusType }>`
  display: flex;
  flex-direction: column;
  background: ${({ $status }) => getStatusColors($status).bg};
  border: 1px solid ${({ $status }) => getStatusColors($status).border};
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border-radius: 0.75rem;
  cursor: ${({ $status }) => ($status === "available" ? "pointer" : "default")};
  opacity: ${({ $status }) => ($status === "locked" ? 0.5 : 1)};
  transition: all 0.2s ease;

  &:hover {
    transform: ${({ $status }) => ($status === "available" ? "translateX(4px)" : "none")};
  }
`;

export const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 0.375rem;
`;

export const UpgradeTitle = styled.h3`
  font-size: 0.8rem;
  font-weight: 600;
  color: #e2e8f0;
  margin: 0;
  line-height: 1.3;
`;

export const StatusPill = styled.span<{ $status: StatusType }>`
  padding: 0.2rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.6rem;
  font-weight: 700;
  color: ${({ $status }) => ($status === "locked" ? "#94a3b8" : "#0f172a")};
  background-color: ${({ $status }) => getStatusColors($status).pill};
  white-space: nowrap;
  flex-shrink: 0;
`;

export const UpgradeDescription = styled.p`
  font-size: 0.7rem;
  color: #94a3b8;
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
`;

export const CostRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`;

export const CostText = styled.span<{ $canAfford: boolean }>`
  font-weight: 600;
  font-size: 0.7rem;
  color: ${({ $canAfford }) => ($canAfford ? "#fbbf24" : "#ef4444")};
`;

export const BuyButton = styled.button<{ $canAfford: boolean }>`
  padding: 0.35rem 0.75rem;
  background: ${({ $canAfford }) => 
    $canAfford 
      ? 'linear-gradient(135deg, #f59e0b 0%, #eab308 100%)'
      : 'rgba(71, 85, 105, 0.5)'
  };
  color: ${({ $canAfford }) => ($canAfford ? "#0f172a" : "#94a3b8")};
  border: none;
  border-radius: 0.375rem;
  font-weight: 700;
  font-size: 0.65rem;
  cursor: ${({ $canAfford }) => ($canAfford ? "pointer" : "not-allowed")};
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  &:hover:enabled {
    transform: scale(1.05);
  }
`;

// Legacy exports for backwards compatibility - remove these
export const ListWrapper = styled.div``;
export const Header = styled.h2``;
