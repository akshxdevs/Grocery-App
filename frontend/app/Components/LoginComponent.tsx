import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface Props {
    setLoginModel: Dispatch<SetStateAction<boolean>>;
}

export default function LoginModal({ setLoginModel }: Props) {
    const [phoneNo,setPhoneNo] = useState();
    const [otp,setOtp] = useState();
    const [otpModel,setOtpModel] = useState(false);
    const modelRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    useEffect(()=>{
        document.body.style.overflow = "hidden";
        console.log(phoneNo);
        return () => {
            document.body.style.overflow = "auto"
        }
    },[])

    useEffect(()=>{
        const handleOutsideClick = (e:MouseEvent) => {
            if (modelRef.current && !modelRef.current.contains(e.target as Node)) {
                setLoginModel(false)
            }
        };
        window.addEventListener("mousedown",handleOutsideClick);
        return () => window.removeEventListener("mousedown",handleOutsideClick);
    },[])

    return <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" >
        <div ref={modelRef} className="bg-white rounded-lg shodow-lg py-10 px-20">
            {otpModel ? (
                <div>
                    <h1 className="text-4xl font-bold">OTP Verification</h1>
                    <h2 className="text-2xl font-semi-bold py-5 w-56">OTP has sent to +91 {phoneNo}</h2>
                    <div className=" flex gap-2 w-96 p-3 border border-slate-400 rounded-3xl shadow-lg">
                        <input type="text" placeholder="Enter OTP number" className="outline-none" value={otp} onChange={(e:any)=>setOtp(e.target.value)}/>
                    </div>
                    <div className="p-4 bg-pink-500 my-5 text-center rounded-3xl ">
                        <button onClick={async()=>{
                            try {
                            const res = await axios.post(`${BACKEND_URL}/user/verify-otp`,{
                                mobileNo:phoneNo,
                                otp:otp
                            })
                            if (res.data) {
                                console.log("OTP Verification Successfully");
                                toast.success("✅ User Login Sucessfull!");
                                router.push("/home")
                                localStorage.setItem("userId",res.data.user.id);
                                localStorage.setItem("token",res.data.token);
                                localStorage.setItem("mobileNo",res.data.user.mobileNo);
                                localStorage.setItem("name",res.data.user.name);
                                setLoginModel(false);
                                window.location.reload();
                            }
                        } catch (error) {
                            console.error(error);
                            toast.error("SOmething went wrong!!")
                        }
                        }}>Continue</button>
                    </div>
                </div>
            ):(
                <div>
                    <h1 className="text-4xl font-bold">Login</h1>
                    <h2 className="text-2xl font-semi-bold py-5 w-56">Groceries delivered in 10 minutes</h2>
                    <div className=" flex gap-3 w-96 p-3 border border-slate-400 rounded-3xl shadow-lg">
                        <p>+91</p>
                        <input type="text" placeholder="Enter Phone Number" className="outline-none" value={phoneNo} onChange={(e:any)=>setPhoneNo(e.target.value)}/>
                    </div>
                    <div className="p-4 bg-pink-500 my-5 text-center rounded-3xl ">
                        <button onClick={async()=>{
                        try {
                            const res = await axios.post(`${BACKEND_URL}/user/login/phone`,{
                                mobileNo:phoneNo
                            })
                            if (res.data) {
                                console.log("OTP generated");
                                toast.success("✅ OTP sent successfully to your mobile number!")
                                setOtpModel(true)
                            }
                        } catch (error) {
                            console.error(error);
                            toast.error("SOmething went wrong!!")
                        }
                        }}>Continue</button>
                    </div>
                    <div className="text-center py-3">
                        <p className="text-slate-400">By continuing, you agree to our</p>
                        <p className="font-bold">Terms of Service &Privacy Policy</p>
                </div>
            </div>
            )}
            
        </div>
        
    </div>
}