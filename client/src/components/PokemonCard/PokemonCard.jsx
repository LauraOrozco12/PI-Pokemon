import React from 'react'
import styles from './PokemonCard.module.css'
import { NavLink } from 'react-router-dom';

export default function PokemonCard(props){
    return (
        <NavLink to={`/pokemons/${props.id}`} className={styles.linkCard}>
        <div className={styles.pokemonCard}>
            <h5 className={styles.name}>{props.name}</h5>
            <img src={props.img} alt={props.name} className={styles.imgPokemon}/>
            <div className={styles.typeCard}>
            {props.types.map((t,i) => {
                let type
                if(typeof t === 'object') type = t.name
                else type = t
                return <div className={styles.type} key={i}>
                    {/* <p className = {styles.typeText}>{type.charAt(0).toUpperCase() + type.slice(1)}</p> */}
                    <div className={`${styles[type.toLowerCase()]} ${styles.imgType}`}>
                        <img 
                        src={`http://localhost:3000/Types/${type.toLowerCase()}.svg`} 
                        alt={type} />
                    </div>
                </div>
            })}
            </div>
        </div>
        </NavLink>
    )
}