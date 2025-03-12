"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react"
import { BACKEND_URL } from "../config";

export default function(){
    const [name,setName] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const router = useRouter();
    return <div>
        <div>
            <input type="text" placeholder="Enter name.." value={name} onChange={(e)=>setName(e.target.value)}/>
            <input type="text" placeholder="Enter username.." value={username} onChange={(e)=>setUsername(e.target.value)}/>
            <input type="text" placeholder="Enter password.." value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={async()=>{
                const res = await axios.post(`${BACKEND_URL}/user/signup`,{
                    name,
                    username,
                    password
                })
                if (res.data) {
                    console.log("Signup Successfull");
                    router.push("/home")
                }
            }}>Signup</button>
        </div>
    </div>
}