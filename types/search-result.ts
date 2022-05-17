import SearchItemType from "./search-item"

type SearchResultType = {
    page: number
    pageCount: number
    items: SearchItemType[]
}

export default SearchResultType