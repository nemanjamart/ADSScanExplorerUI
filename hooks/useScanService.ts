import useSWR from "swr"
import useBootstrap from "./useBootstrap"

const fetchGeneric = <T>(url, headers) => fetch(url, { headers: headers }).then(r => r.json()).then(data => data as T)

function useScanService<T>(url, queries) {

    const { data: authData, error: authError } = useBootstrap()

    const queryStr = Object.entries(queries).map(([key, value]) => `${key}=${value}`).join('&')
    const key = `${url}?${queryStr}`

    const { data, error } = useSWR<T>(!authError && authData?.access_token
        ? [key, { Authorization: `${authData.token_type} ${authData.access_token}` }]
        : null, fetchGeneric)

    return {
        data: data,
        isLoading: !error && !authError && !data,
        isError: error || authError
    }
}


export default useScanService