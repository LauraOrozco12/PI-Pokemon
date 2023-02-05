import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPokemonByType } from "../../actions"

export default function FilterTypes() {
    let dispatch = useDispatch()
    let types = useSelector(state => state.types)

    const handleChange = (e) => {
        e.preventDefault();
        dispatch(getPokemonByType(e.target.value))
    }
    return (
        <div className="divDropdown">
            <label>Filter by Type:     </label>
            <div className="dropdown">
                <button className='dropbtn'>Select a Type</button>
                <div className="dropdown-contentType">
                    {types && types.map((t, i) =>
                        <button
                            key={i}
                            value={t.name}
                            onClick={handleChange}>
                            {t.name.charAt(0).toUpperCase() + t.name.slice(1)}
                        </button>
                    )
                    }
                </div>
            </div>
        </div>

    )
}