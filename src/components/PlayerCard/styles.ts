import { MaterialIcons } from "@expo/vector-icons";
import styled, { css } from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.COLORS.GRAY_500};
  width: 100%;
  height: 54px;
  border-radius: 6px;
  flex-direction: row;
  align-items: center;
  margin-top: 14px;
`;

export const Icon = styled(MaterialIcons).attrs(({ theme }) => ({
  color: theme.COLORS.GRAY_200,
  size: 24
}))`
  margin-left: 15px;
`;

export const Name = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_200};
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `};
  margin-left: 6px;
  flex: 1;
`;
