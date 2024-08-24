<template>
  <section>
    <img
      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg"
      class="brightness-0 h-[200px]"
      alt=""
    />
  </section>
</template>

<script setup lang="ts"></script>

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
