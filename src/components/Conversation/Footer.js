import React from 'react'
import { Box, Stack, IconButton, TextField, InputAdornment} from '@mui/material';
import {styled, useTheme} from '@mui/material/styles';
import { LinkSimple, PaperPlaneTilt, Smiley } from 'phosphor-react';

const Footer = () => {
    const theme = useTheme();
    const StyledInput = styled(TextField)(({theme})=>({
        "& .MuiInputBase-input": {
            paddingTop: "12px",
            paddingBottom: "12px"
        }
    }));
    return(<Box sx={{width:"100%",  backgroundColor: theme.palette.mode === "light" ? "#FBFAFF" : theme.palette.background.paper, boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)"}}>
                <Stack direction={"row"} alignItems={"center"}>
                    <StyledInput 
                        fullWidth 
                        placeholder='Write a message....'
                        variant='filled'
                        InputProps={{
                            startAdornment:(
                                <InputAdornment>
                                    <IconButton>
                                        <LinkSimple/>
                                    </IconButton>
                                </InputAdornment>
                            ),
                            endAdornment:(
                                <InputAdornment>
                                    <IconButton>
                                        <Smiley/>
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    ></StyledInput>
                    <Box sx={{
                                backgroundColor: theme.palette.primary.main, 
                                height: 48, 
                                width: 48, 
                                display:"flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 1
                            }}>
                        <IconButton>
                            <PaperPlaneTilt color='#fff'/>
                        </IconButton>
                    </Box>
                </Stack>
            </Box>)
}
export default Footer;