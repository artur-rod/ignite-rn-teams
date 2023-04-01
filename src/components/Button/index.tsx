import { TouchableOpacityProps } from "react-native";
import { ButtonTypeStyleProps, Container, Text } from "./styles";

type Props = TouchableOpacityProps & {
  type?: ButtonTypeStyleProps;
  text: string;
};

export function Button({ type = "PRIMARY", text, ...rest }: Props) {
  return (
    <Container type={type} {...rest}>
      <Text>
        {text}
      </Text>
    </Container>
  );
}
