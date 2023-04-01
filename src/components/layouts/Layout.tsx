
import Head from 'next/head'
import React, { ReactElement } from 'react'
import { Navbar } from '../ui'

interface ILayoutProps{
  children: JSX.Element | JSX.Element[],
  titulo: string
}

const origin = (typeof window == "undefined")? '' : window.location.origin


export const Layout = ({children, titulo}: ILayoutProps) => {
  return (
    <>
       <Head>
         <title>{titulo || "Pokemon App"}</title>
         <meta name='author' content='Fernando Salva' />
         <meta name="description" content= {`Informacion sobre el pokemon ${titulo}`} />
         <meta name="keywords" content= {`pokemon, pokedex, ${titulo}`} />

         <meta property="og:title" content={titulo || "Pokemon App"} />
         <meta property="og:description" content={`Informacion sobre el pokemon ${titulo}`}/>
         <meta property="og:image" content={`${origin}/banner.png`} />
       </Head>
       <Navbar></Navbar>
       <main style={{padding: '10px 20px'}}>
          {children}
       </main>
    </>
  )
}
