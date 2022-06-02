import useSWR from "swr"
import SearchResultType from "../types/searchResult"
import getConfig from 'next/config'
import BootstrapType from "../types/bootstrap"
import { getCookies } from 'cookies-next';

const { publicRuntimeConfig } = getConfig()

const fetchAuthWithCookies = (url, cookies) =>
    fetch(url, { method: 'GET', headers: { 'Accept': 'application/json', 'Cookie': cookies } })
        .then(r => r.json().then(data => data as BootstrapType))

function useBootstrap() {

    const cookies = getCookies({ httpOnly: true });
    const { data, error } = useSWR([publicRuntimeConfig.bootstrapServiceUrl, cookies], fetchAuthWithCookies)

    return {
        data: data,
        error: error
    }
}





export default useBootstrap