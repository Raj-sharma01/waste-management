import React, { useState,useEffect } from 'react'
import Map from '../components/Map'
import ComplaintForm from '../components/ComplaintForm'
import axios from 'axios'

const Dashboard = () => {
  const [clickedLatLng, setClickedLatLng] = useState(null);
  console.log(clickedLatLng)
  return (
    <div >
      <h1 className='text-center text-4xl'>Dashboard</h1>
      <div className='lg:flex lg:justify-center'>
        <Map clickedLatLng={clickedLatLng} setClickedLatLng={setClickedLatLng} />
        {/* TODO: show the form only when logged in */}
        {clickedLatLng && <ComplaintForm clickedLatLng={clickedLatLng} setClickedLatLng={setClickedLatLng} />}
      </div>
    </div>
  )
}

export default Dashboard
