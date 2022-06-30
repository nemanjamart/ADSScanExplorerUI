
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
    const router = useRouter()
    const { q } = router.query
    const [query, setQuery] = useState<string>(q ? String(q) : '');


    const hrefSearch = { pathname: '/search', query: { q: query, page: 1, limit: 10 } }
    
    const onKeyDown = (e) => {
        if (e.key == "Enter") {
            router.push(hrefSearch)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.inputGroup}>
                <input type="text" className={styles.searchBox} placeholder="Search" onChange={(e) => setQuery(e.target.value)} value={query} onKeyDown={onKeyDown} />
                <Link href={hrefSearch} passHref>
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