"use client";

import { useRouter } from "next/navigation";
import { AppBar } from "../Components/AppBar";
import { useEffect, useState } from "react";

export default function(){
    const router = useRouter()
    const [isLogin,setIsLogin] = useState(false);

    useEffect(()=>{
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) return setIsLogin(true) 
    },[])
    return <div>
        <AppBar/>
        <div className=" p-20">
            {isLogin && (
                <div className="flex justify-between">
                    <div className="border rounded-lg shadow-lg">
                        <div className="flex gap-3 pt-5 px-10">
                            <div className="py-2">
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-10">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                </button>
                            </div>
                                <div className="">
                                    <h1>akash</h1>
                                    <p>mobileNo</p>
                                </div>
                            </div>
                            <div className="py-20">
                                <div className="border py-3 ">
                                    <h1 className="">Orders</h1>
                                </div>
                                <div className="border py-3 ">
                                    Customer Support
                                </div>
                                <div className="border py-3 ">
                                    Manage Referrals
                                </div>
                                <div className="border py-3 ">
                                    Address
                                </div>
                                <div className="border py-3 ">
                                    Profile
                                </div>
                                <div className="border py-3 ">
                                    Wallet
                                </div>
                                <div className="py-14 px-36">
                                    <button onClick={()=>{
                                        localStorage.removeItem("token")
                                        localStorage.removeItem("userId")
                                        router.push("/home")
                                        window.location.reload();
                                    }}>
                                    Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    <div className=" w-full  bg-slate-200">
                    <div className="border bg-white px-10 w-ful ">
                            order history
                    </div>
                        <div>

                        </div>
                    </div>
                </div>
            )}
        </div>
        {!isLogin && (
            <div className="flex justify-center items-center h-[800px]">
                <button type="button" className="text-red-700 w-40 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={()=>{
                    router.push("/login")
                }}>Login</button>
            </div>
        )}
    </div>

}