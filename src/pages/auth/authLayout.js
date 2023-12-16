import React from 'react'
import { Box, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
const AuthLayout = () => {
  return (
    <Box sx={{width:"100vw", height: "100vh"}}>
        <Outlet/>
    </Box>
  )
}
export default AuthLayout;