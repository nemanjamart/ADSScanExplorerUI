import type { NextPage } from 'next'
import Layout from '../components/Layout/Layout'
import SearchBox from '../components/SearchBox/SearchBox'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Layout showHeader={true}>
        <div className={styles.searchArea}>
          <SearchBox showExample={true} />
        </div>
      </Layout>
    </div>
  )
}

export default Home
