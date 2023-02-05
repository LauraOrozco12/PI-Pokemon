import React from "react";
import styles from './LandingPage.module.css';
import { Link } from "react-router-dom";


export default function LandingPage() {
    return (
        <div className={styles.bg}>
            <div className={styles.imgPokemon}>
                <img alt='' src='http://localhost:3000/Icon/LogoPokemon.png' />
            </div>
            <div className={styles.bottom}>
                <div className={styles.divPikachu}>
                <img className={styles.pikachu} alt='' src='http://localhost:3000/Icon/ashPikachu.png' />
                </div>
                <div className={styles.divLaura}>
                <img className={styles.laura} alt='' src='http://localhost:3000/Icon/Laura.png' />
                </div>
                <div className={styles.button}>
                <Link to='/home'>
                    <button className={`${styles.btn} ${styles.parpadea}`}>Let's go!</button>
                </Link>
                </div>
            </div>
        </div>
    )
}