import { useNavigation } from "@react-navigation/native";
import { BackButton, BackIcon, Container, Logo } from "./style";

import logoImg from "@assets/logo.png";

type Props = {
  showBackButton?: boolean;
};

export function Header({ showBackButton }: Props) {
  const navigation = useNavigation();

  function handleBackButton() {
    navigation.navigate("Groups");
  }
  return (
    <Container>
      {showBackButton &&
        <BackButton onPress={handleBackButton}>
          <BackIcon />
        </BackButton>}

      <Logo source={logoImg} />
    </Container>
  );
}
