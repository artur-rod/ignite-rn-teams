import styled from "styled-components/native";


export const Container = styled.View`
  background-color: ${({theme}) => theme.COLORS.GRAY_600};
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const ActivityIndicator = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.COLORS.GREEN_700,
  size: 'large'
}))``