import Head from 'next/head';
import { useState } from 'react';
import PokemonList from '../components/PokemonList';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import styles from '../styles/styles.module.css';
import Link from 'next/link';


const client = new ApolloClient({
  uri: 'https://graphql-pokemon2.vercel.app/',
  cache: new InMemoryCache()
});

function Home() {
  const [first, setFirst] = useState(20);

  const handleLoadMore = () => {
    setFirst(prevFirst => prevFirst + 20);
  };

  return (
    <div>
      <Head>
        <title>Pokemon Catalog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


    
      <main className={styles.container}>
        <h1>Pokemon Catalog</h1>
        <PokemonList first={first} />
        <button className={styles.loadmore} onClick={handleLoadMore}>Load More</button>
      </main>
    </div>
  );
}

export default Home;
