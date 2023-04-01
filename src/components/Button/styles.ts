import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

export type ButtonTypeStyleProps = "PRIMARY" | "SECONDARY";

type Props = {
  type: ButtonTypeStyleProps;
};

// prettier-ignore
export const Container = styled(TouchableOpacity) <Props>`
  min-height: 56px;
  min-width: 56px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  background-color: ${({ theme, type }) =>
    type === "PRIMARY" ? theme.COLORS.GREEN_700 : theme.COLORS.RED_DARK};
`;

export const Text = styled.Text`
  ${({ theme }) => css` 
    color: ${theme.COLORS.WHITE};
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `};
`;
