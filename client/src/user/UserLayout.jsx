import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
function UserLayout() {
  return (
    <div>
      <Navbar />
      <div className='min-h-[90vh] flex flex-col'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default UserLayout
