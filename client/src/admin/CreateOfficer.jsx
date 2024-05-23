import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const CreateOfficer = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        console.log(data)
        // alert('creating officer')
        try {
            console.log()
            const res = await axios.post('/api/admin/createOfficer', data)
            console.log(res.data); 
            alert("officer created sucessfully")// You can handle the form data submission here
            reset();
        } catch (error) {
            alert(error.response.data.message)
            console.log(error)
        } finally {
            reset()
        }

    };

    return (
        <div className="max-w-md mx-auto w-full bg-white shadow-xl rounded-lg p-8 px-8 pt-6 pb-8 mb-4 mt-4">
            <h2 className="text-center text-3xl font-bold text-indigo-600 mb-6">Create New Officer</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">Name:</label>
                    <input type="text" id="name" {...register('name', { required: true })} className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ease-in-out transform hover:scale-105" />
                    {errors.name && <p className="text-red-500 text-xs italic mt-2">Name is required</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">Email:</label>
                    <input type="email" id="email" {...register('email', { required: true })} className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ease-in-out transform hover:scale-105" />
                    {errors.email && <p className="text-red-500 text-xs italic mt-2">Email is required</p>}
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">Password:</label>
                    <input type="password" id="password" {...register('password', { required: true })} className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ease-in-out transform hover:scale-105" />
                    {errors.password && <p className="text-red-500 text-xs italic mt-2">Password is required</p>}
                </div>
                <div className="flex items-center justify-between">
                    <button type="submit" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-200 ease-in-out transform hover:scale-105">
                        Create Officer
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateOfficer;

//import React from 'react';
//import { useForm } from 'react-hook-form';
// import axios from 'axios';

// const CreateOfficer = () => {
//     const { register, handleSubmit, formState: { errors }, reset } = useForm();

//     const onSubmit = async (data) => {
//         console.log(data)
//         // alert('creating officer')
//         try {
//             const res = await axios.post('/api/admin/createOfficer', data)
//             console.log(res.data); // You can handle the form data submission here
//         } catch (error) {
//            alert(error.response.data.message)
//            console.log(error)
//         }finally{
//             reset()
//         }
//     };

//     return (
//         <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 mt-4">
//             <h2 className="text-center text-3xl font-bold text-indigo-600 mb-6">Create New Officer</h2>
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">Name:</label>
//                     <input type="text" id="name" {...register('name', { required: true })} className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ease-in-out transform hover:scale-105" />
//                     {errors.name && <p className="text-red-500 text-xs italic mt-2">Name is required</p>}
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">Email:</label>
//                     <input type="email" id="email" {...register('email', { required: true })} className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ease-in-out transform hover:scale-105" />
//                     {errors.email && <p className="text-red-500 text-xs italic mt-2">Email is required</p>}
//                 </div>
//                 <div className="mb-6">
//                     <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">Password:</label>
//                     <input type="password" id="password" {...register('password', { required: true })} className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ease-in-out transform hover:scale-105" />
//                     {errors.password && <p className="text-red-500 text-xs italic mt-2">Password is required</p>}
//                 </div>
//                 <div className="flex items-center justify-between">
//                     <button type="submit" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out transform hover:scale-105">
//                         Create Officer
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default CreateOfficer;

// import React from 'react';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';

// const CreateOfficer = () => {
//     const { register, handleSubmit, formState: { errors }, reset } = useForm();

//     const onSubmit = async (data) => {
//         console.log(data);
//         try {
//             const res = await axios.post('/api/admin/createOfficer', data);
//             console.log(res.data); // You can handle the form data submission here
//         } catch (error) {
//             alert(error.response.data.message);
//             console.log(error);
//         } finally {
//             reset();
//         }
//     };

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
//             <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8">
//                 <h2 className="text-center text-4xl font-bold text-indigo-600 mb-6">Create New Officer</h2>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">Name:</label>
//                         <input type="text" id="name" {...register('name', { required: true })} className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ease-in-out transform hover:scale-105" />
//                         {errors.name && <p className="text-red-500 text-xs italic mt-2">Name is required</p>}
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">Email:</label>
//                         <input type="email" id="email" {...register('email', { required: true })} className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ease-in-out transform hover:scale-105" />
//                         {errors.email && <p className="text-red-500 text-xs italic mt-2">Email is required</p>}
//                     </div>
//                     <div className="mb-6">
//                         <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">Password:</label>
//                         <input type="password" id="password" {...register('password', { required: true })} className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ease-in-out transform hover:scale-105" />
//                         {errors.password && <p className="text-red-500 text-xs italic mt-2">Password is required</p>}
//                     </div>
//                     <div className="flex items-center justify-between">
//                         <button type="submit" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-200 ease-in-out transform hover:scale-105">
//                             Create Officer
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default CreateOfficer;

// import React from 'react';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';

// const CreateOfficer = () => {
//     const { register, handleSubmit, formState: { errors }, reset } = useForm();

//     const onSubmit = async (data) => {
//         console.log(data);
//         try {
//             const res = await axios.post('/api/admin/createOfficer', data);
//             console.log(res.data); // You can handle the form data submission here
//         } catch (error) {
//             alert(error.response.data.message);
//             console.log(error);
//         } finally {
//             reset();
//         }
//     };

//     return (
//         <div className="flex items-center justify-center min-h-[calc(100%)] bg-gray-100">
//             <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8">
//                 <h2 className="text-center text-4xl font-bold text-indigo-600 mb-6">Create New Officer</h2>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">Name:</label>
//                         <input type="text" id="name" {...register('name', { required: true })} className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ease-in-out transform hover:scale-105" />
//                         {errors.name && <p className="text-red-500 text-xs italic mt-2">Name is required</p>}
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">Email:</label>
//                         <input type="email" id="email" {...register('email', { required: true })} className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ease-in-out transform hover:scale-105" />
//                         {errors.email && <p className="text-red-500 text-xs italic mt-2">Email is required</p>}
//                     </div>
//                     <div className="mb-6">
//                         <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">Password:</label>
//                         <input type="password" id="password" {...register('password', { required: true })} className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ease-in-out transform hover:scale-105" />
//                         {errors.password && <p className="text-red-500 text-xs italic mt-2">Password is required</p>}
//                     </div>
//                     <div className="flex items-center justify-between">
//                         <button type="submit" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-200 ease-in-out transform hover:scale-105">
//                             Create Officer
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default CreateOfficer;

