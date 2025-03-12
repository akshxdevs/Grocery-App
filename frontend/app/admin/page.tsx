"use client";
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useEffect, useState } from "react"
import { toast } from "react-toastify";

export default function (){
    const [username,setUsername] = useState();
    const [password,setPassword] = useState();
    const [isLogin,setIsLogin] = useState(false);
    const [adminId,setAdminId] = useState<string|null>(null);
    const [adminName,setAdminName] = useState<string|null>(null);
    const [adminToken,setAdminToken] = useState<string|null>(null);
    const [products,setProducts] = useState<any[]>([])
    const getAllproducts = async() => {
        const res = await axios.get(`${BACKEND_URL}/product/getallproducts/${adminId}`,{
            headers:{
                authorization:adminToken
            }
        })
        if (res.data) {
            setProducts(res.data.getAllProducts);
            console.log(products.length);
            
        }
    } 
    useEffect(()=>{
        const storedAdminId = localStorage.getItem("adminId");
        const storedAdminName = localStorage.getItem("adminName");
        const storedAdminToken = localStorage.getItem("adminToken");        
        if (storedAdminId) setAdminId(storedAdminId);
        if (storedAdminName) setAdminName(storedAdminName);
        if (storedAdminToken) setAdminToken(storedAdminToken);
        if (storedAdminId && storedAdminName) {
            setIsLogin(true)
        }
    },[])
    useEffect(()=>{
        if (adminToken && adminId) {
            getAllproducts();
        }
    },[adminToken,adminId])
    return <div className="">
    {isLogin ? (
        <div>
            <div className="flex flex-col justify-center items-center h-screen py-52 px-32">
                <div className="flex justify-between border w-full h-full">
                    <div className=" w-96">
                        <div className="flex justify-center items-center gap-24 py-3">
                            <h1>Admin Dashboard</h1>
                            <button className="">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            </button> 
                        </div>
                        <div className="flex flex-col p-4 justify-center items-center">
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-11">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </button>
                            <h1 className="text-sm font-light">{adminName}</h1>
                        </div>
                        <div className="py-10">
                            <div className="p-2 border-l border">
                                home
                            </div>
                            <div className="p-2 border-l border">
                                Products
                            </div>
                            <div className="p-2 border-l border">
                                Users
                            </div>
                            <div className="p-2 border-l border">
                                Orders
                            </div>
                            <div className="p-2 border-l border">
                                Account
                            </div>
                        </div>
                    </div>
                    <div className="border w-full">
                        <div className="p-16 border bg-slate-100">
                            Welcome back, {adminName}😎
                        </div>
                        <div className="absolute top-[295px]">
                            <div className="flex py-10 px-20 gap-20">
                                <div className="border rounded-xl p-3 w-44 bg-black text-white">
                                    <h1 className="">Products</h1>
                                    <div className="flex px-3">
                                        <button className="py-2 px-7">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                            </svg>
                                        </button>
                                        <p className="py-2 px-3">{products.length ?? "0"}</p>
                                    </div>
                                </div>
                                <div className="border rounded-xl p-3 w-44 bg-black text-white">
                                    <h1 className="">Users</h1>
                                    <div className="flex px-3">
                                        <button className="py-2 px-7">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                            </svg>
                                        </button>
                                        <p className="py-2 px-3">{"0"}</p>
                                    </div>
                                </div>
                                <div className="border rounded-xl p-3 w-44 bg-black text-white">
                                    <h1 className="">Orders</h1>
                                    <div className="flex px-3">
                                        <button className="py-2 px-7">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                            </svg>
                                        </button>
                                        <p className="py-2 px-3">{"0"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ): (
        <div>
            <div className="flex flex-col justify-center items-center h-screen">
                <div className="border p-32">
                    <div className="">
                        <h1 className="py-5 text-3xl font-bold text-center">Admin Login</h1>
                        <div className="flex flex-col">
                            <input type="text" placeholder="Enter admin username.." className="border p-3 rounded-lg shadow-sm border-pink-400 my-3" onChange={(e:any)=>{setUsername(e.target.value)}}/>
                            <input type="password" placeholder="Enter admin password.." className="border p-3 rounded-lg shadow-sm border-pink-400 my-3" onChange={(e:any)=>{setPassword(e.target.value)}}/>
                        </div>
                        <div className="border p-3 rounded-lg shadow-sm text-center bg-pink-400 text-white font-bold my-3">
                            <button onClick={async()=>{
                                try {
                                    const res = await axios.post(`${BACKEND_URL}/admin/signin`,{
                                        username,
                                        password
                                    });
                                    if (res.data) {
                                        toast.success("Admin Login Successfull!!")
                                        localStorage.setItem("adminId",res.data.admin.id);
                                        localStorage.setItem("adminName",res.data.admin.companyName);
                                        localStorage.setItem("adminToken",res.data.token);
                                    }
            
                                } catch (error) {
                                    console.error(error);
                                    toast.error("Something went wrong!")                            
                                }
                            }}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )}    

    </div>
}