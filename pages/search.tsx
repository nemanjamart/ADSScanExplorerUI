
import React, { useState } from 'react';
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import Article from '../components/Article/Article'
import Collection from '../components/Collection/Collection'
import styles from '../styles/Search.module.css'
import Layout from '../components/Layout/Layout'
import Pagination from '../components/Pagination/Pagination'
import SearchBox from '../components/SearchBox/SearchBox';
import useSearch from '../hooks/useSearch';
import { PuffLoader } from 'react-spinners';

const Search: NextPage = () => {
    const [tabIndex, setTabIndex] = useState<boolean>(true)
    const [itemCount, setItemCount] = useState<number>(0)

    const onSearchComplete = (itemCount: number) => {
        setItemCount(itemCount)
    }

    return (<Layout showHeader={false}>
        <div>
            <div className={styles.searchHeader}>
                <div className={styles.searchBoxContainer}>
                    <SearchBox />
                    <p>Your search returned <b>{itemCount}</b> results</p>
                </div>
            </div>
            <div className={styles.grid}>
                <div className={styles.gridCenter}>
                    <ul className={styles.navTabs}>
                        <li>
                            <button className={styles.navButton} disabled={tabIndex} onClick={() => setTabIndex(true)}>Articles</button>
                        </li>
                        <li>
                            <button className={styles.navButton} disabled={!tabIndex} onClick={() => setTabIndex(false)}>Collections</button>
                        </li>
                    </ul>
                    <div className={styles.resultsContainer}>
                        <SearchResultTab tabIndex={tabIndex} onSearchComplete={onSearchComplete} />
                    </div>
                </div>
            </div>
        </div>
    </Layout>)

}

interface TabProps {
    tabIndex: boolean
    onSearchComplete(total: number)
}

const SearchResultTab = ({ tabIndex, onSearchComplete }: TabProps) => {
    const router = useRouter()
    const { q, page, limit } = router.query
    const { data, isLoading, isError } = useSearch(q, page, limit, tabIndex ? 'article' : 'collection')

    const onPaginationChanged = (page: number, limit: number) => {
        router.push({
            pathname: router.basePath,
            query: { q: q, page: page, limit: limit },
        }, undefined, { shallow: true })
    }


    if (isError) return (<><p>Sorry something went wrong</p></>)
    if (isLoading) return <PuffLoader size={150} />
    if (data.total == 0) return (<><p>Sorry no results were found for <b>{q}</b></p></>)
    if (data.pageCount < Number(page)) onPaginationChanged(1, Number(limit))

    onSearchComplete(data.total)

    return (
        <>
            {data.items.map((item, i) => tabIndex ? <Article key={i} article={item} /> : <Collection key={i} collection={item} />)}
            < Pagination page={Number(page)} limit={Number(limit)} pageCount={data.pageCount} onPaginationChanged={onPaginationChanged} />
        </>
    )
}



export default Search
