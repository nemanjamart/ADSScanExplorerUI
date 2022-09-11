import ArticleType from "./article"
import CollectionType from "./collection"
import PageType from "./page"

interface SearchResultType  {
    page: number
    pageCount: number
    total: number
    items: ArticleType[] | CollectionType[] | PageType[]
    query: string,
    extra_collection_count: number,
    extra_page_count: number
}

export default SearchResultType