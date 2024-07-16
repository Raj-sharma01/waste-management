import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const CreateOfficer = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            const res = await axios.post('/api/admin/createOfficer', data);
            console.log(res.data);
            alert("Officer created successfully"); // You can handle the form data submission here
            reset();
        } catch (error) {
            alert(error.response.data.message);
            console.log(error);
        } finally {
            reset();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-indigo-600 text-center">Create New Officer</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-1">Name:</label>
                        <input type="text" id="name" {...register('name', { required: true })} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
                        {errors.name && <p className="text-red-500 text-xs mt-1">Name is required</p>}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-1">Email:</label>
                        <input type="email" id="email" {...register('email', { required: true })} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
                        {errors.email && <p className="text-red-500 text-xs mt-1">Email is required</p>}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-1">Password:</label>
                        <input type="password" id="password" {...register('password', { required: true })} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
                        {errors.password && <p className="text-red-500 text-xs mt-1">Password is required</p>}
                    </div>
                    <div>
                        <button type="submit" className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 transition duration-300">Create Officer</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateOfficer;
