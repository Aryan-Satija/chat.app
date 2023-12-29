const BASE_URL = process.env.REACT_APP_BASE_URL;

export const AUTH = {
    LOGIN_API: BASE_URL + "/auth/login",
    REGISTER_API: BASE_URL + "/auth/signup",
    OTP_VERIFY_API: BASE_URL + "/auth/verifyOtp" 
}

export const USER = {
    UPDATE_PROFILE_API: BASE_URL + "/user/update-profile",
    UPDATE_DISPLAY_PICTURE: BASE_URL + "/user/update-pfp",
    FETCH_USERS_API: BASE_URL + "/user/get-users",
    FRIEND_REQUESTS_API: BASE_URL + "/user/get-friend-requests",
    FETCH_FRIENDS_API: BASE_URL + "/user/get-friends"
}