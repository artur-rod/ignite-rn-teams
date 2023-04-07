import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { getPlayersByGroup } from "./getPlayersByGroup";

export async function removePlayer(playerName: string, group: string) {
  try {
    const storage = await getPlayersByGroup(group);

    const playersFilter = storage.filter(player => player.name !== playerName);
    const playersStorage = JSON.stringify(playersFilter);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, playersStorage);
  } catch (err) {
    throw err;
  }
}
