import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from 'react-router-dom';
import { createPokemon } from '../../actions';
import styles from './CreatePokemon.module.css'


export default function CreatePokemon() {
    const dispatch = useDispatch()
    let types = useSelector(state => state.types)
    const [input, setInput] = useState({
        name: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        img: '',
        height: '',
        weight: '',
        types: []
    })
    const [errors, setErrors] = useState({})

    const validate = (input) => {
        let validateLetters = /^[A-Za-z]+$/;
        let validateNum = /^\d+$/;
        let validateUrl = /^(ftp|http|https):\/\/[^ "]+$/;
        let errors = {};
        if (!input.name || !validateLetters.test(input.name) || input.name.length < 2) {
            errors.name = 'Name is required. Can only be letters and requires more than two letteres';
        }
        if (!validateNum.test(input.hp) || parseInt(input.hp) < 1) {
            errors.hp = 'HP has to be a number between 1 and 256';
        }
        if (!validateNum.test(input.attack) || parseInt(input.attack) < 1) {
            errors.attack = 'Attack has to be a number between 1 and 256';
        }
        if (!validateNum.test(input.defense) || parseInt(input.defense) < 1) {
            errors.defense = 'Defense has to be a number between 1 and 256';
        }
        if (!validateNum.test(input.speed) || parseInt(input.speed) < 1) {
            errors.speed = 'Speed has to be a number between 1 and 256';
        }
        if (!validateNum.test(input.height) || parseInt(input.height) < 1) {
            errors.height = 'Height has to be a number and higher than one';
        }
        if (!validateNum.test(input.weight) || parseInt(input.weight) < 1) {
            errors.weight = 'Weight has to be a number and higher than one';
        }
        if (!validateUrl.test(input.img)) {
            errors.img = 'URL format is required';
        }
        return errors;
    }

    const handleInputChange = (e) => {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        let objError = validate({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(objError)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!errors.name && !errors.hp &&
            !errors.attack && !errors.defense &&
            !errors.speed && !errors.height &&
            !errors.weight && !errors.img) {
            dispatch(createPokemon(input))
            setInput({
                name: '',
                hp: '',
                attack: '',
                defense: '',
                speed: '',
                img: '',
                height: '',
                weight: '',
                types: []
            })
        } else {
            alert('Error. Check the form')
        }
    }

    const handleSelect = (e) => {
        e.preventDefault()
        if (input.types.length < 2) {
            setInput({
                ...input,
                types: [...input.types, e.target.value]
            })
        } else (
            alert('Maximum two types per pokemon')
        )
    }

    const handleDelete = (e) => {
        console.log(e)
        setInput({
            ...input,
            types: input.types.filter(t => t !== e)
        })
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.columnOne}>
                <NavLink to='/home'>
                    <button className={styles.back}>
                        <i className={styles.arrow}></i>
                        <span> </span>Go back
                    </button>
                </NavLink>
                <div className={styles.divProfesor}>
                    <img className={styles.profesor} alt='' src='http://localhost:3000/Background/profesor.webp' />
                </div>
            </div>
            <div className={styles.formDiv}>
                <form onSubmit={handleSubmit}>
                    <label className={styles.label}>Name:</label>
                    <input className={styles.inputText} type='text' name='name' value={input.name} onChange={handleInputChange} />
                    <p className={styles.error}>{errors.name}</p>
                    <div className={styles.formColumns}>
                        <div className={styles.formOne}>
                            <label className={styles.label}>HP:</label>
                            <input className={styles.inputText} type='text' name='hp' value={input.hp} onChange={handleInputChange} />
                            <p className={styles.error}>{errors.hp}</p>
                            <label className={styles.label}>Attack:</label>
                            <input className={styles.inputText} type='text' name='attack' value={input.attack} onChange={handleInputChange} />
                            <p className={styles.error}>{errors.attack}</p>
                            <label className={styles.label}>Defense:</label>
                            <input className={styles.inputText} type='text' name='defense' value={input.defense} onChange={handleInputChange} />
                            <p className={styles.error}>{errors.defense}</p>
                        </div>
                        <div className={styles.formTwo}>
                            <label className={styles.label}>Speed:</label>
                            <input className={styles.inputText} type='text' name='speed' value={input.speed} onChange={handleInputChange} />
                            <p className={styles.error}>{errors.speed}</p>
                            <label className={styles.label}>Height:</label>
                            <input className={styles.inputText} type='text' name='height' value={input.height} onChange={handleInputChange} />
                            <p className={styles.error}>{errors.height}</p>
                            <label className={styles.label}>Weight:</label>
                            <input className={styles.inputText} type='text' name='weight' value={input.weight} onChange={handleInputChange} />
                            <p className={styles.error}>{errors.weight}</p>
                        </div>
                    </div>
                    <label className={styles.label}>Image:</label>
                    <input className={styles.inputText} type='text' name='img' value={input.img} onChange={handleInputChange} />
                    <p className={styles.error}>{errors.img}</p>
                    <label className={styles.label}>
                        Select Type
                        <select className={styles.select} onChange={handleSelect}>
                            <option value={'default'}>Select a Type</option>
                            {types && types.map((t, i) =>
                                <option key={i} value={t.name}>{t.name.charAt(0).toUpperCase() + t.name.slice(1)}</option>
                            )
                            }
                        </select>
                    </label>
                    {
                        input?.types.map((t, i) => {
                            return <div key={i} className={styles.types}>
                                <p>{t.charAt(0).toUpperCase() + t.slice(1)}</p>
                                <button type='button' onClick={() => handleDelete(t)}>x</button>
                            </div>
                        })
                    }
                    <button className={styles.submit} type='submit'>Create Pokémon!</button>
                </form>
            </div>
        </div>
    )
}