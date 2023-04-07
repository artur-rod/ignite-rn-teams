import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/AppError";
import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { getPlayersByGroup } from "./getPlayersByGroup";

export async function playerAddByGroup(newPlayer: PlayerStorageDTO, group: string) {
  try {
    const storedPlayers = await getPlayersByGroup(group);

    const playerAlreadyExists = storedPlayers.find(player => player.name === newPlayer.name);
    if (playerAlreadyExists) {
      throw new AppError(`Essa pessoa já está cadastrada no ${playerAlreadyExists.team}`);
    }

    const storage = JSON.stringify([...storedPlayers, newPlayer]);
    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
  } catch (err) {
    throw err;
  }
}
