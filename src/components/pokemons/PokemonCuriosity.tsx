
import { Button, Grid } from '@nextui-org/react'
import React from 'react'

interface IProp{
  name: string,
  onclickHandler: Function
}

export const PokemonCuriosity = ({name, onclickHandler}: IProp) => {
  const openModal = () => {
     onclickHandler()
  }

  return (
    <Grid>
        <Button color="success" flat onClick={openModal} auto>
          {name}
        </Button>
      </Grid>
  )
}
