
import React, { useState } from 'react';
import Router, { useRouter } from 'next/router'
import useSWR from 'swr'
import type { NextPage } from 'next'
import SearchResultType from '../types/search-result'
import SearchItem from '../components/SearchItem/SearchItem'
import styles from '../styles/Search.module.css'
import Layout from '../components/Layout/Layout'
import Pagination from '../components/Pagination/Pagination'
import SearchBox from '../components/SearchBox/SearchBox';

const Search: NextPage = () => {
    const router = useRouter()
    const { q, page, limit } = router.query

    // const [myPage, setPage] = useState<number>(Number(page));
    // const [myLimit, setLimit] = useState<number>(Number(limit));

    const onPaginationChanged = (page: number, limit: number) => {
        console.log(page)
        router.push({
            pathname: router.basePath,
            query: { q: q, page: page, limit: limit },
        }, undefined, { shallow: true })
    }

    const fetchSearchResult = (url) => fetch(url).then(r => r.json().then(data => data as SearchResultType))

    const getKey = () => {
        if (!q) return null
        return `${process.env.NEXT_PUBLIC_METADATA_SERVICE}/search?q=${q}&page=${page}&limit=${limit}`
    }

    const { data, error } = useSWR(
        getKey,
        fetchSearchResult
    )

    if (error) return <div>Failed to load articles</div>
    if (!data) return <Layout showHeader={false}>Loading...</Layout>;

    return (<Layout showHeader={false}>
        <div>
            <div className={styles.searchHeader}>
                <div className={styles.searchBoxContainer}>
                    <SearchBox initialQuery={String(q)}/>
                    <p>Your search returned <b>{data.total}</b> results</p>
                </div>
            </div>
            <div className={styles.grid}>
                <div className={styles.resultsContainer}>
                    {data.items.map((item, i) => <SearchItem key={i} item={item} />)}
                    <Pagination page={Number(page)} limit={Number(limit)} pageCount={data.pageCount} onPaginationChanged={onPaginationChanged} />
                </div>

            </div>
        </div>
    </Layout>)

}

export default Search
