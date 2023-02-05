import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonDetail } from "../../actions"
import { NavLink } from 'react-router-dom';
import styles from './PokemonDetail.module.css'
import ReactLoading from 'react-loading'

export default function PokemonDetail(props) {
    const dispatch = useDispatch()
    const detail = useSelector((state) => state.pokemonDetail)
    const id = props.match.params.id
    useEffect(() => { dispatch(getPokemonDetail(id)) }, [dispatch, id])
    return (
        <div>
            {Object.keys(detail).length > 0 ?
                <div className={styles.wrapper}>
                    <div className={styles.columnOne}>
                        <NavLink to='/home'>
                            <button className={styles.back}>
                                <i className={styles.arrow}></i>
                                <span> </span>Go back
                            </button>
                        </NavLink>
                        <div className={styles.typeWrapper}>
                            <div className={styles.header}>
                                <img className={styles.icon} alt='' src='http://localhost:3000/Icon/type.png' />
                                <h4 className={styles.h4}>Types </h4>
                            </div>
                            <div className={styles.typeCard}>
                                {detail.types && detail.types.map((t, i) => {
                                    let type
                                    if (typeof t === 'object') type = t.name
                                    else type = t
                                    return <div className={styles.type} key={i}>
                                        <div className={`${styles[type.toLowerCase()]} ${styles.imgType}`}>
                                            <img
                                                src={`http://localhost:3000/Types/${type.toLowerCase()}.svg`}
                                                alt={type} />
                                        </div>
                                        <p>{type}</p>
                                    </div>
                                })}
                            </div>
                        </div>
                        <div className={styles.typeWrapper}>
                            <div className={styles.header}>
                                <img className={styles.icon} alt='' src='http://localhost:3000/Icon/stats.png' />
                                <h4 className={styles.h4}>Base Stats</h4>
                            </div>
                            <div className={styles.stats}>
                                <div className={styles.statsOne}>
                                    <div className={styles.p}>HP: {detail.hp}</div>
                                    <div className={styles.p}>ATK: {detail.attack}</div>
                                    <div className={styles.p}>DEF: {detail.defense}</div>
                                    <div className={styles.p}>SPD: {detail.speed}</div>
                                </div>
                                <div className={styles.statsTwo}>
                                    <progress className={styles.progress} value={detail.hp} max='256'></progress>
                                    <progress className={styles.progress} value={detail.attack} max='256'></progress>
                                    <progress className={styles.progress} value={detail.defense} max='256'></progress>
                                    <progress className={styles.progress} value={detail.speed} max='256'></progress>
                                </div>
                                {/* <h5>Height: {detail.height}</h5>
                                <h5>Weight: {detail.weight}</h5> */}
                            </div>
                        </div>
                        <div className={styles.typeWrapper}>
                            <div className={styles.header}>
                                <img className={styles.icon} alt='' src='http://localhost:3000/Icon/measures.png' />
                                <h4 className={styles.h4}>Weight & Height</h4>
                            </div>
                            <div className={styles.measures}>
                                <div className={styles.measureCard}>
                                    <img className={styles.icon} alt='' src='http://localhost:3000/Icon/height.png'/>
                                    <div className={styles.text}>Height: {detail.height}</div>
                                </div>
                                <div className={styles.measureCard}>
                                    <img className={styles.icon} alt='' src='http://localhost:3000/Icon/weight.png'/>
                                    <div className={styles.text}>Weight: {detail.weight}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.columnTwo}>
                        <img src={detail.img} alt={detail.name} />
                        <p>{detail.name}</p>
                    </div>
                </div> :
                <div className={styles.loading}>
                    <ReactLoading type={'spinningBubbles'} color={'#7b368b'}/>
                </div>
            }
        </div>
    )
}