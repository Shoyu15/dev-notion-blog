import React from 'react'
import { ReactNode } from "react";
import { Header } from './Layout/Header'
import Footer from './Layout/Footer'

interface Props {
  children: ReactNode;
}


export const Layout = ({children}: Props) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
