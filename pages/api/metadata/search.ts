import type { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'

const search = async ({query: {q, type, page, limit}}: NextApiRequest, res: NextApiResponse) => {
    const {serverRuntimeConfig} = getConfig()    
    const r = await fetch(`${serverRuntimeConfig.metadataServiceUrl}/${type}/search?q=${q}&page=${page}&limit=${limit}`)
    return res.status(r.status).send(r.body)
}

export default search
