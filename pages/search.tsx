
import { useRouter } from 'next/router'
import useSWR from 'swr'
import type { NextPage } from 'next'
import ArticleType from '../types/article'
import Article from '../components/Article/Article'
import styles from '../styles/Search.module.css'
import Layout from '../components/Layout/Layout'

const fetchArticles = (url) => fetch(url).then(r => r.json().then(data => data as ArticleType[]))


const Search: NextPage = () => {
    const router = useRouter()
    const { bibcode } = router.query

    const { data, error } = useSWR(
        bibcode ? `${process.env.NEXT_PUBLIC_METADATA_SERVICE}/articles?bibcode=${bibcode}` : null,
        fetchArticles
    )

    if (error) return <div>Failed to load articles</div>


    return (<Layout>
        <div className={styles.container}>
            <div className={styles.grid}>
                {data ? data.map((article, i) => <Article key={i} article={article} />) : (null)}
            </div>
        </div>
    </Layout>)

}

export default Search
