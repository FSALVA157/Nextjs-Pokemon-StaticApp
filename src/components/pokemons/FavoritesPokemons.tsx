
import favorites from '@/pages/favorites'
import { Grid, Card } from '@nextui-org/react'
import React from 'react'
import { FavoriteCard } from './FavoriteCard'

interface IProps{
   pokemons: number[]
}

export const FavoritesPokemons = ({pokemons}: IProps ) => {
  return (
    <Grid.Container gap={2} direction='row' justify='flex-start'>
              {
                pokemons.map(id => {
                  return (
                    <FavoriteCard key={id} id={id}></FavoriteCard>
                  )
                })
              }

            </Grid.Container>
  )
}
