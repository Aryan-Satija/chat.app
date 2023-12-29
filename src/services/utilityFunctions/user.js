import { apiConnector } from "../apiConnector";
import { USER } from "../apis";
import { toast } from "react-toastify";
export const FetchUsers = async(token)=>{
    try{
        const response = await apiConnector("POST", USER.FETCH_USERS_API, null, {Authorization: `Bearer ${token}`})
        console.log(response);
        return response?.data?.data;
    } catch(err){
        console.log(err);
    }
}
export const FetchFriendRequests = async(token)=>{
    try{
        const response = await apiConnector("POST", USER.FRIEND_REQUESTS_API, null, {Authorization: `Bearer ${token}`})
        return response?.data?.data;
    } catch(err){
        console.log(err);
    }
}
export const FetchFriends = async(token)=>{
    try{
        const response = await apiConnector("POST", USER.FETCH_FRIENDS_API, null, {Authorization: `Bearer ${token}`})
        console.log(response);
        return response?.data?.data;
    } catch(err){
        console.log(err);
    }
}

export const UpdateProfileInfo = async(body, token)=>{
    const id = toast.loading("Please Wait....");
    try{
        const response = await apiConnector("POST", USER.UPDATE_PROFILE_API, {client : body}, {
            Authorization:`Bearer ${token}` 
        })
        console.log(response);
        toast.update(id, {render: "profile info updated successfully", type: "success", autoClose: 5000, isLoading: false})
        return response?.data;
    } catch(err){
        console.log(err);
        if(err?.response)
            toast.update(id, { render: `${err?.response?.data?.message}`, type: "error", autoClose:5000, isLoading: false});
        else
            toast.update(id, { render: "network issues", type: "error", autoClose: 5000, isLoading: false});
    }
}
export const UpdateProfilePic = async(formdata, token)=>{
    const id = toast.loading("Profile Picture Uploading....");
    try{
        const response = await apiConnector("POST", USER.UPDATE_DISPLAY_PICTURE, formdata, 
                                                    {
                                                        "Content-Type": "multipart/form-data",
                                                        Authorization:`Bearer ${token}`
                                                    });
        toast.update(id, {render: "profile pic updated successfully", type: "success", autoClose: 5000, isLoading: false})
        return response?.data;
    } catch(err){
        console.log(err);
        if(err?.response)
            toast.update(id, { render: `${err?.response?.data?.message}`, type: "error", autoClose:5000, isLoading: false});
        else
            toast.update(id, { render: "network issues", type: "error", autoClose: 5000, isLoading: false});
    }
}