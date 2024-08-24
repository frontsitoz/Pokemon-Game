import { onMounted, ref } from "vue"
import { GameStatus } from "../../interfaces"
import { pokemonApi } from "../../api/pokemonApi"

 export const usePokemonGame = ()=>{

const gameStatus = ref<GameStatus>(GameStatus.Playing)

const getPokemons = async()=>{
// * Aquí hacemos una petición con get
const response = await pokemonApi.get('/?limit=151');

console.log(response.data)

}

//* Es cuando nuestro composable se monta y tenemos más control al respecto
onMounted(()=>{
    getPokemons();
})

    return{
gameStatus,


    }

 }