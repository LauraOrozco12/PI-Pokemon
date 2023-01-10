const { Pokemon, Type } = require('../db.js');
const fetch = require('node-fetch')
const url = 'https://pokeapi.co/api/v2/'
const limit = 40

const getPokemonsApi = async () => {
    try {
        let urlpokemon = url + 'pokemon'
        let pokemonList = []
        while(pokemonList.length < limit){
            const response = await fetch(urlpokemon)
                            .then(response => response.json())
            let totalLength = await response.results.length + pokemonList.length
            if (totalLength < limit) {
                pokemonList.push(...response.results)
                urlpokemon = response.next
            } else {
                let count = 0
                while(pokemonList.length < limit) {
                    pokemonList.push(response.results[count])
                    count++
                }
            }
        }
        const pokemons = await Promise.all(pokemonList.map(async (p) => {
            let pokemon = await fetch(p.url)
            .then(response => response.json())
            return {
                id: pokemon.id,
                name: pokemon.name,
                hp: pokemon.stats[0].base_stat,
                attack: pokemon.stats[1].base_stat,
                defense: pokemon.stats[2].base_stat,
                speed: pokemon.stats[5].base_stat,
                height: pokemon.height,
                weight: pokemon.weight,
                img: pokemon.sprites.other.dream_world.front_default,
                type: pokemon.types.map(t => t.type.name),
                origin: 'api'
            }
        }))
        return pokemons
    } catch (error) {
        console.log('getPokemonsApi' + error)
    }
}

const getPokemonsDB = async () => {
    try {
        let pokemons = await Pokemon.findAll({
            include: {
                model: Type,
                attributes: ['name'],
                through: { attributes: []}
                }
            }
        )
        return pokemons
    } catch (error) {
        console.log('getPokemonsDB' + error)
    }
}

const getAllPokemon = async () => {
    try {
        let pokemonAPI = await getPokemonsApi()
        let pokemonDB = await getPokemonsDB()
        let allPokemon = pokemonAPI.concat(pokemonDB)
        return allPokemon
    } catch (error) {
        console.log('getAllPokemon' + error)
    }
}

const getPokemonByName = async (name) => {
    let pokemons = await getAllPokemon()
    let findPokemon = await pokemons.find( p => p.name.toLowerCase() === name.toLowerCase())
    return findPokemon
}

const getPokemonById = async (id) => {
    let pokemons
    let findPokemon
    console.log(id)
    if(isNaN(id)) {
        pokemons = await getPokemonsDB()
        findPokemon = await pokemons.find( p => p.id === id)
        console.log('entro 1')
    } else {
        pokemons = await getPokemonsApi()
        findPokemon = await pokemons.find( p => p.id === parseInt(id))
        console.log('entro 2')
    }
    return findPokemon
}

module.exports = {
    getPokemonsApi,
    getPokemonsDB,
    getAllPokemon,
    getPokemonByName,
    getPokemonById
}