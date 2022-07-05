import { useEffect } from "react";
import useSWR from "swr"
import ServiceErrorType from "../types/serviceError";
import useBootstrap from "./useBootstrap"
import useError from "./useAlert";

const fetchGeneric = <T>(url, headers) => fetch(url, { headers: headers }).then(resp => Promise.all([resp, resp.json()])).then(([resp, data]) => {
    if (!resp.ok) {
        if (data && data.message) {
            const error = new Error(data.message)
            throw error
        } 
        else {
            const error = new Error('An error occured while fetching data')
            throw error
        }

        
    } else {
        return data as T
    }
})

function useScanService<T>(url, queries) {

    const { data: authData, error: authError } = useBootstrap()
    const { addError } = useError();
    const queryStr = Object.entries(queries).map(([key, value]) => `${key}=${value}`).join('&')
    const key = `${url}?${queryStr}`

    const { data, error } = useSWR<T>(!authError && authData?.access_token
        ? [key, { Authorization: `${authData.token_type} ${authData.access_token}` }]
        : null, fetchGeneric)

    useEffect(() => {
        if (error) {
            addError(error.message)
        }
    }, [addError, error])


    return {
        data: data,
        isLoading: !error && !authError && !data,
        isError: error || authError
    }
}


export default useScanService