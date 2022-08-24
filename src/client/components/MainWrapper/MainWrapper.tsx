import React from "react";

import { Logout } from "../Logout/Logout";
import { UserOverlay } from "../UserOverlay/UserOverlay";
import { MainMenu } from "../MainMenu/MainMenu";
import { LanguageSwitch } from "../LanguageSwitch/LanguageSwitch";

import * as S from "./MainWrapper.styles";

type Props = {
  children?: React.ReactNode;
};

export const MainWrapper: React.FC<Props> = ({ children }) => {
  return (
    <S.BodyWrapper data-test-id="main-body-wrapper">
      <S.Aside>
        <S.LogoWrapper>
          <S.Logo src={"/mayoor_logo.svg"} />
        </S.LogoWrapper>
        <MainMenu />
      </S.Aside>
      <S.Main>
        <S.StyledNavbar>
          <UserOverlay />
          <LanguageSwitch />
          <Logout />
        </S.StyledNavbar>
        <S.Content>{children}</S.Content>
      </S.Main>
    </S.BodyWrapper>
  );
};
