import React, { useState } from 'react';
import api from "../api/api";
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import TextField from './TextField';
import toast from 'react-hot-toast';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({ defaultValues: { username: "", email: "", password: "" }, mode: "onTouched" });
    const registerHandler = async (data) => {
        setLoader(true);
        try {
            const response = await api.post("/api/auth/public/register", data);
         reset();
            navigate("/login");
            toast.success("Registered Successfully! Please login.");
        } catch (error) {
            console.log(error);
            navigate("/error");
        } finally {
            setLoader(false);
        }
    };
    return (
        <div className='min-h-[calc(100vh-64px)] flex justify-center items-center'>
            <form
                onSubmit={handleSubmit(registerHandler)}
                className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md"
            >
                <h1
                    className="text-center font-serif font-bold lg:text-3xl text-2xl 
                    bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
                >
                     Hey! Register Here.
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
                        label="Email"
                        required
                        id="email"
                        message="*Email is required"
                        type="text"
                        placeholder={"Enter your email"}
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
                {loader ? "Loading..." : "Register"}
            </button>

            <p className='text-center text-sm text-slate-700 mt-6'>
                Already have an account? 
                <Link
                    className='font-semibold underline hover:text-black'
                    to="/login">
                        <span className='text-btnColor'> Login</span>
                </Link>
            </p>
                  </form>
        </div>
    )
}

export default RegisterPage
