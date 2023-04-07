import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION, PLAYER_COLLECTION } from "@storage/storageConfig";
import { getAllGroups } from "./getAllGroups";

export async function removeGroup(groupName: string) {
  try {
    const storedGroups = await getAllGroups();
    const groupsFilter = storedGroups.filter(group => group !== groupName);

    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groupsFilter));
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupName}`);
  } catch (err) {
    throw err;
  }
}
