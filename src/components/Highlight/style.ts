import styled, { css } from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  margin: 36px 0;
  align-items: center;
`;
export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.XL}px;
    color: ${theme.COLORS.WHITE};
    margin-bottom: 4px;
  `};
`;

export const Subtitle = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.GRAY_300};
  `};
`;
