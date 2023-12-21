import React, {useEffect} from "react";
import { Outlet } from "react-router-dom";
import {Stack} from "@mui/material";
import  Sidebar  from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const DashboardLayout = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  useEffect(()=>{
    if(!isLoggedIn) navigate("/auth/login");
  }, [])
  return (
    <Stack direction="row">
      <Sidebar/>
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
