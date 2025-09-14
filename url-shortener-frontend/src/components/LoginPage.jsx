import React, { useState } from 'react';
import api from "../api/api";
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import TextField from './TextField';
import toast from 'react-hot-toast';
import { useStoreContext } from '../contextApi/ContextApi';

const LoginPage = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);

    const {setToken} = useStoreContext();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({ defaultValues: { username: "", email: "", password: "" }, mode: "onTouched" });

    const loginHandler = async (data) => {
        setLoader(true);
        try {
            const {data: response} = await api.post("/api/auth/public/login", data);
            console.log(response.token);
            setToken(response.token);
            localStorage.setItem("JWT_TOKEN", JSON.stringify(response.token));
            toast.success("LoggedIn Successfully! Lets shorten urls!");
            reset();
            navigate("/dashboard");
    
        } catch (error) {
            console.log(error);
            toast.error("LogIn failed. Please try again.");
        } finally {
            setLoader(false);
        }
    };
    return (
        <div className='min-h-[calc(100vh-64px)] flex justify-center items-center'>
            <form
                onSubmit={handleSubmit(loginHandler)}
                className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md"
            >
                <h1
                    className="text-center font-serif font-bold lg:text-3xl text-2xl 
                    bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
                >
                   Login Here!
                </h1>
                <hr className="mt-2 mb-5 border-t border-gray-500 opacity-50" />
                <div className='flex flex-col gap-3'>
                    <TextField
                        label="Username"
                        required
                        id="username"
                        message="*Username is required"
                        type="text"
                        placeholder="Enter your username"
                        register={register}
                        errors={errors}
                    />
                   
                    <TextField
                        label="Password"
                        required
                        id="password"
                        message="*Password is required"
                        type="password"
                        placeholder={"Enter your password"}
                        register={register}
                        minLength={6}
                        errors={errors}
                    />
                </div>
          
            <button
            disabled={loader}
            type='submit'
            className='bg-customRed font-semibold text-white  bg-custom-gradient w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3'>
                {loader ? "Loading..." : "Login"}
            </button>

            <p className='text-center text-sm text-slate-700 mt-6'>
          Don't have an account?
                <Link
                    className='font-semibold underline hover:text-black'
                    to="/register">
                        <span className='text-btnColor'> SingUp</span>
                </Link>
            </p>
                  </form>
        </div>
    )
}

export default LoginPage;   