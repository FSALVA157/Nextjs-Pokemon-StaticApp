import { pokeApi } from "@/api"
import { Layout } from "@/components/layouts"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { Pokemon as IPokemon } from '@/interfaces';
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import { manageFavorites } from "@/utils";
import { useState } from "react";
import confetti from 'canvas-confetti'
import { getPokemonInfo } from "@/utils/getPokemonInfo";

interface IProps{
  pokemon: IPokemon
}


const Pokemon: NextPage<IProps> = ({pokemon}) => {


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



// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes


export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const pokemons151: string[] = Array.from({length: 153},(_,index)=> `${index+1}`)
  

  return {
    paths: pokemons151.map(id => ({
      params: {id}
    })),
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const {id} = params as {id: string}

  //const {data} = await pokeApi.get<IPokemon>(`/pokemon/${id}`)
  const pokemon =  await getPokemonInfo(id)

  if(!pokemon){
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
 
  return {
    props: {
      pokemon
    },
    revalidate: 86400
  }
}




export default Pokemon