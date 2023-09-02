import React from 'react'
import { Navbar } from './Layout/Navbar'

export const Layout = ({children}) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}
