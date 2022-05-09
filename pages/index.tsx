import type { NextPage } from 'next'
import Head from 'next/head'
import SearchBox from '../components/SearchBox/SearchBox'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>ADS Scan Explorer</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="#">ADS Scan Explorer!</a>
        </h1>

        <SearchBox />
      </main>
    </div>
  )
}

export default Home
