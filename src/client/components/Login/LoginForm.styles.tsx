import styled from "styled-components";
import { Form } from "antd";

export const LoginWrapper = styled.form`
  width: 240px;
  min-height: 180px;
  display: flex;
  flex-direction: column;
`;

export const FormItemStyled = styled(Form.Item)`
  margin-bottom: 5px;
  input:-webkit-autofill,
  input:-webkit-autofill:focus {
    transition: background-color 600000s 0s, color 600000s 0s;
  }
  input[data-autocompleted] {
    background-color: transparent !important;
  }
`;

export const Logo = styled.img`
  width: 200px;
  margin: 30px auto;
`;

export const LanguageSwitchWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 15px;
  button {
    color: gray;
  }
`;
