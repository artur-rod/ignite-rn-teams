import { Button } from "@components/Button";
import { ButtonIcon } from "@components/ButtonIcon";
import { EmptyList } from "@components/EmptyList";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { PlayerCard } from "@components/PlayerCard";
import { useRoute } from "@react-navigation/native";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { getPlayerByGroupAndTeam } from "@storage/player/getPlayerByGroupAndTeam";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { AppError } from "@utils/AppError";
import { useEffect, useRef, useState } from "react";
import { Alert, FlatList, TextInput } from "react-native";
import { Container, Form, PlayersCount, TeamsHeader } from "./styles";

type RouteParams = {
  group: string;
};

export function Players() {
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");

  const { params } = useRoute();
  const { group } = params as RouteParams;

  const newPlayerNameInputRef = useRef<TextInput>(null);

  async function fetchPlayersByTeam() {
    try {
      const player = await getPlayerByGroupAndTeam(group, team);
      setPlayers(player);
    } catch (err) {
      Alert.alert("Pessoas", "Não foi possível listar as pessoas desse time");
      console.log(err);
    }
  }

  async function handleAddPLayer() {
    try {
      if (!newPlayerName.trim().length) {
        setNewPlayerName("");
        return Alert.alert("Nova pessoa", "Informe o nome da pessoa");
      }

      const newPlayer = {
        name: newPlayerName.trim(),
        team: team
      };

      await playerAddByGroup(newPlayer, group);

      setNewPlayerName("");
      newPlayerNameInputRef.current?.blur();
      fetchPlayersByTeam();
    } catch (err) {
      if (err instanceof AppError) {
        Alert.alert("Nova pessoa", err.message);
      } else {
        Alert.alert("Nova pessoa", "Não foi possível adicionar uma nova pessoa");
        console.log(err);
      }
      setNewPlayerName("");
    }
  }

  useEffect(
    () => {
      fetchPlayersByTeam();
    },
    [team]
  );

  return (
    <Container>
      <Header showBackButton />
      <Highlight title={group} subtitle="adicione a galera e separe os times" />

      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          value={newPlayerName}
          onChangeText={setNewPlayerName}
        />
        <ButtonIcon icon="add" onPress={handleAddPLayer} />
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
        keyExtractor={item => item.name}
        renderItem={({ item }) => <PlayerCard name={item.name} onRemove={() => {}} />}
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
