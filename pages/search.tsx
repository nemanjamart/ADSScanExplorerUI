
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
import Page from '../components/Page/Page';
import TabType from '../types/tab';

const ArticleTab: TabType = { name: 'article', render: (index, item, query) => { return <Article key={index} article={item} query={query}/> } }
const CollectionTab: TabType = { name: 'collection', render: (index, item, query) => { return <Collection key={index} collection={item} query={query}/> } }
const PageTab: TabType = { name: 'page', render: (index, item, query) => { return <Page key={index} page={item} /> } }

const Search: NextPage = () => {
    const [tab, setTab] = useState<TabType>(ArticleTab)
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
                            <button className={styles.navButton} disabled={tab == ArticleTab} onClick={() => setTab(ArticleTab)}>Articles</button>
                        </li>
                        <li>
                            <button className={styles.navButton} disabled={tab == CollectionTab} onClick={() => setTab(CollectionTab)}>Collections</button>
                        </li>
                        <li>
                            <button className={styles.navButton} disabled={tab == PageTab} onClick={() => setTab(PageTab)}>Pages</button>
                        </li>
                    </ul>
                    <div className={styles.resultsContainer}>
                        <SearchResultTab tab={tab} onSearchComplete={onSearchComplete} />
                    </div>
                </div>
            </div>
        </div>
    </Layout>)

}

interface TabProps {
    tab: TabType
    onSearchComplete(total: number)
}

const SearchResultTab = ({ tab, onSearchComplete }: TabProps) => {
    const router = useRouter()
    const { q, page, limit } = router.query
    const { data, isLoading, isError } = useSearch(q, page, limit, tab.name)

    const onPaginationChanged = (page: number, limit: number) => {
        router.push({
            pathname: '/search',
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
            {data.items.map((item, i) => tab.render(i, item, data.query))}
            < Pagination page={Number(page)} limit={Number(limit)} pageCount={data.pageCount} onPaginationChanged={onPaginationChanged} />
        </>
    )
}



export default Search
