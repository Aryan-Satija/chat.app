import { apiConnector } from "../apiConnector";
import { USER } from "../apis";

export const fetchUsers = async(token)=>{
    const fetchUsersUtil = async(token)=>{
        try{
            const response = await apiConnector("POST", USER.FETCH_USERS_API, null, {"Content-Type": "application/json", Authorization: `Bearer ${token}`})
            return response;
        } catch(err){
            console.log(err);
        }
    }
    toast.promise(new Promise(async(resolve, reject)=>{
            const response = await fetchUsersUtil(token);
            if(response) resolve(1);
            else{
                const error = new Error("Something went wrong");
                reject(error);
            }
    }), {
        pending: "loading", 
        success: "task successfull",
        error: "something went wrong" 
    })
}
export const fetchFriendRequests = async(token)=>{
    const fetchFriendRequestsUtil = async(token)=>{
        try{
            const response = await apiConnector("POST", USER.FRIEND_REQUESTS_API, null, {"Content-Type": "application/json", Authorization: `Bearer ${token}`})
            return response;
        } catch(err){
            console.log(err);
        }
    }
    toast.promise(new Promise(async(resolve, reject)=>{
            const response = await fetchFriendRequestsUtil(token);
            if(response) resolve(1);
            else{
                const error = new Error("Something went wrong");
                reject(error);
            }
    }), {
        pending: "loading", 
        success: "task successfull",
        error: "something went wrong" 
    })
}
export const fetchFriends = async(token)=>{
    const fetchFriendsUtil = async(token)=>{
        try{
            const response = await apiConnector("POST", USER.FETCH_FRIENDS_API, null, {"Content-Type": "application/json", Authorization: `Bearer ${token}`})
            return response;
        } catch(err){
            console.log(err);
        }
    }
    toast.promise(new Promise(async(resolve, reject)=>{
            const response = await fetchFriendsUtil(token);
            if(response) resolve(1);
            else{
                const error = new Error("Something went wrong");
                reject(error);
            }
    }), {
        pending: "loading", 
        success: "task successfull",
        error: "something went wrong" 
    })
}