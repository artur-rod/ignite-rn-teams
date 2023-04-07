import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { PlayerStorageDTO } from "./PlayerStorageDTO";

export async function getPlayersByGroup(group: string) {
  try {
    const getGroupPlayer = await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${group}`);
    const players: PlayerStorageDTO[] = getGroupPlayer ? JSON.parse(getGroupPlayer) : [];

    return players;
  } catch (err) {
    throw err;
  }
}
