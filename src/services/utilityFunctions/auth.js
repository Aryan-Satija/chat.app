import { apiConnector } from "../apiConnector";
import { AUTH } from "../apis";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const login = async(body)=>{ 
    const id = toast.loading("Please Wait...");
    try{
        const response = await apiConnector("POST", AUTH.LOGIN_API, body);
        toast.update(id, { render: "login successfull", type: "success", isLoading: false});
        console.log(response);
        return response?.data;
    } catch(err){
        console.log(err);
        if(err?.response)
            toast.update(id, { render: `${err?.response?.data?.message}`, type: "error", autoClose:5000, isLoading: false});
        else
            toast.update(id, { render: "network issues", type: "error", autoClose: 5000, isLoading: false});
    }
}
export const register = async(body)=>{
    const register_util = async(body)=>{
        try{
            const response = await apiConnector("POST", AUTH.REGISTER_API, body);
            return response;
        } catch(err){
            console.log(err);
        }
    }
    await toast.promise(
        new Promise(async(resolve, reject)=>{
            const response = await register_util(body);
            if(response) resolve(1);
            else{
                const error = new Error("Something went wrong");
                reject(error);
            }
        }),{
            pending: "loading",
            success: "otp sent successfully",
            error: "something went wrong"
        }
    )
}
export const verifyOtp = async(otp)=>{
    const verifyOtpUtil = async(otp)=>{
        try{
            const response = await apiConnector("POST", AUTH.OTP_VERIFY_API)
        } catch(err){
            console.log(err);
        }
    }
}