import { apiConnector } from "../apiConnector";
import { USER } from "../apis";

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