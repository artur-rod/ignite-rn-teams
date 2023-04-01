import { Button } from "@components/Button";
import { ButtonIcon } from "@components/ButtonIcon";
import { EmptyList } from "@components/EmptyList";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { PlayerCard } from "@components/PlayerCard";
import { useState } from "react";
import { FlatList } from "react-native";
import { Container, Form, PlayersCount, TeamsHeader } from "./styles";

export function Players() {
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState([]);

  return (
    <Container>
      <Header showBackButton />
      <Highlight title="Nome da turma" subtitle="adicione a galera e separe os times" />

      <Form>
        <Input placeholder="Nome da pessoa" autoCorrect={false} />
        <ButtonIcon icon="add" />
      </Form>

      <TeamsHeader>
        <FlatList
          data={["Time A", "Time B"]}
          keyExtractor={item => item}
          renderItem={({ item }) =>
            <Filter name={item} isActive={item === team} onPress={() => setTeam(item)} />}
          horizontal
        />
        <PlayersCount>
          {players.length}
        </PlayersCount>
      </TeamsHeader>

      <FlatList
        data={players}
        keyExtractor={item => item}
        renderItem={({ item }) => <PlayerCard name={item} onRemove={() => {}} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[{ paddingBottom: 100 }, !players.length && { flex: 1 }]}
        ListEmptyComponent={() =>
          <EmptyList
            showIcon
            title="Nenhuma jogador encontrado"
            message="Cadastre os jogadores de cada time"
          />}
      />

      <Button text="Remover turma" type="SECONDARY" />
    </Container>
  );
}
