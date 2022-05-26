import type { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'

const manifest = async ({query: {id}}: NextApiRequest, res: NextApiResponse) => {
    const {serverRuntimeConfig} = getConfig()    
    const r = await fetch(`${serverRuntimeConfig.manifestServiceUrl}/${id}/manifest.json`)
    return res.status(r.status).send(r.body)
}

export default manifest
