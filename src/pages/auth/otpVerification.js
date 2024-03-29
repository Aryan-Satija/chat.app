import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { Divider, Stack, Button, Typography } from '@mui/material';
import background from "../../assets/Images/background.jpg"
import { useSelector } from 'react-redux';
import { verifyOtp } from '../../services/utilityFunctions/auth';
import { useNavigate } from 'react-router-dom';
const OtpVerification = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const userEmail = useSelector(state => state.auth.userInfo.email)
    const submitHandler = async(event)=>{
        event.preventDefault();
        console.log(otp);
        const otpNumber = parseInt(otp);
        const body = {
            email: userEmail,
            supplied_otp: otpNumber
        }
        const response = await verifyOtp(body);
        if(response){
            navigate("/auth/login");
        }
        // console.log(otpNumber);
    }
    return (<form onSubmit={submitHandler} style={{ width: "100%", height: "100%" }}>
            <Stack width={"100%"} height={"100%"} alignItems={"center"} justifyContent={"center"} sx={{ background: `url(${background})`, backgroundSize: "cover", color: "#F4F6F8" }}>
                <Stack width={0.4} minWidth={"320px"} spacing={2} direction={"column"} alignItems={"center"} sx={{ color: "white", backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "20px", borderRadius: "10px", backdropFilter: "blur(5px)" }}>
                    <Typography variant="h4">OTP VERIFICATION</Typography>
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        inputStyle={{width: "40px", aspectRatio:"1/1", color: "#fff", backgroundColor: "rgba(0,0,0,0.2)", borderRadius:"5px", outline:"none"}}
                        numInputs={6}
                        renderSeparator={<span>-</span>}
                        renderInput={(props) => <input {...props} />}
                    />
                    <Button sx={{ width: "100%" }} type="submit" variant="contained">VERIFY</Button>
                </Stack>
            </Stack>
        </form>)
}
export default OtpVerification