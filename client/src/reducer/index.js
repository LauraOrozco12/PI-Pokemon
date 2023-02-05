import { 
        GET_ALL_POKEMON, 
        GET_POKEMON_BY_NAME, 
        GET_POKEMON_BY_TYPE, 
        GET_TYPES, 
        GET_POKEMON_BY_ALPHABET, 
        GET_POKEMON_BY_ATTACK, 
        GET_POKEMON_BY_ORIGIN, 
        GET_POKEMON_DETAIL, 
        CREATE_POKEMON } from "../actions"

const intialState = {
    pokemon: [],
    types: [],
    pokemonDetail: {}
}

export default function rootReducer(state=intialState, action){
    switch(action.type){
        case GET_ALL_POKEMON:
            return{
                ...state,
                pokemon: action.payload,
            } 
        case GET_POKEMON_BY_NAME:
            return{
                ...state,
                pokemon: action.payload
            }
        case GET_POKEMON_BY_TYPE:
            return{
                ...state,
                pokemon: action.payload
            }
        case GET_TYPES:
            return{
                ...state,
                types: action.payload
            }
        case GET_POKEMON_BY_ALPHABET:
            return{
                ...state,
                pokemon: action.payload
            }
        case GET_POKEMON_BY_ATTACK:
            return{
                ...state,
                pokemon: action.payload
            }
        case GET_POKEMON_BY_ORIGIN:
            return{
                ...state,
                pokemon: action.payload
            }
        case GET_POKEMON_DETAIL:
            return{
                ...state,
                pokemonDetail: action.payload
            }
        case CREATE_POKEMON:
            return {...state}
        default: return state
    }
}