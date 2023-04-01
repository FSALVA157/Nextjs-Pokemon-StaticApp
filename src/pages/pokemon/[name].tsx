import React, { useState } from 'react'

import { NextPage, GetStaticProps, GetStaticPaths } from 'next';

import { Pokemon as IPokemon, PokemonListResponse } from '@/interfaces';
import { Layout } from '@/components/layouts';
import { Grid, Card, Button, Container, Text, Image } from '@nextui-org/react';
import { manageFavorites } from '@/utils';
import confetti from 'canvas-confetti';
import { useRouter } from 'next/router';
import { pokeApi } from '@/api';
import { getPokemonInfo } from '../../utils/getPokemonInfo';



interface IProps{
    pokemon: IPokemon
  }

const PokemonPage: NextPage<IProps> = ({pokemon}) => {
    

    const [isFavorite, setIsFavorite] = useState(manageFavorites.isFavorite(pokemon.id))
  
    const onToggleFavorites = () =>{
      manageFavorites.toggleFavorite(pokemon.id)
      setIsFavorite(!isFavorite)
      if(!isFavorite){      
        confetti({
          zIndex: 999,
          particleCount: 100,
          spread: 160,
          angle: -100,
          origin: { y: 0, x: 1 }
        });
      }
    }

  return (
    
    <Layout titulo={pokemon.name}>
    <Grid.Container css={{marginTop: 'spx'}} gap={2}>
      <Grid xs={12} sm={4}>
        <Card isHoverable css={{padding: '30px'}}>
          <Card.Body>
            <Card.Image 
               src={pokemon.sprites.other?.dream_world.front_default || "no-image.png"}
               alt={pokemon.name}
               width='100%'
               height={200}
            />              
          </Card.Body>
        </Card>
      </Grid>
      <Grid xs={12} sm={8}>
        <Card>
          <Card.Header css={{display: 'flex', justifyContent: 'space-between'}}>
            <Text
               h1
               transform="capitalize"
            >{pokemon.name}</Text>
            <Button                 
               color='warning'
               ghost
               onClick={onToggleFavorites}
              >{isFavorite? 'Quitar de Favoritos' : 'Agregar a Favoritos'}</Button>
          </Card.Header>
          <Card.Body>
            <Text size={30}>Sprites:</Text>
            <Container direction="row" display="flex" gap={0}>
              <Image
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                height={100}
                width={100}
               />
               <Image
                src={pokemon.sprites.back_default}
                alt={pokemon.name}
                height={100}
                width={100}
               />
               <Image
                src={pokemon.sprites.front_shiny}
                alt={pokemon.name}
                height={100}
                width={100}
               />
               <Image
                src={pokemon.sprites.back_shiny}
                alt={pokemon.name}
                height={100}
                width={100}
               />
            </Container>
          </Card.Body>
        </Card>
      </Grid>
    </Grid.Container>
  </Layout>
  )
}




export const getStaticPaths: GetStaticPaths = async (ctx) => {
  
  const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')
  const listado: string[] = data.results.map(res => res.name)
  
  return {
    paths: listado.map(name => ({
      params: {name}
    })),
    fallback: false
  }
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.


export const getStaticProps: GetStaticProps = async ({params}) => {
    const {name} = params as {name: string}
    
    // const {data} = await pokeApi.get<IPokemon>(`/pokemon/${name}`)
    // const pokemon = {
    //   id: data.id,
    //   name: data.name,
    //   sprites: data.sprites
    // }

    return {
        props: {
            pokemon: await getPokemonInfo(name)
        }
    }
}

export default PokemonPage