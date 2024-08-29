//* Es es el componente que muestra la imagen de un Pokémon en blanco y negro. La imagen proviene de
la URL de la API, y hemos aplicado estilos para evitar que la imagen sea arrastrable o
seleccionable, lo que es buena práctica para mejorar la experiencia del usuario.

<template>
  <section>
    <img v-if="!showPokemon" :src="pokemonImage" class="brightness-0 h-[200px]" alt="" />
    <img v-else :src="pokemonImage" class="fade-in h-[200px]" alt="pokemonImage" />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  pokemonId: number;
  showPokemon: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showPokemon: false,
});

const pokemonImage = computed(
  () =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.pokemonId}.svg`,
);
</script>

//*Estos estilos son para que mi imagen no se pueda arrastrar, eso es de mala práctica
<style scoped>
img {
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
}
</style>
