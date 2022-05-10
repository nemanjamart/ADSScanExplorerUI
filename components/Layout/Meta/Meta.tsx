import Head from 'next/head'

const Meta = () => {
    return (
        <Head>
            <title>ADS Scan Explorer</title>
            <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/favicon/apple-touch-icon.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/favicon/favicon-16x16.png"
            />

            <meta name="description" content={`ADS Scan Explorer`} />
        </Head>
    )
}

export default Meta