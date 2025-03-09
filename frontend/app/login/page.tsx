"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react"
import { BACKEND_URL } from "../config";



export default function(){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const router = useRouter();

    return <div>
        <div>
            <input type="text" placeholder="Enter username.." value={username} onChange={(e)=>setUsername(e.target.value)}/>
            <input type="text" placeholder="Enter password.." value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={async()=>{
                const res = await axios.post(`${BACKEND_URL}/user/signin`,{
                    username,
                    password
                })
                if (res.data) {
                    console.log("Login Successfull");
                    router.push("/home")
                }
            }}>Login</button>
        </div>
    </div>
}