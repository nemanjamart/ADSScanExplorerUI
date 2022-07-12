import Link from 'next/link'
import useScanService from '../../hooks/useScanService'
import ArticleType from '../../types/article'
import ItemCard from '../ItemCard/ItemCard'
import getConfig from 'next/config'
import ArticleExtraType from '../../types/articleExtra'

type ArticleProps = {
    article: ArticleType
    thumbnail: string
    textQuery: string
}

const { publicRuntimeConfig } = getConfig()

const Article = ({ article, thumbnail, textQuery }: ArticleProps) => {
    const extraUrl = `${publicRuntimeConfig.metadataServiceUrl}/article/extra/${article.bibcode}`
    const { data, isLoading, isError } = useScanService<ArticleExtraType>(extraUrl, {})


    const ArticleCard = () => {
        if (isLoading) {
            return <ItemCard subtitle={article.bibcode} text={`${article.pages} pages`} thumbnail={thumbnail} loadingExtra={true} />
        } else if (data && data.title && data.author && !isError) {
            return <ItemCard title={data.title.toString()} subtitle={article.bibcode} text={`${article.pages} pages`} footer={data.author.toString()} thumbnail={thumbnail} />
        } else {
            return <ItemCard title={article.bibcode} text={`${article.pages} pages`} thumbnail={thumbnail} />
        }
    }

    return (
        <Link href={{ pathname: `/manifest/${article.id}`, query: textQuery ? { full: textQuery } : '' }} >
            <div>
                <ArticleCard />
            </div>
        </Link>
    )
}

export default Article