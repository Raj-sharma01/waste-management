import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

const FacilityForm = ({ onSubmit, formData, clickedLatLng, setClickedLatLng, setFormData, selectedMarker }) => {
    const { register, handleSubmit, reset, setValue } = useForm();
    const [address, setAddress] = useState('');

    const getAddress = async () => {
        try {
            const res = await fetch(`https://geocode.maps.co/reverse?lat=${clickedLatLng[0]}&lon=${clickedLatLng[1]}&api_key=6619f83957280357978706jdvad90bc`);
            const data = await res.json();
            setAddress(data.display_name);
        } catch (error) {
            console.error('Error fetching address:', error);
        }
    };

    useEffect(() => {
        setValue('address', address);
    }, [address]);

    useEffect(() => {
        if (clickedLatLng) {
            getAddress();
            setValue('latitude', clickedLatLng[0]);
            setValue('longitude', clickedLatLng[1]);
        }
    }, [clickedLatLng]);

    console.log("formData",formData)
    const onSubmitHandler = (data) => {
        console.log("data",data)
        // setFormData({
        //     type: data.type,
        //     latitude: data.latitude,
        //     longitude: data.longitude,
        //     address: data.address,
        //     capacity: data.capacity,
        //     status: data.status,
        // });
        
        // onSubmit(formData);
        const updatedFormData = {
            type: data.type,
            latitude: data.latitude,
            longitude: data.longitude,
            address: data.address,
            capacity: data.capacity,
            status: data.status,
        };
        
        setFormData(updatedFormData); 
        onSubmit(updatedFormData); 

        reset({
            type: '',
            latitude: 0,
            longitude: 0,
            address: '',
            capacity: 0,
            status: 'Active',
        }); // Reset the form after submission
    };

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
            <select {...register('type', { required: true })} defaultValue={formData.type} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500">
                <option value="">Select Type</option>
                <option value="Red Bin">Red Bin</option>
                <option value="Green Bin">Green Bin</option>
                <option value="Blue Bin">Blue Bin</option>
                <option value="Recycling Center">Recycling Center</option>
                <option value="Composting Facility">Composting Facility</option>
                <option value="Hazardous Waste Collection Point">Hazardous Waste Collection Point</option>
                <option value="Medical Waste Disposal Facility">Medical Waste Disposal Facility</option>
                <option value="Waste Transfer Station">Waste Transfer Station</option>
                <option value="Landfill Site">Landfill Site</option>
            </select>

            <input type="number" {...register('latitude', { required: true })} defaultValue={formData.latitude} placeholder="Latitude" readOnly className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500" value={clickedLatLng[0]} />

            <input type="number" {...register('longitude', { required: true })} defaultValue={formData.longitude} placeholder="Longitude" readOnly className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500" value={clickedLatLng[1]} />

            <input {...register('address', { required: true })} defaultValue={formData.address} placeholder="Address" className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500" />

            <input type="number" {...register('capacity', { required: true })} placeholder="Capacity in Kgs" className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500" />
            <select {...register('status', { required: true })} defaultValue={formData.status} className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
            </select>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Submit</button>
        </form>
    );
};

export default FacilityForm;
