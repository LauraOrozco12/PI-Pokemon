const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Pokemon, Type} = require('../db.js');
const {getAllPokemon, getPokemonByName, getPokemonById } = require('./functions')

const fetch = require('node-fetch')
const url = 'https://pokeapi.co/api/v2/'

const router = Router();

let pokemonsAPI
fetch(url+'pokemon?offset=0&limit=40')
    .then(response => response.json())
    .then(data => pokemonsAPI = data.results)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.post('/pokemons', async (req, res) => {
    const { name, hp, attack, defense, speed, height, weight, img, type} = req.body
    try {
        const newPokemon = await Pokemon.create({
            name, hp, attack, defense, speed, height, weight, img
        })
        const findType = await Type.findAll({
             where: {id: type}
        })
        await newPokemon.addType(findType)
        const pokemon = await Pokemon.findOne({
            where: {name},
            include: {
                model: Type,
                attributes: ['name'],
                through: { attributes: []}
            }
        })
        res.json(pokemon)
    } catch (e) {
        console.log('error 2' + e)
        res.status(500).send(e.message)
    }
})

router.get('/pokemons', async (req, res) => {
    let {name} = req.query
    try {
        if(name) {
            let pokemon = await getPokemonByName(name)
            if(pokemon) res.json(pokemon)
            else res.status(400).send('No pokemon found with that name')
        } else {
            let data = await getAllPokemon()
            res.json(data)
        }
    } catch (e) {
        console.log('getpokemons'+e)
        res.status(500).send(e.message)
    }
})

router.get('/pokemons/:id', async (req, res) => {
    let {id} = req.params
    try {
        let pokemon = await getPokemonById(id)
        if(pokemon) res.json(pokemon)
        else res.status(400).send('No pokemon found with that id')
    } catch (e) {
        console.log('getpokemonsid'+e)
        res.status(500).send(e.message)
    }
})

router.get('/types', async (req, res) => {
    try {
        const response = await fetch(url+'type')
                               .then(response => response.json())
        const typesAPI = response.results.map( t => {
            return {
                id: t.url.split('/')[6],
                name: t.name,
                }}
            )
        await Type.bulkCreate(typesAPI);
        const allTypes = await Type.findAll()
        res.json(allTypes)
    } catch (e) {
        console.log(e)
    }
})


module.exports = router;
