import React from "react"
import { useDispatch } from "react-redux"
import { getPokemonByAttack } from "../../actions"

export default function SortAttack() {
    let dispatch = useDispatch()

    const handleChange = (e) => {
        e.preventDefault();
        dispatch(getPokemonByAttack(e.target.value))
    }
    return (
        <div className="divDropdown">
            <label>Sort by Attack:</label>
            <div className="dropdown">
                <button className='dropbtn'>Select an Order</button>
                <div className="dropdown-content">
                    <button value='asc' onClick={handleChange}>Ascending <br></br> (Min-Max)</button>
                    <button value='desc' onClick={handleChange}>Descending <br></br> (Max-Min)</button>
                </div>
            </div>
        </div>
    )
}