import React from "react"
import { useDispatch } from "react-redux"
import { getPokemonByAlphabet } from "../../actions"

export default function SortAlphabet() {
    let dispatch = useDispatch()

    const handleChange = (e) => {
        e.preventDefault();
        dispatch(getPokemonByAlphabet(e.target.value))
    }
    return (
        <div className="divDropdown">
            <label>Sort by Alphabet: </label>
            <div className="dropdown">
                <button className='dropbtn'>Select an Order</button>
                <div className="dropdown-content">
                    <button value='asc' onClick={handleChange}>Ascending (A-Z)</button>
                    <button value='desc' onClick={handleChange}>Descending (Z-A)</button>
                </div>
            </div>
        </div>
    )
}