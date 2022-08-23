import React from "react";
import styled from "styled-components";

import { Colors } from "../../themeVariables";
import Link from "next/link";

const MenuLinkItem = styled(Link)`
  width: 100%;
  display: flex;
  align-items: center;
  color: inherit;
  text-decoration: none;
  padding: 12px 24px;
  margin: 2px 0;
  font-weight: 600;
  border-right: solid transparent 5px;
  transition: all 0.2s;
  color: ${Colors.DARK_GRAY3};
  &.active {
    background: ${Colors.LIGHT_GRAY4};
    border-color: ${Colors.BLUE4};
  }
  &:hover {
    background: ${Colors.LIGHT_GRAY4};
    color: inherit;
    text-decoration: none;
  }
  .anticon {
    margin-right: 10px;
  }
`;

interface Props {
  icon: React.ReactNode;
  name: string;
  to: string;
}

export const LinkItem: React.FC<Props> = ({ icon, name, to }) => {
  return (
    <MenuLinkItem href={to} data-test-id={`menu-link-item-${to}`}>
      {icon}
      {name}
    </MenuLinkItem>
  );
};
