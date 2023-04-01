import { TouchableOpacityProps } from "react-native";
import { Container, Icon, Text } from "./style";

type Props = TouchableOpacityProps & {
  title: string
}

export function GroupCard ({title, ...rest}: Props) {
  return (
    <Container {...rest}>
      <Icon />
      <Text>{ title }</Text>
    </Container>
  )
}