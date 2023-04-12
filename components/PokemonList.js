import { useQuery, gql } from '@apollo/client';
import styles from '../styles/styles.module.css';
import Link from 'next/link';

const GET_POKEMONS = gql`
  query GetPokemons($first: Int!) {
    pokemons(first: $first) {
      id
      name
      image
      types
      number
    }
  }
`;

function PokemonList({ first }) {
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: { first },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <div className={styles['pokemon-list']}>
      {data.pokemons.map((pokemon) => (
        <div className={styles['pokemon-card']}>
        <Link href={`/pokemon/${pokemon.id}`} key={pokemon.id}>
          
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className={styles['pokemon-image']}
            />
            <p className={styles['pokemon-number']}>No: {pokemon.number}</p>
            <p className={styles['pokemon-name']}>Name: {pokemon.name}</p>
            <p className={styles['pokemon-types']}>
              Type: {pokemon.types.join(', ')}
            </p>
          
        </Link>
        </div>
      ))}
    </div>
  );
}

export default PokemonList;
