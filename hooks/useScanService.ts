import { useEffect } from "react";
import useSWR from "swr"
import useBootstrap from "./useBootstrap"
import useAlert from "./useAlert";
import ServiceError from "../types/serviceError";

const fetchGeneric = <T>(url, headers) => fetch(url, { headers: headers }).then(resp => Promise.all([resp, resp.json()])).then(([resp, data]) => {
    if (!resp.ok) {
        if (data && data.message) {
            const error = new ServiceError(data.message, data?.type)
            throw error
        }
        else {
            const error = new ServiceError('Sorry! An unexpected error occured while fetching the data')
            throw error
        }


    } else {
        return data as T
    }
})

/**
 * Hook used to query the scan service API.
 * 
 * Return type is generic and caller is responsible to provide expected result type.
 * Errors is returned as ServiceError type.
 */
function useScanService<T>(url, queries) {

    const { data: authData, error: authError } = useBootstrap()
    const { addMessage, removeAlert } = useAlert();
    const queryStr = Object.entries(queries).map(([key, value]) => encodeURIComponent(`${key}`) + '=' + encodeURIComponent(`${value}`)).join('&')
    const key = `${url}?${queryStr}`

    const { data, error } = useSWR<T>(!authError && authData?.access_token && url
        ? [key, { Authorization: `${authData.token_type} ${authData.access_token}` }]
        : null, fetchGeneric)

    useEffect(() => {
        if (error) {
            addMessage(error instanceof ServiceError ? error.getMessage() : error.message)
        } else {
            removeAlert()
        }
    }, [removeAlert, addMessage, error])


    return {
        data: data,
        isLoading: !error && !authError && !data,
        isError: error || authError
    }
}


export default useScanService