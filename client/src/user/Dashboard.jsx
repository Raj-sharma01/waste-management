import React, { useState } from 'react'
import Map from '../components/Map'
import ComplaintForm from '../components/ComplaintForm'

const Dashboard = () => {
  const [clickedLatLng, setClickedLatLng] = useState(null);
  const [markers, setMarkers] = useState([
    { geocode: [22.772580915494466, 86.14583730697633], popUp: "This is a marker with id = 1" },
    { geocode: [22.776359713987354, 86.14598751068115], popUp: "This is a marker with id = 2" },
    { geocode: [22.775162881688356, 86.1437237262726], popUp: "This is a marker with id = 3" },
  ])
  return (
    <div >
      <h1 className='text-center text-4xl'>Dashboard</h1>
      <div className='lg:flex lg:justify-center'>
        <Map clickedLatLng={clickedLatLng} setClickedLatLng={setClickedLatLng} markers={markers} />
        {/* TODO: show the form only when logged in */}
        {clickedLatLng && <ComplaintForm clickedLatLng={clickedLatLng} setClickedLatLng={setClickedLatLng} />}
      </div>
    </div>
  )
}

export default Dashboard
