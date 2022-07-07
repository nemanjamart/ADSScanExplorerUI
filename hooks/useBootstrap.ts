import useSWRImmutable from 'swr/immutable'
import getConfig from 'next/config'
import BootstrapType from "../types/bootstrap"
import { getCookies } from 'cookies-next';
import { mutate } from 'swr';

const { publicRuntimeConfig } = getConfig()

const fetchAuthWithCookies = (url, cookies) =>
    fetch(url, { method: 'GET', headers: { 'Accept': 'application/json', 'Cookie': cookies }, credentials: 'include' })
        .then(r => r.json().then(data => data as BootstrapType))

function useBootstrap() {

    const cookies = getCookies({ httpOnly: true });
    const { data, error } = useSWRImmutable([publicRuntimeConfig.bootstrapServiceUrl, cookies], fetchAuthWithCookies)

    if (!error && data) {
        // Add Z to correctly format timestamp as it is in UTC
        const expiry = new Date(data.expire_in + 'Z')
        if (expiry.getTime() <= Date.now()) {
            mutate([publicRuntimeConfig.bootstrapServiceUrl, cookies])
        }
    }

    return {
        data: data,
        error: error
    }
}





export default useBootstrap