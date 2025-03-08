"use client";
import { useRecoilValue } from "recoil"
import { cartState } from "../recoil/atom"


export default function () {
    const cart = useRecoilValue(cartState)
    console.log(cart);
    
    return <div className="">
        {cart.map((item,index)=>(
            <div key={index} className="border border-slate-300 shadow-lg rounded-lg">
                 <div className="boder border-black p-5">
                    <img className="bg-fit bg-cover" src={item.productImg} alt="productImg" />
                    <h1 className="text-lg font-bold p-2">{item.productName}</h1>
                    <h1 className="text-sm font-light px-2 pb-2">₹{item.productPrice}</h1>
                </div>
            </div>
        ))}
        <div className="text-center p-2 border border-red-400 text-red-400 font-bold">
            <button>Checkout</button>   
        </div>                                     
    </div>
}