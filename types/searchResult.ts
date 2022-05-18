import ArticleType from "./article"
import CollectionType from "./collection"

type SearchResultType = {
    page: number
    pageCount: number
    total: number
    articles: ArticleType[]
    collections: CollectionType[]
}

export default SearchResultType