import React from "react"
import { useDispatch } from "react-redux"
import { getPokemonByOrigin } from "../../actions"
import './../../App.css'

export default function FilterOrigin() {
    let dispatch = useDispatch()

    const handleChange = (e) => {
        e.preventDefault();
        dispatch(getPokemonByOrigin(e.target.value))
    }
    return (
        <div className="divDropdown">
            <label>Filter by Creation: </label>
            <div className="dropdown">
                <button className='dropbtn'>Select an Origin</button>
                <div className="dropdown-content">
                    <button value='api' onClick={handleChange}>Existing</button>
                    <button value='database' onClick={handleChange}>Created</button>
                </div>
            </div>
        </div>
    )


}