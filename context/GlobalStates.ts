import { create } from "zustand";
import { produce } from "immer";
import pokemon_data from "../data/pokemon_data";

export type PlayerState = {
  username: string, // nome do usuário
  points: number, // pontos do usuário
  team: any[], // time do usuário
  current_pokemon: any, // pokemon atual do usuário
  move: string | null, // movimento do usuário
  move_display_text: string | null, // texto de exibição do movimento
};

export type State = {
  player: PlayerState, // estado do jogador
  opponent: PlayerState, // estado do oponente
  loggedIn: boolean, // se o usuário está logado
  AllPokemons: any[], // todos os pokemons
  win: boolean | null, // se o usuário ganhou
  your_turn: boolean | null, // se é a vez do usuário
  socket: any | null // socket
  battleId: string | null // id da batalha
};

export const global: any = create<State>((set, get) => ({
  player: {
    username: "",
    points: 0,
    team: [],
    current_pokemon: null,
    move: "select-move",
    move_display_text: null,
  },
  opponent: {
    username: "",
    points: 0,
    team: [],
    current_pokemon: null,
    move: null,
    move_display_text: null,
  },
  loggedIn: false,
  AllPokemons: pokemon_data,
  win: null,
  your_turn: null,
  socket: null,
  battleId: null,

}));

export const updateStore = function (updater: (state: State) => void) {
  global.setState(produce(global.getState(), updater));
};

export const updateOpponentHeath = (health: number, move: string, effectiveness: string) => {
  // Se for o ultimo pokemon do time adversário e a vida for menor que 1
  if (health < 1 && global.getState().opponent.team.length < 2) {
    updateStore((state: State) => {
      state.opponent.team = state.opponent.team.filter(
        (curent) => curent.data.id !== state.opponent.current_pokemon.id
      );
      state.player.move_display_text = `${state.player.current_pokemon.label} used ${move}! ${effectiveness}`;
      state.opponent.current_pokemon = null;
      state.win = true;
    });
  }
  // Se a vida do pokemon for menor que 1
  else if (health < 1) {

    updateStore((state: State) => {
      state.opponent.team = state.opponent.team.filter(
        (curent) => curent.data.id !== state.opponent.current_pokemon.id
      );
      state.player.move_display_text = `${state.player.current_pokemon.label} used ${move}! ${effectiveness}`;
      state.opponent.current_pokemon = state.opponent.team[0].data;
    });
    // Se a vida do pokemon for positiva
  } else {
    updateStore((state: State) => {
      state.player.move_display_text = `${state.player.current_pokemon.label} used ${move}! ${effectiveness}`;
      state.opponent.current_pokemon.current_hp = health;
    });
  }

  // depois de um tempo limpa o texto de exibição do movimento
  // também define o final do turno
  setTimeout(() => {
    updateStore((state: State) => {
      state.player.move_display_text = null;
      state.your_turn = false;
    });
  }, 2000);
}

export const updateYourHeath = (health: number, move: string, effectiveness: string) => {
  // Se for o ultimo pokemon do seu time e a vida for menor que 1
  if (health < 1 && global.getState().player.team.length < 2) {
    updateStore((state: State) => {
      state.player.team = state.player.team.filter(
        (curent) => curent.data.id !== state.player.current_pokemon.id
      );
      state.opponent.move_display_text = `${state.opponent.current_pokemon.label} used ${move}! ${effectiveness}`;
      state.player.current_pokemon = null;
      state.win = true;
    });
  }
  // Se a vida do pokemon for menor que 1
  else if (health < 1) {
    updateStore((state: State) => {
      state.player.team = state.player.team.filter(
        (curent) => curent.data.id !== state.player.current_pokemon.id
      );
      state.opponent.move_display_text = `${state.opponent.current_pokemon.label} used ${move}! ${effectiveness}`;
      state.player.current_pokemon = state.player.team[0].data;
    });
    // Se a vida do pokemon for positiva
  } else {
    updateStore((state: State) => {
      state.player.move_display_text = `${state.opponent.current_pokemon.label} used ${move}! ${effectiveness}`;
      state.player.current_pokemon.current_hp = health;
    });

    // depois de um tempo limpa o texto de exibição do movimento
  // também define o final do turno
  setTimeout(() => {
    updateStore((state: State) => {
      state.player.move_display_text = null;
    });
  }, 2000);
  }
}