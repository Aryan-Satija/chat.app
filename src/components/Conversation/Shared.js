import React, {useState} from 'react'
import { Box, IconButton, Stack, Tabs, Tab, Grid } from '@mui/material';
import { ArrowLeft } from 'phosphor-react';
import { useDispatch } from 'react-redux';
import { updateSidebarType } from '../../redux/slices/app';
import { faker } from '@faker-js/faker';
import { Shared_Links } from '../../data';
import { Hyperlink } from './ChatElement';
import logo from "../../assets/Images/ChatAppLogo.png"
const Shared = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState(0);
  return (
    <Stack height={"100vh"} direction={"column"} alignItems={"center"}>
        <Stack height={92} width={"100%"} padding={2} sx={{borderBottom: "1px solid rgba(120, 120, 120, 0.4)"}} alignSelf={"start"} direction={"row"} alignItems={"center"}>
            <IconButton onClick={()=>{
                dispatch(updateSidebarType({type: "CONTACT"}));
            }}>
                <ArrowLeft/>
            </IconButton>
        </Stack>
        <Stack padding={2}>
            <Tabs value={value} onChange={(event, newValue)=>{
                setValue(newValue);
            }}>
                <Tab label="Media"/>
                <Tab label="Links"/>
                <Tab label="Docs"/>
            </Tabs>
        </Stack>
        {
            (()=>{
                switch(value){
                    case 0:
                        return  (<Stack>
                                    <Grid container spacing={2} padding={2}>
                                        {
                                            [0, 1, 2, 3, 4, 5, 6].map((el)=>{
                                                return (<Grid item xs={4}>
                                                    <img alt={faker.name.fullName()} src={faker.image.city()} style={{borderRadius:"2px", cursor: "pointer"}}/>
                                                </Grid>)
                                            })
                                        }
                                    </Grid>
                                </Stack>)
                    
                    case 1:
                        return (<Box sx={{flexGrow:1, overflowY: "auto"}}>
                            {
                                Shared_Links.map((link)=>{
                                    link.preview = logo;
                                    return (<Stack direction={"column"} alignItems={"center"} padding={2}>
                                        <Hyperlink {...link}/>
                                    </Stack>)
                                })
                            }
                        </Box>)
                }
            })()
        }
    </Stack>
  )
}

export default Shared;