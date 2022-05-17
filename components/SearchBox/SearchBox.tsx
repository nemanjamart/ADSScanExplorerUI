
import React, { useState } from 'react';
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import styles from './SearchBox.module.css'
import SearchExample from './SearchExample/SearchExample';

interface SearchBoxProps {
    showExample?: Boolean
    initialQuery?: string
}

const SearchBox = ({showExample = false, initialQuery = ""} : SearchBoxProps) =>{
    const [query, setQuery] = useState<string>(initialQuery);

    return (
        <div className={styles.container}>
            <div className={styles.inputGroup}>
                <input type="text" className={styles.searchBox} defaultValue={initialQuery} placeholder="Search" onChange={(e) => setQuery(e.target.value)} value={query} />
                <Link href={{pathname: '/search', query: {q: query, page: 1, limit: 20}}} passHref>
                    <button className={styles.button}>
                        <FontAwesomeIcon icon={faSearch} inverse />
                    </button>
                </Link>
            </div>
            {showExample ? <SearchExample onExampleSelected={(example) => setQuery(example)} /> : ''}
        </div>
    )
}

export default SearchBox