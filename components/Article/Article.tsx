import Link from 'next/link'
import ArticleType from '../../types/article'
import ItemCard from '../ItemCard/ItemCard'


type ArticleProps = {
    article: ArticleType
    thumbnail: string
    textQuery: string
}

const Article = ({ article, thumbnail, textQuery }: ArticleProps) => {
    return (
        <Link href={{ pathname: `/manifest/${article.id}`, query: textQuery ? { full: textQuery } : '' }} >
            <div>
                <ItemCard title={article.bibcode} text={`${article.pages} pages`} thumbnail={thumbnail} />
            </div>
        </Link>
    )
}

export default Article