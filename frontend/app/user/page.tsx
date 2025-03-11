"use client";

import { useRouter } from "next/navigation";
import { AppBar } from "../Components/AppBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";

export default function(){
    const router = useRouter()
    const [isLogin,setIsLogin] = useState(false);
    const [userId,setuserId] = useState<string|null>(null);
    const [token,setToken] = useState<string|null>(null);
    const [profileName,setProfileName] = useState<string|null>(null);
    const [mobileNo,setMobileNo] = useState<string|null>(null)
    const [orders,setorder] = useState<any[]>([]);
    const [totalPrice,setTotalPrice] = useState<number>();
    const [showOrderHistory,setShowOrderHistory] = useState(true)
    const [showAddress,setShowAddress] = useState(false)
    const [showUserProfile,setShowUserProfile] = useState(false)
    const [name,setName] = useState("");
    const [username,setUsername] = useState("");
    const getAllorders = async() => {
        try {
            const res = await axios.get(`${BACKEND_URL}/order/getorders/${userId}`,{
                headers:{
                    authorization:token
                }
            })
            if (res.data) {
                const data = res.data
                console.log("orders fetched",data);
                setorder(data.getAllOrders);
                console.log(totalPrice);                
                const summary = data.getAllOrders.flatMap((orders:any)=>orders.products).reduce((total:any,product:any)=> total+product.productPrice,0);
                setTotalPrice(summary);
            }
        } catch (error) {
            console.error("❌ Something went wrong", error);   
        }
    }
    useEffect(()=>{
        const storedUserId = localStorage.getItem("userId");
        const storedToken = localStorage.getItem("token");
        const storedMobileNo = localStorage.getItem("mobileNo");
        const storedName = localStorage.getItem("name");
    
        if (storedUserId && storedMobileNo) {
            setMobileNo(storedMobileNo);
            setuserId(storedUserId);
            setIsLogin(true) ;
        }
        if (storedName) setProfileName(storedName) 
        if (storedToken) setToken(storedToken);
    },[])
    useEffect(()=>{
        if (userId && token) getAllorders()
    },[userId,token])
    return <div>
        <AppBar/>
        <div className=" p-32">
            {isLogin && (
                <div className="flex justify-between">
                    <div className="border rounded-lg shadow-lg w-96">
                        <div className="flex gap-3 pt-5 px-10 ">
                            <div className="py-2">
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-10">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                </button>
                            </div>
                                <div className="">
                                    <h1>{profileName}</h1>
                                    <p>{mobileNo}</p>
                                </div>
                            </div>
                            <div className="py-10">
                                <div className={`flex px-10 gap-5 py-3 border rounded-lg transition-transform duration-150 active:scale-95 ${showOrderHistory ? 'bg-green-600 text-white' : 'text-black'}`}>
                                    <button onClick={()=>{
                                        setShowUserProfile(false)
                                        setShowAddress(false)
                                        setShowOrderHistory((prev)=>!prev)
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                        </svg>
                                    </button>
                                    <h1 className="">Orders</h1>
                                </div>
                                <div className="flex px-10 gap-5 py-3 border ">
                                    <button>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                                        </svg>
                                    </button>
                                    Customer Support
                                </div>
                                <div className="flex px-10 gap-5 py-3 border  ">
                                    <button>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                        </svg>
                                    </button>
                                    Manage Referrals
                                </div>
                                <div className={`flex px-10 gap-5 py-3 border rounded-lg transition-transform duration-150 active:scale-95 ${showAddress ? 'bg-green-600 text-white' : 'text-black'}`}>
                                    <button onClick={()=>{
                                        setShowUserProfile(false)
                                        setShowOrderHistory(false)
                                        setShowAddress((prev)=>!prev)
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                        </svg>
                                    </button>
                                    Address
                                </div>
                                <div className={`flex px-10 gap-5 py-3 border rounded-lg transition-transform duration-150 active:scale-95 ${showUserProfile ? 'bg-green-600 text-white' : 'text-black' }`}>
                                    <button onClick={()=>{
                                        setShowAddress(false);
                                        setShowOrderHistory(false);
                                        setShowUserProfile((prev)=>!prev);
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                    </button>
                                    Profile
                                </div>
                                <div className="flex px-10 gap-5 py-3 border  ">
                                    <button>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
                                        </svg>      
                                    </button>
                                    Wallet
                                </div>
                                <div className="flex w-full justify-center items-center h-40">
                                    <button onClick={()=>{
                                        localStorage.removeItem("token")
                                        localStorage.removeItem("userId")
                                        router.push("/home");
                                    }}>
                                    Log Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    <div className="w-full  bg-slate-200 border">
                        <div className="flex flex-row">
                            <div className="bg-white w-full py-4 px-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                </svg>
                            </div>
                            <div className="bg-white w-full py-4 flex-none">
                                    Orders
                            </div>
                        </div>
                        {showOrderHistory && (
                            <div className="flex justify-center items-center p-10 w-full">
                            <div className="w-full">
                                    {orders.length > 0 ? (
                                    orders.map((order,index)=>(
                                        <div key={index} className="mb-10 border border-slate-300 w-full bg-white rounded-2xl shadow-lg">
                                            <div className="flex px-5">
                                                {order.products?.map((product:any,index:any)=>(
                                                    <div key={index} className="p-3">
                                                        <div className="p-1 border rounded-lg">
                                                            <img src={product.productImg} alt="" className="w-20 h-20  object-cover rounded-lg"/>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <p className="font-bold px-10">Order {order.orderStatus}✅</p>
                                            <p className="font-light text-slate-400 px-10">#{order.id}</p>
                                            <div className="flex justify-between pr-10">
                                                <div>
                                                    <p className="font-light text-slate-400 px-10">{order.orderPlacedOn}</p>
                                                </div>
                                                <div className="font-bold">
                                                    ₹{order.totalPrice}
                                                </div>
                                            </div>
                                            <div className="w-full p-5 border font-bold text-center">
                                                <button className="">Rate your order</button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex justify-center items-center h-screen">
                                        <p>No orders found.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        )}
                        <div>
                            {showAddress && (
                                <div className="bg-white">
                                    <div className="flex justify-between p-10 border border-y">
                                        <div className="font-bold">
                                            <h1 className="">All Saved Address</h1>
                                        </div>
                                        <div className="bg-pink-600 text-white border p-2 rounded-lg shadow-sm">
                                            <button className="">
                                                Add New Address
                                            </button>
                                        </div> 
                                    </div>
                                </div>
                            )}
                        </div>
                        <div>
                            {showUserProfile && (
                                <div className="px-10 border w-full bg-white">
                                        <div className="">
                                            <h1 className="text-slate-500 p-3">Name*</h1>
                                            <input type="text" placeholder={`${name}`} className="p-3 w-full border border-slate-400 rounded-lg" onChange={(e)=>setName(e.target.value)}/>
                                        </div>
                                        <div className="">
                                            <h1 className="text-slate-500 p-3">Email Address*</h1>
                                            <input type="text" placeholder="-" className="p-3 w-full border border-slate-400 rounded-lg" onChange={(e)=>setUsername(e.target.value)}/>
                                        </div>
                                        <p className="text-slate-400">We promise not to spam you</p>
                                        <div className="flex flex-row-reverse">
                                            <div className="bg-pink-500 text-white m-10 w-40 p-3 rounded-lg shadow-sm text-center">
                                                <button onClick={async()=>{
                                                    try {
                                                        const res = await axios.put(`${BACKEND_URL}/user/update/${userId}`,{
                                                            name:name,
                                                            username:username
                                                        });
                                                        if (res.data) {
                                                            toast.success("User Successfully Updated!!");
                                                        }
                                                    } catch (error) {
                                                        console.error(error);
                                                        toast.error("Something went wrong!!");
                                                    }
                                                }}>Submit</button>
                                            </div>
                                        </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
        {!isLogin && (
            <div className="flex justify-center items-center h-[200px]">
                <button type="button" className="text-red-700 w-40 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={()=>{
                    router.push("/login")
                }}>Login</button>
            </div>
        )}
    </div>

}