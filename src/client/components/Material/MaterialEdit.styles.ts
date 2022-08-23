import styled from "styled-components";

import { StyledFormItem } from "../FormItem/Form.styles";

export const MaterialEditWrapper = styled.div`
  ${StyledFormItem} {
    margin-bottom: 10px;
  }
  .ant-form-item-control {
    line-height: unset;
  }
`;
