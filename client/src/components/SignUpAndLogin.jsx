import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const SignUpAndLogin = ({showLogin, setShowLogin}) => {
    const { register, handleSubmit } = useForm();
    const [isLogin, setIsLogin] = useState(true); // Initial state is login
    const navigate = useNavigate();
    const {setEmail, setId, setUsername} = useContext(UserContext)


    const handleFinish = async (data) => {
        try {
            const endpoint = isLogin ? 'login' : 'signup';
            const res = await axios.post(`api/auth/${endpoint}`, data);
            if (res.data.success) {
                alert(isLogin ? "Login Successfully!" : "Registered Successfully!");
                setShowLogin(false);
                axios.get('api/auth/profile').then(res=>{
                    if (res.data) {
                        console.log(res.data)
                        setId(res.data.userId);
                        setUsername(res.data.username);
                        setEmail(res.data.email)
                    }
                })
                navigate("/user"); 
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.log(error);
            alert("Something Went Wrong");
        }
    }

    const closeLoginForm=()=>{
        setShowLogin(false);
    }

    return (
        <>
            <section className="bg-gray-50 rounded-md">
                
                <div className="mx-auto flex flex-col items-center justify-center px-6 py-8">
                    <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
                        <div className='flex w-full p-4 flex-row-reverse'>
                        <button onClick={()=>closeLoginForm()}>X</button>
                        </div>
                        
                        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                {isLogin ? "Login" : "Create an Account"}
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(handleFinish)}>
                                {!isLogin && (
                                    <div>
                                        <label htmlFor="role" className="mb-2 block text-sm font-medium text-gray-900">Signup as a</label>
                                        <select className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
                                            {...register('role')}>
                                            <option value={"user"}>user</option>
                                            <option value={"admin"}>admin</option>
                                            <option value={"officer"}>traffic Officer</option>
                                        </select>
                                    </div>
                                )}
                                {!isLogin && (
                                    <div>
                                        <label htmlFor="username" className="mb-2 block text-sm font-medium text-gray-900">Your name</label>
                                        <input type="text" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm" placeholder="john Doe" {...register('username', { required: true })} />
                                    </div>
                                )}
                                <div>
                                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900">Your email</label>
                                    <input type="email" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm" placeholder="name@domain.com" {...register('email', { required: true })} />
                                </div>
                                <div>
                                    <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-900">Password</label>
                                    <input type="password" placeholder="•••••••" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm" {...register('password', { required: true })} />
                                </div>
                                <button type="submit" className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center bg-blue-600 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300">
                                    {isLogin ? "Login" : "Create an account"}
                                </button>
                                <p className="text-sm font-light text-gray-500">
                                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                                    <button className="ml-1 font-medium text-primary-600 hover:underline text-blue-600" onClick={() => setIsLogin(!isLogin)}>
                                        {isLogin ? "Signup here" : "Login here"}
                                    </button>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default SignUpAndLogin;
