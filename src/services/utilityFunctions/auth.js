import { apiConnector } from "../apiConnector";
import { AUTH } from "../apis";
import { toast } from 'react-toastify';
export const login = async(body)=>{
    const login_util = async(body)=>{
        try{
            const response = await apiConnector("POST", AUTH.LOGIN_API, body);
            return response;
        } catch(err){
            console.log(err);
            return err;
        }
    }
    await toast.promise(
        new Promise(async()=>{
            if(await login_util(body)) resolve(1);
            else{
                const error = new Error("Something went wrong");
                reject(error);
            }
        }),
        {
            pending: "loading",
            success: "login successfull",
            error: "something went wrong"
        }
    )
}