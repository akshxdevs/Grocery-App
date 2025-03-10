"use client"
import { useRecoilValue } from "recoil"
import { cartState, totalAmountState } from "../recoil/atom"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function () {
    const totalAmount = useRecoilValue(totalAmountState);
    const [userId,setuserId] = useState<string|null>(null);
    const [token,setToken] = useState<string|null>(null);
    const cart = useRecoilValue(cartState);
    const productIds = cart.map((ids)=>ids.productId);
    useEffect(()=>{
        const storeUserId = localStorage.getItem("userId");
        const storeToken = localStorage.getItem("token");
        if(userId) return setuserId(storeUserId);
        if(token) return setuserId(storeToken);
    },[])
    const handlepayment = async() => {
        try {
            const res = await axios.post(`${BACKEND_URL}/order/place-order/${userId}`,{
                userId:userId,
                productId:productIds,
            },{headers:{
                authorization:token
            }})
            if (res.data) {
                console.log("order placed");
                toast.success("✅ Order Placed Successfully!!")
            }
        } catch (error) {
            console.error("❌ Something went wrong", error);   
        }
    }
    return <div className="p-56">
        <div className="">
            <div className="flex w-full gap-28 border text-white border-white bg-purple-800  p-5">
                <div>
                    Order Summary
                </div>
                <div>
                    Amount
                </div>
                <div>
                    |
                </div>
                <div>
                    {totalAmount}
                </div>
            </div>
            <div className="flex justify-between">
                <div className="w-56 border py-2">
                    <div className=" ">
                        UPI
                    </div>
                    <div className="border">
                        Plxee
                    </div>
                    <div className=" border">
                        Credit / Debit Card
                    </div>
                    <div className=" border">
                        Paylater
                    </div>
                    <div className=" border">
                        Wallets
                    </div>
                    <div className=" border">
                        netbanking
                    </div>
                    <div className=" ">
                        Pay On Delivery
                    </div>
                </div>
                <div className="w-full p-10 border">
                    <div className="border-b py-3">
                        Enter Credit/Debit Card Details
                    </div>
                    <div>
                        <div className="py-2">
                            <div className="">
                                <div className="relative">
                                <input type="text" id="example13" placeholder=" " className="peer p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" />
                                <label form="example13" className="peer-focus:base absolute left-2 top-0 z-10 -translate-y-2 transform bg-white px-1 text-xs text-gray-500 transition-all peer-placeholder-shown:translate-y-3 peer-placeholder-shown:text-sm peer-focus:-translate-y-2 peer-focus:text-xs peer-disabled:bg-transparent">Card Number</label>
                                </div>
                            </div>
                        </div>
                        <div className="flex py-5">
                            <div className="">
                                <div className="">
                                    <div className="relative">
                                    <input type="text" id="example13" placeholder=" " className="peer p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" />
                                    <label form="example13" className="peer-focus:base absolute left-2 top-0 z-10 -translate-y-2 transform bg-white px-1 text-xs text-gray-500 transition-all peer-placeholder-shown:translate-y-3 peer-placeholder-shown:text-sm peer-focus:-translate-y-2 peer-focus:text-xs peer-disabled:bg-transparent">MM/YY</label>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <div className="">
                                    <div className="relative">
                                    <input type="text" id="example13" placeholder=" " className="peer p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" />
                                    <label form="example13" className="peer-focus:base absolute left-2 top-0 z-10 -translate-y-2 transform bg-white px-1 text-xs text-gray-500 transition-all peer-placeholder-shown:translate-y-3 peer-placeholder-shown:text-sm peer-focus:-translate-y-2 peer-focus:text-xs peer-disabled:bg-transparent">CVV</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <button type="button" className="w-full rounded-lg border border-red-500 bg-red-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-red-700 hover:bg-red-700 focus:ring focus:ring-red-200 disabled:cursor-not-allowed disabled:border-red-300 disabled:bg-red-300" onClick={handlepayment}>Proceed to Pay</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}