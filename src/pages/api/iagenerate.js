
import { Configuration, OpenAIApi } from 'openai'
import React from 'react'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration);

export default async function AIFunction (req, res) {
  
  /*controlamos que la apikey se encuentre configurada */
  if(!configuration.apiKey){
    console.log('Revisando Configuracion api')
    res.status(500).json({
        error: {
            message: "OpenAI API key no configurada",
          }
    })
    return
  }

  const pokemon = req.body.pokemon || ''
  if(pokemon.trim().length === 0){
    res.status(400).json({
        error: {
            message: "Ingrese un nombre de Pokemon valido",
          }
    })
    return
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(pokemon),
      temperature: 0.6,
      n: 1,
      max_tokens: 300
    });
    //console.log('>>>>',completion.data.choices);
    let resultText = ''
    for (const choice of completion.data.choices) {
        resultText += choice.text
    }
    //console.log('>>>>',resultText);
    res.status(200).json({ result: resultText });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(pokemon) {
    const capitalizedPokemon =
      pokemon[0].toUpperCase() + pokemon.slice(1).toLowerCase();
    return `Enumera tres
     curiosidades, cada una de 15 palabras como maxima longitud, sobre
      el pokemon llamado:  ${capitalizedPokemon}`;
  }