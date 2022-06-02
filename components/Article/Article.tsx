import Link from 'next/link'
import ArticleType from '../../types/article'
import styles from './Article.module.css'
import Image from 'next/image'

type ArticleProps = {
    article: ArticleType
    query: string
}

const Article = ({ article, query }: ArticleProps) => {

    return (
        <Link href={{pathname: `/manifest/${article.id}`, query: query ? {q: query} : ''}} >
            <div className={styles.card}>
                <div className={styles.grid}>
                    <Image className={styles.thumbnail} src={article.thumbnail} alt="Article thumbnail" width={400} height={200} unoptimized/>
                    <h2>{article.bibcode}</h2>
                    <p>{article.pages} pages</p>
                </div>
            </div>
        </Link>
    )
}

export default Article