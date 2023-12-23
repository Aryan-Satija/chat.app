import React, {useState} from 'react';
import { Divider, IconButton, Stack, TextField, Typography, Button } from '@mui/material';
import background from "../../assets/Images/background.jpg"
import { GoogleLogo, InstagramLogo, TwitterLogo } from 'phosphor-react';
import { useForm } from "react-hook-form";
import {login} from "../../services/utilityFunctions/auth.js";
import { useDispatch } from 'react-redux';
import { login as sliceLogin } from '../../redux/slices/auth.js';
import { useNavigate } from 'react-router-dom';
import { setUserInfo } from '../../redux/slices/auth.js';
const Login = () => {
    const navigate  = useNavigate();
    const [loading, setLoading] = useState(false);
    const { handleSubmit, register, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    
    const submitHandler = async (data) => {
        setLoading(true);
        const info = await login(data);
        if(info){
            dispatch(sliceLogin(info?.token));
            dispatch(setUserInfo(info?.user));
            navigate("/app");
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)} style={{ width: "100%", height: "100%" }}>
            <Stack width={"100%"} height={"100%"} alignItems={"center"} justifyContent={"center"} sx={{ background: `url(${background})`, backgroundSize: "cover", color: "#F4F6F8" }}>
                <Stack width={0.4} minWidth={"320px"} spacing={2} direction={"column"} alignItems={"center"} sx={{ color: "white", backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "20px", borderRadius: "10px", backdropFilter: "blur(5px)" }}>
                    <Typography variant='h4'>Login</Typography>
                    <Stack width={"100%"}>
                        <TextField
                            label="Email"
                            type="email"
                            sx={{ width: "100%", '& input': { color: "#F4F6F8" } }}
                            variant='filled'
                            {...register("email", {
                                required: "*required",
                            })}
                        />
                        {errors.email && (
                            <Typography color="error" variant='body2'>{errors.email.message}</Typography>
                        )}
                    </Stack>
                    <Stack width={"100%"}> 

                        <TextField
                            label="Password"
                            type="password"
                            sx={{ width: "100%", '& input': { color: "#F4F6F8" } }}
                            variant='filled'
                            {...register("password", {
                                required: "*required"
                            })}
                        />
                        {errors.password && (
                            <Typography color="error" variant='body2'>{errors.password.message}</Typography>
                        )}
                    </Stack>
                    <Button sx={{ width: "100%" }} type="submit" variant="contained" disabled={loading}>LOG IN</Button>
                    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} sx={{ width: "100%" }}>
                        <Divider sx={{ width: '42%', color: '#F4F6F8' }} />
                        <Typography>OR</Typography>
                        <Divider sx={{ width: '42%', color: '#F4F6F8' }} />
                    </Stack>
                    <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} spacing={2}>
                        <IconButton>
                            <GoogleLogo/>
                        </IconButton>
                        <IconButton>
                            <InstagramLogo/>
                        </IconButton>
                        <IconButton>
                            <TwitterLogo/>
                        </IconButton>
                    </Stack>
                </Stack>
            </Stack>
        </form>
    );
};

export default Login;
