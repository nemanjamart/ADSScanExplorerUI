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

/**
 * Article component used to visualize an article search result 
 */
const Article = ({ article, thumbnail, textQuery }: ArticleProps) => {
    const extraUrl = `${publicRuntimeConfig.metadataServiceUrl}/article/extra/${article.bibcode}`
    const { data, isLoading, isError } = useScanService<ArticleExtraType>(extraUrl, {})

    let query = '?art=true'
    query += textQuery ? `&full=${textQuery}` : ''
    const href = `/manifest/${article.id}${query}`

    /** Article fetch content from multiple sources, display partially loaded result if required */
    const ArticleCard = () => {
        if (isLoading) {
            return <ItemCard subtitle={article.bibcode} text={`${article.pages} pages`} thumbnail={thumbnail} loadingExtra={true} href={href}/>
        } else if (data && data.title && data.author && !isError) {
            return <ItemCard title={data.title.toString()} subtitle={article.bibcode} text={`${article.pages} pages`} footer={data.author.toString()} thumbnail={thumbnail} href={href}/>
        } else {
            return <ItemCard title={article.bibcode} text={`${article.pages} pages`} thumbnail={thumbnail} href={href}/>
        }
    }



    return (
        <ArticleCard />
    )
}

export default Article