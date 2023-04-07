import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";
import { useState } from "react";
import { Alert } from "react-native";
import { Container, Content, Icon } from "./styles";

export function NewGroup() {
  const [group, setGroup] = useState("");

  const navigation = useNavigation();

  async function handleNewGroup() {
    try {
      if (!group.trim().length) {
        setGroup("");
        return Alert.alert("Nova turma", "Digite o nome da turma");
      }

      await groupCreate(group.trim());
      navigation.navigate("Players", { group: group.trim() });
    } catch (err) {
      if (err instanceof AppError) {
        Alert.alert("Novo turma", err.message);
      } else {
        Alert.alert("Novo turma", "Não foi possível criar uma nova turma");
        console.log(err);
      }
      setGroup("");
    }
  }

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight title="Nova turma" subtitle="crie uma turma para adicionar as pessoas" />
        <Input placeholder="Nome da turma" onChangeText={setGroup} value={group} />
        <Button text="Criar" style={{ marginTop: 20 }} onPress={handleNewGroup} />
      </Content>
    </Container>
  );
}
