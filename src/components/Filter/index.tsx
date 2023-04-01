import { TouchableOpacityProps } from "react-native";
import { Container, FilterStyleProps, Text } from "./styles";

type Props = TouchableOpacityProps &
  FilterStyleProps & {
    name: string;
  };

export function Filter({ name, isActive = false, ...rest }: Props) {
  return (
    <Container isActive={isActive} {...rest}>
      <Text>
        {name}
      </Text>
    </Container>
  );
}
