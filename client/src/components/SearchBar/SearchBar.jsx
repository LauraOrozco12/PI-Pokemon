import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonByName } from "../../actions";
import styles from './SearchBar.module.css'


export default function SearchBar() {
  let dispatch = useDispatch();
  const [pokemon, setPokemon] = useState("");

  const handleInputChange = (e) => {
    setPokemon(e.target.value)
  }
  
  const handleSubmit= (e)=>{
    e.preventDefault();
    dispatch(getPokemonByName(pokemon))
    setPokemon("");
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Find a Pokémon..."
        className={styles.input}
        value={pokemon}
        onChange={handleInputChange}
      />
      <button className={styles.button} type="submit" value="Search">
        <img className={styles.img} alt='search' src='http://localhost:3000/Icon/search.png'/> 
      </button>
    </form>
  );
}