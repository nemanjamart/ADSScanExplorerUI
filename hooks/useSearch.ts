import useSWR from "swr"
import SearchResultType from "../types/searchResult"

const fetcher = (url) => fetch(url).then(r => r.json().then(data => data as SearchResultType))

function useSearch(q, page, limit, type) {
    const key = `api/metadata/search?q=${q}&type=${type}&page=${page}&limit=${limit}`
    const { data, error } = useSWR(key, fetcher)

    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}

  

export default useSearch