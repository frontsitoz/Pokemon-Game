
//* Aquí tienes configurada la api para interactuar con la base de datos de Pokémon
import axios from 'axios';



const pokemonApi = axios.create({
// * La baseUrl está configurada para apuntar la API de Pokémon, lo que facilita hacer peticiones GET para obtener información de los Pokémon
    baseURL: 'https://pokeapi.co/api/v2/pokemon',

}
)

export {pokemonApi};