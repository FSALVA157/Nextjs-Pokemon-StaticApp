import { Grid, Card } from "@nextui-org/react";
import React from "react";
import { useRouter } from 'next/router';

interface IProps{
    id: number
 }
 

export const FavoriteCard = ({id}: IProps) => {
  const router = useRouter()
  
  const onClickHandler = () => {
    router.push(`/indexados/${id}`)
  }

  return (
    <Grid key={id} xs={6} sm={3} md={2} xl={1}>
      <Card 
        isHoverable
        isPressable 
        css={{ padding: 10 }} 
        onPress={onClickHandler}
        >
        <Card.Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
          width="100%"
          height={140}
        />
      </Card>
    </Grid>
  );
};
