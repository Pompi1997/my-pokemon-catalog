import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';

const GET_POKEMON = gql`
  query pokemon($id: String) {
    pokemon(id: $id) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;

function PokemonDetail() {
  const router = useRouter();

  const { loading, error, data } = useQuery(GET_POKEMON, {
    variables: { id: router.query.id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const pokemon = data.pokemon;


  return (
    <div style={{ 
      maxWidth: "50%", 
      margin: "auto", 
      backgroundColor: "#fff", 
      borderRadius: "8px",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
      overflow: "hidden",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{
        position: "relative",
        height: "200px",
        backgroundColor: "#f7fafc"
      }}>
        <img 
          src={pokemon.image} 
          alt={pokemon.name} 
          style={{
            position: "absolute",
            top: 10,
            left: 160,
            width: "50%",
            height: "100%",
            // objectFit: "cover"
          }} 
        />
      </div>
      <div style={{
        padding: "16px"
      }}>
        <h1 style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "8px"
        }}>{pokemon.name}</h1>
        <p style={{
          fontSize: "16px",
          marginBottom: "8px"
        }}>No: {pokemon.number}</p>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          marginBottom: "8px"
        }}>
          {pokemon.types.map((type) => (
            <span 
              key={type}
              style={{
                backgroundColor: "#cbd5e0",
                color: "#4a5568",
                padding: "4px 12px",
                borderRadius: "20px",
                fontSize: "12px",
                marginRight: "4px",
                marginBottom: "4px"
              }}
            >
              {type}
            </span>
          ))}
        </div>
        <span style={{ 
          fontSize: "16px",
          marginBottom: "8px",
          backgroundColor: "#cbd5e0",
          borderRadius: "20px",
          color: "#4a5568",
          padding: "4px 12px",


          
        }}>
          Weight:</span> {pokemon.weight.minimum} - {pokemon.weight.maximum}
        
        <p style={{ 
          fontSize: "16px",
          marginBottom: "8px"
        }}>
          Height: {pokemon.height.minimum} - {pokemon.height.maximum}
        </p>
        <p style={{ 
          fontSize: "16px",
          marginBottom: "8px"
        }}>Classification: {pokemon.classification}</p>
        <p style={{ 
          fontSize: "16px",
          marginBottom: "8px"
        }}>Resistant: {pokemon.resistant.join(', ')}</p>
        <p style={{ 
          fontSize: "16px",
          marginBottom: "8px"
        }}>Weaknesses: {pokemon.weaknesses.join(', ')}</p>
        <p style={{ 
          fontSize: "16px",
          marginBottom: "8px"
        }}>Flee Rate: {pokemon.fleeRate}</p>
        <p style={{ 
          fontSize: "16px",
          marginBottom: "8px"
        }}>Max CP: {pokemon.maxCP}</p>
        <p style={{ 
          fontSize: "16px",
          marginBottom: 0
        }}>Max HP: {pokemon.maxHP}</p>
      </div>
    </div>
  );
  
}

export default PokemonDetail;
