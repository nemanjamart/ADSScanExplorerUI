import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/Layout/Layout'
import SearchBox from '../components/SearchBox/SearchBox'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Layout >
        <div className={styles.searchArea}>
          <SearchBox />
        </div>
      </Layout>
    </div>
  )
}

export default Home
