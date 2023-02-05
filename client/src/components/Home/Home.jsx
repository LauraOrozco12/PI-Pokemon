import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import styles from './Home.module.css'
import PokemonCard from './../PokemonCard/PokemonCard.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllPokemon } from '../../actions';
import FilterTypes from '../Filters/FilterTypes';
import SortAlphabet from '../Sorts/SortAlphabet';
import SortAttack from '../Sorts/SortAttack';
import FilterOrigin from '../Filters/FilterOrigin';
import Pagination from '../Pagination/Pagination';
import { NavLink } from 'react-router-dom';
import ReactLoading from 'react-loading'

export default function Home() {
    let dispatch = useDispatch()
    let pokemons = useSelector((state) => state.pokemon)
    useEffect(() => {
        dispatch(getAllPokemon())
        // eslint-disable-next-line
    }, [])
    // pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(12)
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage
    let items;
    if(pokemons.length === 1) items = pokemons
    else items = pokemons.slice(firstIndex, lastIndex)
    // toggle list
    const [toggle, setToggle] = useState({
        toggleFilter: false,
        toggleSort: false,
    })

    const handleToggle = (e) => {
        if(e.target.value==='sort'){
            setToggle({...toggle, toggleSort: !toggle.toggleSort})
        } else {
            setToggle({...toggle, toggleFilter: !toggle.toggleFilter})
        }
    }

    //Change Page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    //Clear filters
    const allPokemon = (e) => {
        e.preventDefault();
        dispatch(getAllPokemon())
    }

    return (
        <div >
            {/* <div className={styles.nav}>
                <img alt='logo' src='http://localhost:3000/PokemonLogo.webp'/>
            </div> */}
        <div className={styles.home}>
            <div className={styles.columnOne}>
                <img className={styles.pokeball} alt='' src='http://localhost:3000/Icon/pokeball.png'/>
                <p>{pokemons.length} Pokémon</p>
            <SearchBar />
            {
                toggle.toggleFilter ? 
                <div className = {styles.toggle}>
                    <div className={styles.buttonsToggle}>
                    <button className= {styles.buttonToggle} value='filter' onClick={handleToggle}>Filter Pokémons</button>
                    <button className= {styles.buttonTogglePlus} value='filter' onClick={handleToggle}>+</button>
                    </div>
                <div className = {styles.ulDiv}>
                    <FilterTypes />
                    <FilterOrigin />
                </div>
                </div>
                : <div className={styles.buttonsToggle}>
                <button className= {styles.buttonToggle} value='filter' onClick={handleToggle}>Filter Pokémons</button>
                <button className= {styles.buttonTogglePlus} value='filter' onClick={handleToggle}>+</button>
                </div>
            }
            {
                toggle.toggleSort ? 
                <div className = {styles.toggle}>
                    <div className={styles.buttonsToggle}>
                    <button className= {styles.buttonToggle} value='sort' onClick={handleToggle}>Sort Pokémons</button>
                    <button className= {styles.buttonTogglePlus} value='sort' onClick={handleToggle}>+</button>
                    </div>
                <div className = {styles.ulDiv}>
                        <SortAlphabet />
                        <SortAttack />
                </div>
                </div>
                : <div className={styles.buttonsToggle}>
                <button className= {styles.buttonToggle} value='sort' onClick={handleToggle}>Sort Pokémons</button>
                <button className= {styles.buttonTogglePlus} value='sort' onClick={handleToggle}>+</button>
                </div>
            }
            <NavLink to='/create'>
            <button className={styles.btnCreate}>Create a New Pokémon</button>
            </NavLink>
            <button className={styles.btnClear} onClick={allPokemon}>Clear Filters & Sorts</button>
            </div>
            <div className={styles.columnTwo}>
            {items.length > 0 ?
                <div>
                    <div className={styles.pagination}>
                        <Pagination itemsPerPage={itemsPerPage} totalItems={pokemons.length} paginate={paginate} />
                    </div>
                    <div className={styles.pokemon}>
                        {items && items.map(p =>
                            <PokemonCard
                                id={p.id}
                                name={p.name}
                                img={p.img}
                                types={p.types}
                                key={p.id}
                            />)}
                    </div>
                </div> :
                <div>
                    <ReactLoading type={'spinningBubbles'} color={'#7b368b'}/>
                </div>
            }
            </div>
        </div>
    </div>
    )
}