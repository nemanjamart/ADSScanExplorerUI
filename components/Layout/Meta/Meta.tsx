import Head from 'next/head'

const Meta = () => {
    return (
        <Head>
            <title>ADS Scan Explorer</title>
            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/favicon/favicon-32x32.png"
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