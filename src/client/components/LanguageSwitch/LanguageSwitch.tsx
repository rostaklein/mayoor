import React, { useState } from "react";
import { GlobalOutlined } from "@ant-design/icons";
import { Popover, Button } from "antd";
import { useTranslation } from "next-i18next";
import { setCookie } from "cookies-next";

export const LanguageSwitch: React.FC = () => {
  const { i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  const handleLanguageChange = (language: string) => {
    console.log({ language });
    localStorage.setItem("default-language", language);
    i18n.changeLanguage(language);
    i18n.reloadResources(language, "common");
    setCookie("language", language);
  };
  return (
    <Popover
      content={
        <Button.Group>
          {[
            { code: "en", languageName: "English" },
            { code: "cs", languageName: "Čeština" },
          ].map(({ code, languageName }) => (
            <Button
              key={code}
              onClick={() => handleLanguageChange(code)}
              disabled={i18n.language === code}
            >
              {languageName}
            </Button>
          ))}
        </Button.Group>
      }
      trigger="click"
      placement="bottom"
      visible={isVisible}
      onVisibleChange={setIsVisible}
      style={{ marginRight: 16 }}
    >
      <Button icon={<GlobalOutlined />} shape="circle" type="link" />
    </Popover>
  );
};
