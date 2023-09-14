import React from 'react'
import { Navbar } from './Layout/Navbar'
import Footer from './Layout/Footer'

export const Layout = ({children}) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
