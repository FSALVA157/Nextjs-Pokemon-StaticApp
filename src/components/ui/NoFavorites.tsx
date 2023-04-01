
import { Container, Text, Image } from '@nextui-org/react'
import React from 'react'

export const NoFavorites = () => {
  return (
    <Container
    css={{
      display: 'flex',
      height:'calc(100vh-100px)',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'cemter'
    }}
  >
    <Text h1>No Hay Favoritos</Text>
    <Image
       src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg"
       alt='logo'
       width={250}
       height={250}
      //  css={{
      //   opacity: 0.05
      //  }}
    />
  </Container>
  )
}
