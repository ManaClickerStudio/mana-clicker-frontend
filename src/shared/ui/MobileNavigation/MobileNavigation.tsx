import React from "react";
import {
  NavContainer,
  NavButton,
  NavIcon,
  NavLabel,
} from "./MobileNavigation.styles";

export type MobileTab = "buildings" | "upgrades" | "ascension" | "automation" | null;

interface MobileNavigationProps {
  activeTab: MobileTab;
  onTabChange: (tab: MobileTab) => void;
}

interface NavItem {
  id: MobileTab;
  icon: string;
  label: string;
  color: string;
}

const navItems: NavItem[] = [
  { id: "buildings", icon: "🏛️", label: "Buildings", color: "#fca5a5" },
  { id: "upgrades", icon: "⬆️", label: "Upgrades", color: "#86efac" },
  { id: "ascension", icon: "✨", label: "Ascension", color: "#c084fc" },
  { id: "automation", icon: "🤖", label: "Auto", color: "#fcd34d" },
];

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  const handleTabClick = (tabId: MobileTab) => {
    // Toggle: if clicking active tab, close it
    if (activeTab === tabId) {
      onTabChange(null);
    } else {
      onTabChange(tabId);
    }
  };

  return (
    <NavContainer>
      {navItems.map((item) => (
        <NavButton
          key={item.id}
          $active={activeTab === item.id}
          onClick={() => handleTabClick(item.id)}
          aria-label={item.label}
        >
          <NavIcon $active={activeTab === item.id}>{item.icon}</NavIcon>
          <NavLabel $active={activeTab === item.id} $color={item.color}>
            {item.label}
          </NavLabel>
        </NavButton>
      ))}
    </NavContainer>
  );
};

