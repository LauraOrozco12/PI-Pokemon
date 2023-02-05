export const GET_ALL_POKEMON = "GET_ALL_POKEMON";
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";
export const GET_POKEMON_BY_TYPE = "GET_POKEMON_BY_TYPE";
export const GET_POKEMON_BY_ALPHABET = "GET_POKEMON_BY_ALPHABET";
export const GET_POKEMON_BY_ATTACK = "GET_POKEMON_BY_ATTACK";
export const GET_POKEMON_BY_ORIGIN = "GET_POKEMON_BY_ORIGIN";
export const GET_POKEMON_DETAIL = "GET_POKEMON_DETAIL"
export const GET_TYPES = "GET_TYPES";
export const CREATE_POKEMON = "CREATE_POKEMON";

let allPokemon = [];

export function createPokemon(payload) {
    return async () => {
        try {
            var newPokemon = await fetch('http://localhost:3001/pokemons', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify(payload)
            });
            alert('The Pokemon ' + payload.name + ' was created');
            return newPokemon;
        } catch (e) {
            alert(e.message);
        }
    }
}

export function getAllPokemon() {
    return function (dispatch) {
        return fetch('http://localhost:3001/pokemons')
            .then(response => response.json())
            .then(data => {
                allPokemon = data
                dispatch({
                    type: GET_ALL_POKEMON,
                    payload: data
                })
            })
            .catch(err => alert(err))
    }
}

export function getPokemonByName(name) {
    return async function (dispatch) {
        try {
            let pokemon = await fetch('http://localhost:3001/pokemons?name=' + name)
            let data = await pokemon.json()
            let array = []
            array.push(data)
            return dispatch({
                type: GET_POKEMON_BY_NAME,
                payload: array
            })
        } catch (err) {
            alert('No pokemon found with that name')
            // window.location.href = "http://localhost:3000/home";
            return{
                type: GET_POKEMON_BY_TYPE,
                payload: allPokemon
            }
        }
    }
}

export function getPokemonByType(type) {
    if (type === 'default') return {
        type: GET_POKEMON_BY_TYPE,
        payload: allPokemon
    }
    else {
        let types = allPokemon.filter(p => {
            if (p.origin === 'database') {
                return p.types.find(t => t.name.toLowerCase() === type.toLowerCase())
            } else {
                return p.types.find(t => t.toLowerCase() === type.toLowerCase())
            }
        })
        if(types.length === 0 ) {
            alert('No pokemon found')
            return{
                type: GET_POKEMON_BY_TYPE,
                payload: allPokemon
            }
        } else return {
            type: GET_POKEMON_BY_TYPE,
            payload: types
        }
    }
}

export function getPokemonByOrigin(origin) {
    let originArr = allPokemon.filter(p => p.origin === origin)
    if (origin === 'default') return {
        type: GET_POKEMON_BY_ORIGIN,
        payload: allPokemon
    }
    else return {
        type: GET_POKEMON_BY_ORIGIN,
        payload: originArr
    }
}

export function getPokemonByAlphabet(direction) {
    let pokemons = [].concat(allPokemon)
    let ascending = pokemons.sort(function (a, b) {
        if (a.name > b.name) {
            return 1;
        }
        if (a.name < b.name) {
            return -1;
        }
        return 0;
    })
    if (direction.toLowerCase() === 'asc') return {
        type: GET_POKEMON_BY_ALPHABET,
        payload: ascending
    }
    else if (direction.toLowerCase() === 'desc') return {
        type: GET_POKEMON_BY_ALPHABET,
        payload: ascending.reverse()
    }
    else return {
        type: GET_POKEMON_BY_ALPHABET,
        payload: allPokemon
    }
}

export function getPokemonByAttack(direction) {
    let pokemons = [].concat(allPokemon)
    let ascending = pokemons.sort(function (a, b) {
        if (a.attack > b.attack) {
            return 1;
        }
        if (a.attack < b.attack) {
            return -1;
        }
        return 0;
    })
    if (direction.toLowerCase() === 'asc') return {
        type: GET_POKEMON_BY_ATTACK,
        payload: ascending
    }
    else if (direction.toLowerCase() === 'desc') return {
        type: GET_POKEMON_BY_ATTACK,
        payload: ascending.reverse()
    }
    else return {
        type: GET_POKEMON_BY_ATTACK,
        payload: allPokemon
    }
}

export function getPokemonDetail(id) {
    return function (dispatch) {
        return fetch('http://localhost:3001/pokemons/' + id)
            .then(response => response.json())
            .then(data => {
                dispatch({
                    type: GET_POKEMON_DETAIL,
                    payload: data
                })
            })
    }
}

export function getTypes() {
    return function (dispatch) {
        return fetch('http://localhost:3001/types')
            .then(response => response.json())
            .then(data => dispatch({
                type: GET_TYPES,
                payload: data
            }))
    }
}


