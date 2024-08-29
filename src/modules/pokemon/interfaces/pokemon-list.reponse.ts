//*PokemonListResponse es la interfaz que define la estructura de la respuesta que esperas recibir de la API de Pokémon.

export interface PokemonListResponse {
    count:    number;
    next:     string;
    previous: null;
    results:  Result[];
}

export interface Result {
    name: string;
    url:  string;
}
//*Cada objeto Result contiene un name (nombre del Pokémon) y una url (una URL específica de la API que apunta a los detalles de ese Pokémon).