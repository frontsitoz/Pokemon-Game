//* Este es el componente principal del juego.En su estructura tiene 2 secciones:

<!--Una sección de "Cargando" que se muestra mientras los Pokémon se están cargando (aún no activada ya que v-if está en false).-->

<template>
  <!--Contadores de victorias y derrotas-->
  <div>
    <button class="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition-all m-3">
      Victorias: {{ winCount }}
    </button>
    <button class="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition-all m-3">
      Derrotas: {{ lossCount }}
    </button>
  </div>

  <section
    v-if="isLoading || randomPokemon.id === null"
    class="flex flex-col justify-center items-center w-screen h-screen"
  >
    <h1 class="text-3xl">Espere por favor</h1>
    <h3 class="animate-pulse">Cargando Pokémons</h3>
  </section>

  <!--La sección principal del juego donde se muestran el componente PokemonPicture y las opciones (PokemonOptions).-->

  <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="m-8 text-xl font-semibold">¿Quién es ese Pokémon?</h1>

    <!-- Mensaje de Resultado del Juego -->

    <div class="h-20">
      <button
        v-if="gameStatus === GameStatus.Won || gameStatus === GameStatus.Lost"
        @click="getNextOptions(4)"
        class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 transition-all"
      >
        ¿Jugar de nuevo?
      </button>
    </div>

    <!--Pokemon Picture-->

    <PokemonPicture
      :pokemon-id="randomPokemon.id"
      :show-pokemon="gameStatus !== GameStatus.Playing"
    />

    <!--Pokemon Options-->
    <PokemonOptions
      :options="options"
      :block-selection="gameStatus !== GameStatus.Playing"
      :correct-answer="randomPokemon.id"
      @selected-option="checkAnswer"
    />
  </section>
</template>

<script setup lang="ts">
import PokemonPicture from '../../components/PokemonPicture.vue';
import PokemonOptions from '../../components/PokemonOptions.vue';
import { usePokemonGame } from './usePokemonGame';
import { GameStatus } from '../../interfaces/game-status.num';
import { computed } from 'vue';

//! Estás desestructurando el objeto retornado por usePokemonGame para obtener gameStatus, lo que te permite utilizar y reaccionar a los cambios en el estado del juego dentro de PokemonGame.vue.
const {
  randomPokemon,
  isLoading,
  gameStatus,
  pokemonOptions: options,
  winCount,
  lossCount,
  checkAnswer,
  getNextOptions,
} = usePokemonGame();

// Aquí colocas la propiedad computada
</script>

<style scoped></style>
