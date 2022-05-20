import Link from 'next/link'
import ArticleType from '../../types/article'
import styles from './Article.module.css'
import Image from 'next/image'

type ArticleProps = {
    article: ArticleType
}

const Article = ({ article }: ArticleProps) => {

    return (
        <Link href={`/manifest/${article.id}`} >
            <div className={styles.card}>
                <div className={styles.grid}>
                    <Image className={styles.thumbnail} src={article.thumbnail} alt="" width={400} height={200} />
                    <h2>{article.bibcode}</h2>
                    <p>{article.pages} pages</p>
                </div>
            </div>
        </Link>
    )
}

export default Article