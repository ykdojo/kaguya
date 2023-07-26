import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Kaguya Project</title>
        <meta name="description" content="Interact with your file system via ChatGPT with Kaguya." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Kaguya
        </h1>

        <p className={styles.description}>
          Interact with your file system via ChatGPT.
        </p>

        <div className={styles.grid}>
          <Link href="/api-doc" className={styles.card}>
            <h2>API Documentation &rarr;</h2>
            <p>Check out the API endpoints available in this project.</p>
          </Link>
        </div>
      </main>
    </div>
  )
}