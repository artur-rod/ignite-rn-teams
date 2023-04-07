import { Button } from "@components/Button";
import { EmptyList } from "@components/EmptyList";
import { GroupCard } from "@components/GroupCard";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getAllGroups } from "@storage/group/getAllGroups";
import { useCallback, useState } from "react";
import { Alert, FlatList } from "react-native";
import { Container } from "./styles";

export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate("NewGroup");
  }

  async function fetchGroups() {
    try {
      const data = await getAllGroups();
      setGroups(data);
    } catch (err) {
      Alert.alert("Turmas", "Não foi possível carregar as turmas");
      console.log(err);
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate("Players", { group });
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="jogue com a sua turma" />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => <GroupCard title={item} onPress={() => handleOpenGroup(item)} />}
        contentContainerStyle={[{ paddingBottom: 100 }, !groups.length && { flex: 1 }]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() =>
          <EmptyList
            showIcon
            title="Nenhuma turma encontrada"
            message="Que tal cadastrar uma turma?"
          />}
      />

      <Button text="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  );
}
