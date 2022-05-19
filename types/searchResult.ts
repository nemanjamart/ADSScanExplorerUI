import ArticleType from "./article"
import CollectionType from "./collection"

type SearchResultType = {
    page: number
    pageCount: number
    total: number
    items: ArticleType[] | CollectionType[]
}

export default SearchResultType