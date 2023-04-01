import { FC } from "react";
import { Card, Grid, Row, Text } from "@nextui-org/react";
import { SmallPokemon } from "@/interfaces";
import { useRouter } from "next/router";

interface IProps {
  pokemon: SmallPokemon;
}

export const PokemonCard: FC<IProps> = ({ pokemon }) => {
  const router = useRouter()

  const onClickHandler = () => {
    router.push(`/pokemon/${pokemon.name}`)
  }

  return (
    <Grid xs={6} sm={3} md={2} xl={1} key={pokemon.id}>
      <Card 
        isHoverable
        isPressable
        onClick={onClickHandler}
        >
        <Card.Body>
          <Card.Image src={pokemon.image} width="100%" height={140} />
        </Card.Body>
        <Card.Footer>
          <Row justify="space-between">
            <Text>{pokemon.name}</Text>
            <Text>#{pokemon.id}</Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
};
