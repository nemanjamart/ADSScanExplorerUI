
import React, { useState } from 'react';
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import styles from './SearchBox.module.css'



function SearchBox() {
    const [query, setQuery] = useState("");

    return (
        <div className={styles.container}>
            <div className={styles.inputGroup}>
                <input type="text" className={styles.searchBox} placeholder="Search bibcode" onChange={(e) => setQuery(e.target.value)} />
                <Link href={`/search?bibcode=${query}`}>
                    <button className={styles.button}>
                        <FontAwesomeIcon icon={faSearch} inverse />
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default SearchBox