import { pokeApi } from "@/api"
import { Layout } from "@/components/layouts"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { Pokemon as IPokemon } from '@/interfaces';
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";

interface IProps{
  pokemon: IPokemon
}

const Pokemon: NextPage<IProps> = ({pokemon}) => {
  
  

  return (
    <Layout titulo="any pokemon">
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
              <Button color='warning' ghost>Agregar a Favoritos</Button>
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

  const pokemons151: string[] = Array.from({length: 151},(_,index)=> `${index+1}`)
  

  return {
    paths: pokemons151.map(id => ({
      params: {id}
    })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const {id} = params as {id: string}

  const {data} = await pokeApi.get<IPokemon>(`/pokemon/${id}`)

  return {
    props: {
      pokemon : data
    }
  }
}




export default Pokemon