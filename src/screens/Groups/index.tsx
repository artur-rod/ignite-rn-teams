import { Button } from "@components/Button";
import { EmptyList } from "@components/EmptyList";
import { GroupCard } from "@components/GroupCard";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { useState } from "react";
import { FlatList } from "react-native";
import { Container } from "./styles";

export function Groups() {
  const [groups, setGroups] = useState([]);

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="jogue com a sua turma" />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => <GroupCard title={item} onPress={() => {}} />}
        contentContainerStyle={[{ paddingBottom: 100 }, !groups.length && { flex: 1 }]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() =>
          <EmptyList
            showIcon
            title="Nenhuma turma encontrada"
            message="Que tal cadastrar uma turma?"
          />}
      />

      <Button text="Criar nova turma" />
    </Container>
  );
}
