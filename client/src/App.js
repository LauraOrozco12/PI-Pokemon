import './App.css';
import React, { useEffect } from 'react';
import {Route} from 'react-router-dom';
import Home from './components/Home/Home'
import LandingPage from './components/LandingPage/LandingPage';
import PokemonDetail from './components/PokemonDetail/PokemonDetail.jsx'
import { useDispatch } from 'react-redux';
import { getTypes } from "./actions/"
import CreatePokemon from './components/CreatePokemon/CreatePokemon';

function App() {
  let dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getTypes())
    // eslint-disable-next-line
  },[])
  return (
    <div className="App">
      <Route exact path ='/' component = {LandingPage}/>
      <Route path = '/home' render = {()=><Home />}/>
      <Route path ='/pokemons/:id' component = {PokemonDetail}/>
      <Route exact path ='/create' component = {CreatePokemon}/>
    </div>
  );
}

export default App;
