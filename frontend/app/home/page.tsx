"use client"
import { useEffect, useState } from "react";
import { AppBar } from "../Components/AppBar";
import { Card } from "../Components/Card";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";

export default function(){
    const [products,setProducts] = useState<any[]>([]);
    const getAllproducts = async() => {
        try {
            const res = await axios.get(`${BACKEND_URL}/product/getallproducts`,)
            setProducts(res.data.getAllProducts);  
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getAllproducts()
    },[])
    return <div>
        <AppBar/>
        <Card/>
        <div>
            <h1 className="py-10 px-40 text-lg font-semibold">Products</h1>
            <div className="px-60">
                {products.length > 0 ? (
                    <div className="grid grid-cols-4 gap-10">
                        {products.map((product,index)=>(
                            <div key={index} className="border border-slate-300 shadow-lg rounded-lg">
                                <img className="bg-fit bg-cover" src={product.productImg} alt="productImg" />
                                    <h1 className="text-lg font-bold p-2">{product.productName}</h1>
                                    <h1 className="text-sm font-light px-2">₹{product.productPrice}</h1>
                                    <h1>{product.stockStatus}</h1>
                                    <div className="text-center p-2 border border-red-400 text-red-400 font-bold">
                                        <button>Add to cart</button>
                                    </div>
                            </div>
                        ))}
                    </div>
                ):(
                    <div className="flex flex-row justify-center items-center">
                        <h1>No products</h1>
                    </div>
                )}
            </div>
        </div>
    </div>
}