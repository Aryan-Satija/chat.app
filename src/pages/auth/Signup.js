import React from 'react';
import { Divider, IconButton, Stack, TextField, Typography, Button } from '@mui/material';
import background from "../../assets/Images/background.jpg"
import { GoogleLogo, InstagramLogo, TwitterLogo } from 'phosphor-react';
import { useForm } from "react-hook-form";
import { register as signup} from '../../services/utilityFunctions/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserEmail } from '../../redux/slices/auth';
const Signup = () => {
    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch();
    const { handleSubmit, register, formState: { errors } } = useForm();
    const navigate  = useNavigate();
    const submitHandler = async(data) => {
        setLoading(true);
        const response = await signup(data);
        console.log(response);
        setLoading(false);
        if(response){
            
            dispatch(setUserEmail(data.email));
            navigate("/auth/verify-otp")
        }
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)} style={{ width: "100%", height: "100vh" }}>
            <Stack width={"100%"} height={"100%"} minWidth={"320px"} alignItems={"center"} justifyContent={"center"} sx={{ background: `url(${background})`, backgroundSize: "cover", color: "#F4F6F8" }}>
                <Stack width={0.4} minWidth={"320px"} spacing={2} direction={"column"} alignItems={"center"} sx={{ color: "white", backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "20px", borderRadius: "10px", backdropFilter: "blur(5px)" }}>
                    <Typography variant='h4'>Sign Up</Typography>
                    <Stack direction="row" spacing={2} width={"100%"} justifyContent={"space-between"}>
                        <Stack width={"100%"}>
                            <TextField label="First name" type="text" variant='filled' sx={{ width: "100%", '& input': { color: "#F4F6F8" } }} {...register("firstName", {required: "*required"})}/>
                            {
                                errors.firstName && (
                                    <Typography color="error" variant='body2'>{errors.firstName.message}</Typography>
                                )
                            }
                        </Stack>
                        <Stack width={"100%"}>
                            <TextField label="Last name" type="text" variant='filled' sx={{ width: "100%", '& input': { color: "#F4F6F8" } }} {...register("lastName", {required: "*required"})}/>
                            {
                                errors.lastName && (
                                    <Typography color="error" variant='body2'>{errors.lastName.message}</Typography>
                                )
                            }
                        </Stack>
                    </Stack>
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

                    <Button sx={{ width: "100%" }} type="submit" variant="contained" disabled={loading}>SIGN UP</Button>
                    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} sx={{ width: "100%" }}>
                        <Divider sx={{ width: '42%', color: '#F4F6F8' }} />
                        <Typography>OR</Typography>
                        <Divider sx={{ width: '42%', color: '#F4F6F8' }} />
                    </Stack>
                    <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} spacing={2}>
                        <IconButton>
                            <GoogleLogo />
                        </IconButton>
                        <IconButton>
                            <InstagramLogo />
                        </IconButton>
                        <IconButton>
                            <TwitterLogo />
                        </IconButton>
                    </Stack>
                </Stack>
            </Stack>
        </form>
    );
};

export default Signup;