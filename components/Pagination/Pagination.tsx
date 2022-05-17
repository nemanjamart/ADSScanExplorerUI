
import React, { useState } from 'react';
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'
import styles from './Pagination.module.css'

interface PaginationProps {
    page: number
    limit: number
    pageCount: number
    onPaginationChanged(page: number, perPage)
}

const Pagination = ({ page, limit, pageCount, onPaginationChanged }: PaginationProps) => {
    const pageNumberInputKeyDown = (e) => {
        // React bug with numeric input, we have to 
        // validate the input by our selves. 
        if (!/[0-9]/.test(e.key) && e.key != "Backspace") {
            e.preventDefault();
        }

        if (e.key == 'Enter') {
            onPageChanged(getEventValue(e))
        }
    }

    const onLimitChanged = (value: number) => {
        onPaginationChanged(page, value)
    }

    const onPageChanged = (value: number) => {
        onPaginationChanged(value, limit)
    }

    const getEventValue = (e) => {
        return Number(e.currentTarget.value)
    }


    return (
        <div className={styles.container}>
            <div>
                <label>
                    Per page
                    <select className={styles.flatSelect} value={limit} onChange={(e) => { onLimitChanged(getEventValue(e)) }}>
                        {Array.from(Array(10).keys()).map((val) => <option key={val} value={(val + 1) * 10}>{(val + 1) * 10}</option>)}
                    </select>
                </label>
            </div>
            <div className={styles.pageNavContainer}>
                <button className={styles.pageNavButton} onClick={() => onPageChanged(page - 1)} disabled={page <= 1}>
                    <FontAwesomeIcon icon={faChevronCircleLeft} />
                    prev
                </button>
                <label>
                    <input key={page} id={styles.pageInput} type='number' className='no-spinner' defaultValue={page} onKeyDown={pageNumberInputKeyDown} />
                    of {pageCount}
                </label>
                <button className={styles.pageNavButton} onClick={() => onPageChanged(page + 1)} disabled={page >= pageCount}>
                    next
                    <FontAwesomeIcon icon={faChevronCircleRight} />
                </button>
            </div>
        </div>
    )
}

export default Pagination