import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

export type FilterStyleProps = {
  isActive?: boolean;
};

// prettier-ignore
export const Container = styled(TouchableOpacity)<FilterStyleProps>`
  width: 70px;
  height: 38px;
  border: 1px solid ${({theme, isActive}) => isActive ? theme.COLORS.GREEN_700 : "transparent"};
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  margin-right: 8px;
`
export const Text = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.WHITE};
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.BOLD}
  `};
  text-transform: uppercase;
`;
