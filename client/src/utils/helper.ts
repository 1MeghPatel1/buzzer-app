import { Player } from "@/store/store";

const sortPlayers = (playerArr: Player[]) => {
  return playerArr.sort((playerA, playerB) => playerB.score - playerA.score);
};

export { sortPlayers };
