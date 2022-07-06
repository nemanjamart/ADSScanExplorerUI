
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import Article from '../components/Article/Article'
import Collection from '../components/Collection/Collection'
import styles from '../styles/Search.module.css'
import Layout from '../components/Layout/Layout'
import Pagination from '../components/Pagination/Pagination'
import SearchBox from '../components/SearchBox/SearchBox';
import { PuffLoader } from 'react-spinners';
import Page from '../components/Page/Page';
import TabType from '../types/tab';
import useScanService from '../hooks/useScanService';
import SearchResultType from '../types/searchResult';
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()


function tabItemThumbnail(id: string, type: string) {
    return `${publicRuntimeConfig.serviceUrl}/image/thumbnail?id=${id}&type=${type}`
}

const ArticleTab: TabType = {
    name: 'article', render: (index, item, textQuery) => {
        return <Article key={index} article={item} thumbnail={tabItemThumbnail(item.id, 'article')} textQuery={textQuery} />
    }
}
const CollectionTab: TabType = {
    name: 'collection', render: (index, item, textQuery) => {
        return <Collection key={index} thumbnail={tabItemThumbnail(item.id, 'collection')} collection={item} textQuery={textQuery} />
    }
}
const PageTab: TabType = {
    name: 'page', render: (index, item, textQuery) => {
        return <Page key={index} thumbnail={tabItemThumbnail(item.id, 'page')} page={item} textQuery={textQuery} />
    }
}

const Search: NextPage = () => {
    const router = useRouter()
    const { q, page, limit, t } = router.query

    let defaultTab = ArticleTab
    if (t == CollectionTab.name) defaultTab = CollectionTab
    else if (t == PageTab.name) defaultTab = PageTab

    const [tab, setTab] = useState<TabType>(defaultTab)
    const [itemCount, setItemCount] = useState<number>(0)


    const onTabChanged = (tab: TabType) => {
        setTab(tab)

        router.push({
            pathname: '/search',
            query: { q: q, page: page, limit: limit, t: tab.name },
        }, undefined, { shallow: true })
    }

    const onSearchComplete = (itemCount: number) => {
        setItemCount(itemCount)
    }

    return (<Layout showHeader={false}>
        <div>
            <div className={styles.searchHeader}>
                <div className={styles.searchBoxContainer}>
                    <SearchBox />
                    <div className={styles.searchResultCount}>
                        <p>Your search returned <b>{itemCount}</b> results</p>
                    </div>
                </div>
            </div>
            <div className={styles.grid}>
                <div className={styles.gridCenter}>
                    <ul className={styles.navTabs}>
                        <li>
                            <button className={styles.navButton} disabled={tab == ArticleTab} onClick={() => onTabChanged(ArticleTab)}>Articles</button>
                        </li>
                        <li>
                            <button className={styles.navButton} disabled={tab == CollectionTab} onClick={() => onTabChanged(CollectionTab)}>Collections</button>
                        </li>
                        <li>
                            <button className={styles.navButton} disabled={tab == PageTab} onClick={() => onTabChanged(PageTab)}>Pages</button>
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
    const searchUrl = `${publicRuntimeConfig.metadataServiceUrl}/${tab.name}/search`
    const searchQueries = { q: q, page: page, limit: limit }
    const { data, isLoading, isError } = useScanService<SearchResultType>(searchUrl, searchQueries)

    const onPaginationChanged = (page: number, limit: number) => {
        router.push({
            pathname: '/search',
            query: { q: q, page: page, limit: limit, t: tab.name },
        }, undefined, { shallow: true })
    }

    useEffect(() => {
        if (data) {
            onSearchComplete(data.total)
        }
    }, [onSearchComplete, data])

    if (isError) return (<><p>Sorry something went wrong</p></>)
    if (isLoading) return <PuffLoader size={150} />
    if (data.total == 0) return (<><p>Sorry no results were found for <b>{q}</b></p></>)
    if (data.pageCount < Number(page)) onPaginationChanged(1, Number(limit))



    return (
        <>
            {data.items.map((item, i) => tab.render(i, item, data.query))}
            < Pagination page={Number(page)} limit={Number(limit)} pageCount={data.pageCount} onPaginationChanged={onPaginationChanged} />
        </>
    )
}



export default Search
