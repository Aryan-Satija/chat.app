import {
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
  Link,
  InputBase,
  Avatar,
  Badge
} from "@mui/material";
import { MagnifyingGlass, Phone } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { useTheme, styled, alpha } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { faker } from "@faker-js/faker";
const CallLogElement = ({id, img, name, msg, time, unread, pinned, online})=>{
  const theme = useTheme();
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
}));
  return (<Box>
      <Stack width="100%" direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
          {
            online ? (<StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                      >
                        <Avatar src={img} />
                      </StyledBadge>) : (<Avatar src={img}/>)
          }
          <Stack direction="column">
            <Typography sx={{fontSize: "0.9rem", fontWeight: 800}}>{name}</Typography>
          </Stack>
          <IconButton>
            <Phone color={theme.palette.chart.green[0]}/>
          </IconButton>
      </Stack>        
  </Box>)
}

const Call = () => {
  const SearchBar = styled("div")(({ theme }) => ({
    borderRadius: 20,
    backgroundColor: alpha(theme.palette.background.default, 1),
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(0),
    width: "100%",
    display: "flex",
    alignItem: "center",
    justifyContent: "space-between",
  }));
  const SearchIcon = styled("div")(({ theme }) => ({
    padding: theme.spacing(0.9, 1),
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));
  const Search = styled(InputBase)(({ theme }) => ({
    paddingLeft: `calc(0.6rem + ${theme.spacing(4)})`,
    width: "100%",
  }));

  const friends = useSelector((state)=>state.chat.chat)

  console.log(friends);
  
  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const theme = useTheme();
  return (
    <>
      <Stack direction="row" sx={{ width: "100%" }}>
        <Box
          sx={{
            overflowY: "scroll",

            height: "100vh",
            width: 340,
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,

            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Stack p={3} spacing={2} sx={{ height: "100vh" }}>
            <Stack
              alignItems={"center"}
              justifyContent="space-between"
              direction="row"
            >
              <Typography variant="h5">Call Log</Typography>
            </Stack>

            <Stack sx={{ width: "100%" }}>
              <SearchBar>
                <SearchIcon>
                  <MagnifyingGlass color="#709CE6"/>
                </SearchIcon>
                <Search  placeholder={"search...."}/>
              </SearchBar>
            </Stack>

            <Stack
              justifyContent={"space-between"}
              alignItems={"center"}
              direction={"row"}
            >
              <Typography variant="subtitle2" sx={{}} component={Link}>
                Start a conversation
              </Typography>
              <IconButton onClick={handleOpenDialog}>
                <Phone style={{ color: theme.palette.primary.main }} />
              </IconButton>
            </Stack>
            <Divider />
            <Stack sx={{ flexGrow: 1, overflowY: "auto", height: "100%" }}>
              <Stack spacing={2.4} >
                {friends.map((el, idx) => {
                  return <CallLogElement key={idx} {...el} />;
                })}
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
      {/* {openDialog && (
        <StartCall open={openDialog} handleClose={handleCloseDialog} />
      )} */}
    </>
  );
};

export default Call;
