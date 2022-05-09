

import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer>
      <div className={styles.container}>
        <a href={`https://github.com/adsabs/ADSScanExplorerUI/`}>
          View on GitHub
        </a>
      </div>
    </footer>
  )
}

export default Footer