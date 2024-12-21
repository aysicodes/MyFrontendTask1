import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '../../pages/HomePage'

const NewPage = () => {
    return <>test1lets</>
}
export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/new',
    element: <NewPage/>
  }
])