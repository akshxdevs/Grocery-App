import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { cartState, totalAmountState } from "../recoil/atom";
import LoginModal from "./LoginComponent";

export const AppBar = () => {
    const router = useRouter();
    const [userId,setuserId] = useState<string|null>(null);
    const [showCartModel,setShowCartModel] = useState(false);
    const cart = useRecoilValue(cartState);
    const totalAmout = useRecoilValue(totalAmountState);  
    const [loginModel,setLoginModel] = useState(false);  
    const [login,setLogin] = useState(false);
    const [count,setcount] = useState(0);
    const showCartLength = cart.length
    useEffect(()=>{
        const storeUserId = localStorage.getItem("userId")
        if (storeUserId) {
            console.log(userId);
            setuserId(userId);
            setLogin(true);
        }
    },[])
    useEffect(() => {
        if (showCartModel) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'auto';
        }
      }, [showCartModel]);
    return <div className="fixed w-full">
        <div className="flex justify-between p-5 bg-white">
            <div className="px-2">
                <button className="text-4xl font-semibold" onClick={()=>{
                    router.push("/home")
                }}>zepto</button>
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
                        <button onClick={()=>{
                            login ? router.push("/user/?id:/"+userId) : setLoginModel(true)
                            }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        </button>
                    </div>
                    <div className="font-light text-base">
                        {login ? "Profile" :"Login"}
                    </div>
                    {loginModel && (
                    <LoginModal 
                        setLoginModel={setLoginModel} 
                    />
                    )}
                </div>
                <div className="flex flex-col items-center">
                    <div className="flex">
                        <div className="">
                            <div>
                                <button onClick={()=>{
                                    setShowCartModel(true);
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                    </svg>
                                </button>
                            </div>
                            <div className="font-light text-base">
                                Cart
                            </div>
                        </div>
                        <div >
                            {cart.length > 0 ? showCartLength : ""}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {showCartModel && (
        <div className="fixed inset-0 h-screen bg-black bg-opacity-30 backdrop-blur-sm z-40 flex justify-end">
          <div className="fixed top-0 right-0 h-screen w-1/4 bg-white shadow-xl overflow-y-auto">
            {cart.length > 0 ? (
              <div className="py-20 px-4 flex flex-col gap-3 ">
                <div className="border border-slate-300 rounded-lg shadow-lg">
                    <div className="p-3 flex">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <h1 className="font-semibold px-2">Delivery in 6 min</h1>
                    </div>
                    {cart.map((item, index) => (
                    <div key={index} className="p-5">
                            <div className="flex justify-between ">
                                <div className="flex ">
                                    <img className="w-10 h-10 object-cover rounded-lg " src={item.productImg} alt="productImg" />
                                </div>
                                <div>
                                    <h1 className="text-md py-2 ml-1 font-normal">{item.productName}</h1>
                                </div> 
                                <div className="flex py-2 border border-slate-300 rounded-lg ">
                                    <div>
                                        <button onClick={()=>setcount(count+1)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="px-2">
                                        {count}
                                    </div>
                                    <div>
                                        <button onClick={()=>setcount(count-1)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex">
                                    <h1 className="text-sm font-light py-2">₹{item.productPrice}</h1>
                                </div>
                         </div>
                    </div>
                    ))}
                    <div className="flex justify-between border py-3 px-5">
                            <div className="py-2 text-sm ">
                                <h1>Missed something?</h1>
                            </div>
                            <div className="border p-2 bg-black text-slate-100 font-semibold rounded-lg">
                                <button onClick={()=>{
                                    setShowCartModel(false);
                                    router.push("/home")
                                }}>+ Add More Items</button>
                            </div>
                    </div>
                </div>
                <div className="flex justify-between border border-slate-300 p-3 bg-yellow-100 rounded-lg shadow-sm">
                    <div className="flex px-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                        </svg>
                        <h1 className="px-2">View Coupons & Offers</h1>
                    </div>
                    <div >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between p-2">
                        <div className="py-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-base">To Pay</h1>
                            <p className="text-sm text-slate-400">Incl. All taxes and charges</p>
                        </div>
                        <div className="py-2">
                            <h1>₹{String(totalAmout)}</h1>
                        </div>
                        <div className="py-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="fixed bottom-2 right-9 w-1/5 bg-pink-600 rounded-xl">
                    <div className="flex justify-center text-center p-4  text-slate-100 font-bold">
                        <button className="text-sm" onClick={()=>{
                            router.push("/checkout")
                        }}>Click to pay</button>
                        <h1 className="text-sm px-1 font-semibold">₹{String(totalAmout)}</h1>
                    </div>
                </div>
              </div>
            ) : (
              <div className="text-center flex flex-col items-center justify-center h-full">
                {login ? (<p className="text-gray-500">No products</p>) : (
                    <div>
                        <p className="text-slate-700 font-semibold">To add products</p>
                        <button type="button" className="text-red-700 w-40 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={()=>{
                            router.push("/login")
                        }}>Login</button>
                    </div>
                ) }
              </div>
            )}
            <div className="absolute top-0 left-0 py-1 w-full border border-slate-300 shadow-md">
                <div className="flex gap-2">
                    <button
                    className=""
                    onClick={() => setShowCartModel(false)}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>

                    </button>
                    <h1 className="text-lg font-semibold">Cart</h1>
                </div>  
            </div>
          </div>
        </div>
      )}
    </div>
}