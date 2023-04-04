import { FC, useState } from "react";
import { Card, Grid, Row, Text, Modal, Input, Checkbox, Button } from "@nextui-org/react";
import { SmallPokemon } from "@/interfaces";
import { useRouter } from "next/router";
import { PokemonCuriosity } from "./PokemonCuriosity";


interface IProps {
  pokemon: SmallPokemon;
}

export const PokemonCard: FC<IProps> = ({ pokemon }) => {
  const [visible, setVisible] = useState(false)
  const [curiosidades, setCuriosidades] = useState([])
  const router = useRouter()

  const onClickImageHandler = () => {
    router.push(`/pokemon/${pokemon.name}`)
  }

  //const handler = () => {setVisible(true)}
  const closeHandler = () =>{setVisible(false)}

  //function onClickCuriosity(event: React.MouseEvent) {
  async function onClickCuriosity() {
    //event.preventDefault()    
    
    try {
      const response = await fetch("/api/iagenerate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pokemon: pokemon.name }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      let texto_cur = data.result
      // const exp_reg = /([a-z])(\d)/g
      
      // texto_cur = texto_cur.replace(exp_reg,'$1<<$2')
      // console.log('***************')
      texto_cur = texto_cur.slice(2)
      console.log(texto_cur)
      const lista_aux = texto_cur.split('\n')
      setCuriosidades(lista_aux)
      setVisible(true)  
    } catch(error: any) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <>
      <Grid xs={6} sm={3} md={2} xl={1} key={pokemon.id}>
        <Card
          isHoverable
          isPressable          
          >
          <Card.Body>
            <Card.Image src={pokemon.image} width="100%" height={140} onClick={onClickImageHandler}/>
          </Card.Body>
          <Card.Footer>
            <Row justify="space-between" align="center">
              {/* <Text>{pokemon.name}</Text> */}
              <PokemonCuriosity name={pokemon.name} onclickHandler={onClickCuriosity}/>
              <Text>#{pokemon.id}</Text>
            </Row>
          </Card.Footer>
        </Card>
      </Grid>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            {"Curiosidades:  "} 
            <Text b size={18}>
              {pokemon.name}
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          {
            curiosidades.map((item, index) => {
              return <Text key={index} color="warning">{item}</Text>

            })
          }
          
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="success" onPress={closeHandler}>
            Close
          </Button>          
        </Modal.Footer>
      </Modal>
    </>
  );
};
