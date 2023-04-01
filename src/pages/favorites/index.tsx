
import { Layout } from '@/components/layouts'
import { NoFavorites } from '@/components/ui'
import React, { useEffect, useState } from 'react'
import { manageFavorites } from '@/utils';
import { Card, Container, Grid } from '@nextui-org/react';
import { FavoritesPokemons } from '@/components/pokemons';


const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<number[]>([])

  useEffect(() => {
    setFavorites(manageFavorites.favorites_list())    
  }, [])
  

  return (
    <Layout titulo='Favoritos'>
      {
        (favorites.length === 0)?  (<NoFavorites/>)
          : (
            <FavoritesPokemons pokemons = {favorites}/>
          )
        
      }
     
    </Layout>
  )
}

export default FavoritesPage