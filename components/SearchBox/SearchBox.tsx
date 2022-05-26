
import React, { useState, useEffect, useLayoutEffect } from 'react';
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import styles from './SearchBox.module.css'
import SearchExample from './SearchExample/SearchExample';
import { useRouter } from 'next/router'


interface SearchBoxProps {
    showExample?: Boolean
}

const SearchBox = ({ showExample = false }: SearchBoxProps) => {
    const [query, setQuery] = useState<string>("");

    useEffect(() => {
        sessionStorage.setItem('queryState', query)
    }, [query]);


    useLayoutEffect(() => {
        if (sessionStorage.getItem('queryState')) {
            setQuery(sessionStorage.getItem('queryState'))
        }
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.inputGroup}>
                <input type="text" className={styles.searchBox} placeholder="Search" onChange={(e) => setQuery(e.target.value)} value={query} />
                <Link href={{ pathname: '/search', query: { q: query, page: 1, limit: 10 } }} passHref>
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