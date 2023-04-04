import { Inter } from 'next/font/google'
import { Layout } from '../components/layouts/Layout';
import { GetStaticProps } from 'next'
import { pokeApi } from '@/api';
import { PokemonListResponse, SmallPokemon } from '@/interfaces';
import { Card, Grid, Image, Row, Text } from '@nextui-org/react';
import { PokemonCard } from '@/components/pokemons';

const inter = Inter({ subsets: ['latin'] })

interface IProps{
  pokemons: SmallPokemon[];
}

export default function HomePage({pokemons}: IProps ) {

  return (
    <Layout titulo="Poke-App">

      {/* <Image
        src='../../banner.png'
        alt='banner'
        width={200}
        height={150}
      /> */}
     
     <Grid.Container gap={2} justify='flex-start'>
      {
        pokemons.map(pokemon => (
          <PokemonCard 
            pokemon={pokemon}
            key={pokemon.id}            
           />
        ))
      }      
     </Grid.Container>
    </Layout>
  )
}


// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async (ctx) => {
  let {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')
  
  let listado: SmallPokemon[] = data.results.map((pokemon, index) => {
        
    return {
      id: index + 1,
      name: pokemon.name,
      url: pokemon.url,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index + 1}.svg`
    }
  })


  return {
    props: {
      pokemons: listado
    }
  }
}