import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const AppBar = () => {
    const router = useRouter();
    const [userId,setuserId] = useState<string|null>(null);
    useEffect(()=>{
        setuserId(localStorage.getItem("userId"));
    },[])
    return <div className="flex justify-between p-5 ">
        <div className="px-2">
            <h1 className="text-4xl font-semibold">zepto</h1>
        </div>
        <div className="flex gap-1 py-2 pl-5">
            <div className="">
                <h1 className="text-sm font-normal">Select Location</h1>
            </div>
            <div className="flex">
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </button>
            </div>
        </div>
        <div className="pl-10 w-full">
            <input type="text" placeholder="Search for chocolate box" className="w-full border border-slate-100 shadow-lg rounded-lg p-3" />
        </div>
        <div className="flex gap-6 px-10">
            <div className="flex flex-col items-center">
                <div className="">
                    <button onClick={()=>router.push("/login")}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </button>
                </div>
                <div className="font-light text-base">
                    Login
                </div>
                
            </div>
            <div className="flex flex-col items-center">
                <div>
                    <button onClick={()=>router.push("/cart/?userId:/"+userId)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                    </button>
                </div>
                <div className="font-light text-base">
                    Cart
                </div>  
            </div>
        </div>
    </div>
}