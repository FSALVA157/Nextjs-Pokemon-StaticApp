
import Head from 'next/head'
import React, { ReactElement } from 'react'
import { Navbar } from '../ui'

interface ILayoutProps{
  children: JSX.Element | JSX.Element[],
  titulo: string
}

export const Layout = ({children, titulo}: ILayoutProps) => {
  return (
    <>
       <Head>
         <title>{titulo || "Pokemon App"}</title>
         <meta name='author' content='Fernando Salva' />
         <meta name="description" content= {`Informacion sobre el pokemon ${titulo}`} />
         <meta name="keywords" content= {`pokemon, pokedex, ${titulo}`} />
       </Head>
       <Navbar></Navbar>
       <main style={{padding: '10px 20px'}}>
          {children}
       </main>
    </>
  )
}
