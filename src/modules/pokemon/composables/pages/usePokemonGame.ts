//*Este es un composable que contiene la lógica del juego.

//? RECUERDA: Los composables en Vue.js se utilizan para extraer y reutilizar lógica entre diferentes componentes.

/* ref crea una referencia reactiva que puede ser utilizada para almacenar y reaccionar a cambios de datos.*/

/*onMounted se usa para ejecutar código cuando el componente que usa este composable se monta en el DOM. */
import { computed, onMounted, ref } from "vue"

import { GameStatus, type Pokemon, type PokemonListResponse } from "../../interfaces"

import { pokemonApi } from "../../api/pokemonApi"

import confetti from 'canvas-confetti'

 export const usePokemonGame = ()=>{

//!gameStatus: Es un estado reactivo que mantiene el estado actual del juego, usando el enum GameStatus para definir si el juego está en curso (Playing), si el jugador ganó (Won), o si perdió (Lost). Inicialmente, se establece en Playing

const gameStatus = ref<GameStatus>(GameStatus.Playing)
//* pokemons es una referencia reactiva que almacena la lista completa de Pokémon obtenida de la API
const pokemons = ref<Pokemon[]>([]);
//*,([]) es un array vacío. Esto significa que al inicio, pokemons no tiene ningún Pokémon almacenado; se llenará cuando la API devuelva los datos.
const pokemonOptions = ref<Pokemon[]>([]);

//*randomPokemon es un valor computado (computed) que selecciona aleatoriamente un Pokémon de las opciones (pokemonOptions) disponibles. Utiliza un índice aleatorio para obtener un Pokémon de la lista de opciones.

  // Contadores para victorias y derrotas
  const winCount = ref(0);
  const lossCount = ref(0);

const randomPokemon = computed(() => {

    const randomIndex = Math.floor(Math.random() * pokemonOptions.value.length);
    return pokemonOptions.value[randomIndex];
}); 
// Un pokemon de pokemonOptions

//* isLoading: Se calcula como true si la lista de pokemons está vacía, lo que indica que aún se están cargando los datos.
const isLoading = computed(()=> pokemons.value.length === 0 );


//* Promise<Pokemon[]> indica que esta función devolverá una promesa que, cuando se resuelva, contendrá un array de objetos Pokemon
const getPokemons = async() :Promise<Pokemon[]> =>{
// * Aquí hacemos una petición con get a la API para obtener una lista de los primeros 151 Pokémon
const response = await pokemonApi.get<PokemonListResponse>('/?limit=151');

//*El async y await hacen que el código asíncrono sea más fácil de leer y mantener, en comparación con el uso directo de promesas con .then() y .catch().
//!map: Itera sobre cada objeto Result en results y crea un nuevo array pokemonArray con un formato diferente.
const pokemonArray = response.data.results.map( pokemon =>{
    //*split('/') convierte la URL en un array de partes dividiendo cada sección por el carácter /.

const urlParts = pokemon.url.split('/');

//*at(-2) toma el penúltimo elemento del array resultante de split. En el ejemplo anterior, el penúltimo elemento es "1", que es el id del Pokémon.
const id = urlParts.at(-2) ?? 0;//! El ?? 0 asegura que si el id no está presente o es undefined, se utilizará 0 como valor predeterminado.

    return{
name: pokemon.name,
//*+id convierte el id de cadena ("1") a un número (1).
id: +id,
    }
})
//*sort: Ordena los elementos del array de manera aleatoria.
return pokemonArray.sort(()=> Math.random() - 0.5);
}

//*Esta función se encarga de actualizar las opciones de Pokemon que se mostrará al usuario
const getNextOptions = (howMany:number = 4)=>{
gameStatus.value = GameStatus.Playing;
//* Acá voy almacenar los primeros 4 ,toma una porción del array de pokemons desde el índice 0 hasta howMany (sin incluir howMany).
pokemonOptions.value = pokemons.value.slice(0,howMany);
//* Después de tomar las primeras howMany opciones, el array original pokemons se actualiza para eliminar estas opciones.
//Y acá voy almacenar todos los que queden después de los 4 de antes
pokemons.value = pokemons.value.slice(howMany);
}



const checkAnswer = (id:number)=>{
    const hasWon = randomPokemon.value.id === id;

    if(hasWon) {
        winCount.value++;
    gameStatus.value = GameStatus.Won;
    confetti({
particleCount: 300,
spread: 150,
origin: {y:0.6},


    });
    
    }else{
        lossCount.value++; // Incrementar contador de derrotas
        gameStatus.value = GameStatus.Lost
    }

}
//
 //* Ejecutar la función `getPokemons` cuando el componente se monta
onMounted(async ()=>{

//await new Promise( r => setTimeout(r,1000));

  pokemons.value = await getPokemons();
 getNextOptions();

 console.log(pokemonOptions.value);
});


//! Retorno: El composable retorna un objeto que contiene gameStatus, permitiendo que cualquier componente que use este composable tenga acceso al estado del juego.
    return{
gameStatus,
isLoading,
pokemonOptions,
randomPokemon,
winCount,
lossCount,
//Methods
getNextOptions, 
checkAnswer,
    }

 }