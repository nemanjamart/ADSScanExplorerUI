
import { useRouter } from 'next/router'
import useSWR from 'swr'
import type { NextPage } from 'next'
import ArticleType from '../types/article'
import styles from '../styles/Article.module.css'
import Link from 'next/link'

const fetcher = url => fetch(url).then(r => r.json().then(data => data as ArticleType[]))

const Search: NextPage = () => {
    const router = useRouter()
    const { data, error } = useSWR(
        router.query.bibcode ? `${process.env.NEXT_PUBLIC_METADATA_SERVICE}/articles?bibcode=${router.query.bibcode}` : null,
        fetcher
    )

    if (error) return <div>Failed to load articles</div>
    if (!data) return <div>Loading...</div>

    const items = data.map((article) => {
        return (
            <Link key={article.id} href={`/article/${article.id}`} >
                <div className={styles.card}>
                    <p>ID: {article.id}</p>
                    <p>Bibcode: {article.bibcode}</p>
                </div>
            </Link>
        )
    })

    return (<div className={styles.grid}>
        {items}
    </div>)

}

export default Search
