import { apiConnector } from "../apiConnector";
import { AUTH } from "../apis";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const login = async(body)=>{ 
    const id = toast.loading("Please Wait...");
    try{
        const response = await apiConnector("POST", AUTH.LOGIN_API, body);
        toast.update(id, { render: "login successfull", type: "success", autoClose: 5000, isLoading: false});
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
    const id = toast.loading("Please Wait...");
    try{
        const response = await apiConnector("POST", AUTH.REGISTER_API, body);
        toast.update(id, { render: "otp sent successfully", type: "success", autoClose: 5000, isLoading: false});
        return response;
    } catch(err){
        console.log(err);
        if(err?.response)
            toast.update(id, { render: `${err?.response?.data?.error}`, type: "error", autoClose:5000, isLoading: false});
        else
            toast.update(id, { render: "network issues", type: "error", autoClose: 5000, isLoading: false});
    }
}
export const verifyOtp = async(body)=>{
    const id = toast.loading("Please Wait...");
    try{
        const response = await apiConnector("POST", AUTH.OTP_VERIFY_API, body);
        toast.update(id, { render: "otp matched", type: "success", autoClose: 5000, isLoading: false});
        return response;
    } catch(err){
        if(err?.response)
            toast.update(id, { render: `${err?.response?.data?.message}`, type: "error", autoClose:5000, isLoading: false});
        else
            toast.update(id, { render: "network issues", type: "error", autoClose: 5000, isLoading: false});
    }
}