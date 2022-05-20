import ArticleType from "./article"
import CollectionType from "./collection"
import PageType from "./page"

type SearchResultType = {
    page: number
    pageCount: number
    total: number
    items: ArticleType[] | CollectionType[] | PageType[]
}

export default SearchResultType