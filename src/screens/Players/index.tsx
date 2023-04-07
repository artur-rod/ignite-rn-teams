import { Button } from "@components/Button";
import { ButtonIcon } from "@components/ButtonIcon";
import { EmptyList } from "@components/EmptyList";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { Loading } from "@components/Loading";
import { PlayerCard } from "@components/PlayerCard";
import { useNavigation, useRoute } from "@react-navigation/native";
import { removeGroup } from "@storage/group/removeGroup";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { getPlayerByGroupAndTeam } from "@storage/player/getPlayerByGroupAndTeam";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { removePlayer } from "@storage/player/removePlayer";
import { AppError } from "@utils/AppError";
import { useEffect, useRef, useState } from "react";
import { Alert, FlatList, TextInput } from "react-native";
import { Container, Form, PlayersCount, TeamsHeader } from "./styles";

type RouteParams = {
  group: string;
};

export function Players() {
  const [isLoading, setIsLoading] = useState(true)
  const [team, setTeam] = useState("Time A");
  const [newPlayerName, setNewPlayerName] = useState("");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const newPlayerNameInputRef = useRef<TextInput>(null)

  const { params } = useRoute();
  const { group } = params as RouteParams;

  const navigation = useNavigation();

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true);
      const player = await getPlayerByGroupAndTeam(group, team);
      setPlayers(player);
    } catch (err) {
      Alert.alert("Pessoas", "Não foi possível listar as pessoas desse time");
      console.log(err);
    } finally {
      setIsLoading(false);
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
      // Keyboard.dismiss();
      await fetchPlayersByTeam();
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

  async function handleRemovePlayer(playerName: string) {
    try {
      await removePlayer(playerName, group);
      await fetchPlayersByTeam();
    } catch (err) {
      Alert.alert("Remover pessoa", "Não foi possível remover essa pessoa");
      console.log(err);
    }
  }

  async function handleRemoveGroup() {
    try {
      Alert.alert("Remover turma", "Deseja remover a turma?", [
        {
          text: "Não"
        },
        {
          text: "Sim",
          style: "destructive",
          onPress: async () => {
            await removeGroup(group);
            navigation.navigate("Groups");
          }
        }
      ]);
    } catch (err) {
      Alert.alert("Remover turma", "Não foi possível remover essa turma");
      console.log(err);
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
          placeholder="Nome da pessoa"
          autoCorrect={false}
          value={newPlayerName}
          onChangeText={setNewPlayerName}
          onSubmitEditing={handleAddPLayer}
          inputRef={newPlayerNameInputRef}
          returnKeyType="done"
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

      { isLoading 
      ? <Loading /> 
      : <FlatList
        data={players}
        keyExtractor={item => item.name}
        renderItem={({ item }) =>
          <PlayerCard name={item.name} onRemove={() => handleRemovePlayer(item.name)} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[{ paddingBottom: 100 }, !players.length && { flex: 1 }]}
        ListEmptyComponent={() =>
          <EmptyList
            showIcon
            title="Nenhuma jogador encontrado"
            message="Cadastre os jogadores de cada time"
          />}
      />
        }

      <Button text="Remover turma" type="SECONDARY" onPress={handleRemoveGroup} />
    </Container>
  );
}
