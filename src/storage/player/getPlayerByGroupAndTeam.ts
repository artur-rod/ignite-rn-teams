import { getPlayersByGroup } from "./getPlayersByGroup";

export async function getPlayerByGroupAndTeam(group: string, team: string) {
  try {
    const storage = await getPlayersByGroup(group);
    return storage.filter(player => player.team === team);
  } catch (err) {
    throw err;
  }
}
