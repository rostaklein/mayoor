import styled from "styled-components";

import { Colors } from "../../themeVariables";

export const BodyWrapper = styled.main`
  display: flex;
  height: 100%;
  min-width: 1024px;
`;

export const Aside = styled.aside`
  flex: 1 0 0;
  max-width: 230px;
  background-color: ${Colors.LIGHT_GRAY5};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 1;
`;

export const Logo = styled.img`
  width: 100%;
  height: 50px;
`;

export const LogoWrapper = styled.div`
  width: 100%;
  text-align: center;
  padding: 15px 0;
`;

export const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  overflow: auto;
`;

export const StyledNavbar = styled.header`
  padding: 5px 15px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: ${Colors.LIGHT_GRAY4};
  box-shadow: none;
  > button {
    color: black;
    :not(:last-of-type) {
      margin-right: 10px;
    }
  }
`;

export const PageTitle = styled.h1`
  font-size: 18px;
  color: ${Colors.DARK_GRAY3};
  margin: 0;
  padding: 15px 35px;
`;
