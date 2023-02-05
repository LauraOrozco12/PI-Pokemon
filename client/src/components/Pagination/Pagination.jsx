import React from "react";
import styles from './Pagination.module.css'


export default function Pagination({ itemsPerPage, totalItems, paginate }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <div className={styles.fixed}>
        <div className={styles.wrapper}>
            {
                pageNumbers && pageNumbers.map(n => (
                    <button className={styles.page} onClick={() => paginate(n)} key={n}>
                            {n}
                    </button>
                ))
            }
        </div>
        </div>
    )

}