import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

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
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD};
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`;
