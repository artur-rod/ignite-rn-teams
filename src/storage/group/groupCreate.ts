import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/AppError";
import { getAllGroups } from "./getAllGroups";

export async function groupCreate(newGroup: string) {
  try {
    const existentGroups = await getAllGroups();

    const groupAlreadyExists = existentGroups.includes(newGroup);
    if (groupAlreadyExists) {
      throw new AppError("Já existe um grupo cadastrado com esse nome.");
    }

    const allGroupsString = JSON.stringify([...existentGroups, newGroup]);
    await AsyncStorage.setItem(GROUP_COLLECTION, allGroupsString);
  } catch (err) {
    throw err;
  }
}
