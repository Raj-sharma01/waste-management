import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const ComplaintForm = ({ clickedLatLng, setClickedLatLng }) => {
  const { register, handleSubmit, setValue } = useForm();
  const [address, setAddress] = useState("");

  setValue('address',address)
  const getAddress=async()=>{
    const res=await fetch(`https://geocode.maps.co/reverse?lat=${clickedLatLng[0]}&lon=${clickedLatLng[1]}&api_key=6619f83957280357978706jdvad90bc`)
    const data=await res.json();
    console.log(data.display_name)
    setAddress(data.display_name)
  }

  useEffect(() => {
    getAddress(clickedLatLng)
  }, [clickedLatLng])

  const onSubmit = async (data) => {
    try {
      const complaintData = {
        ...data,
        latitude: clickedLatLng[0],
        longitude: clickedLatLng[1],
      };
      console.log(complaintData);
      const res = await axios.post('api/user/complaint', complaintData);
      //   if(res.data.success){
      console.log(res.data)
      //TODO: add a notifier
      alert('Complaint submitted successfully!'); // Optional feedback
      setClickedLatLng(null)

    } catch (error) {
      console.error(`error while submiting complaint ${error}`)
    }

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4 p-3 lg:pr-3 lg:pl-0 ">
      <label htmlFor="complaint" className="text-gray-700 font-medium">
        Complaint/Request:
      </label>
      <textarea
        {...register('complaint', { required: true })}
        id="complaint"
        rows="5"
        className="rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex items-center text-xs">
        <span className="text-gray-700 mr-1">Location:</span>
        <span className="text-blue-500 font-bold">
          {clickedLatLng.length === 2
            ? `Latitude: ${clickedLatLng[0]}, Longitude: ${clickedLatLng[1]}`
            : 'Click to set'}
        </span>
      </div>
      {/* <div> */}
        <textarea
          {...register('address', { required: true })}
          id="address"
          rows="3"
          className="rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 "

        />
      {/* </div> */}
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
        Submit Complaint
      </button>
    </form>
  );
};

export default ComplaintForm;
