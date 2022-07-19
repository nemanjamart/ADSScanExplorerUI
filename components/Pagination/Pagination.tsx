
import React, { useState } from 'react';
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'
import styles from './Pagination.module.css'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'

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
                    <select id="pagination-limit" className={styles.flatSelect} value={limit} onChange={(e) => { onLimitChanged(getEventValue(e)) }}>
                        {Array.from(Array(10).keys()).map((val) => <option key={val} value={(val + 1) * 10}>{(val + 1) * 10}</option>)}
                    </select>
                </label>
            </div>

            <ButtonToolbar aria-label="Toolbar with button groups">
                <ButtonGroup className="justify-content-between" aria-label="First group">
                    <Button className={styles.pageNavButton} variant="outline-primary" onClick={() => onPageChanged(page - 1)} disabled={page <= 1}>
                        <FontAwesomeIcon icon={faChevronCircleLeft} />
                        prev
                    </Button>
                    <label>
                        <input key={page} id={styles.pageInput} type='number' className='no-spinner' defaultValue={page} onKeyDown={pageNumberInputKeyDown} />
                        of {pageCount}
                    </label>
                    <Button className={styles.pageNavButton} variant="outline-primary" onClick={() => onPageChanged(page + 1)} disabled={page >= pageCount}>
                        next
                        <FontAwesomeIcon icon={faChevronCircleRight} />
                    </Button>
                </ButtonGroup>
                <ButtonGroup aria-label="Third group">

                </ButtonGroup>
            </ButtonToolbar>
        </div>
    )
}

export default Pagination