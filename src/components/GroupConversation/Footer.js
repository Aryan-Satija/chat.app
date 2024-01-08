import {
    Box,
    Fab,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Tooltip,
  } from "@mui/material";
  import {
    Camera,
    File,
    Image,
    LinkSimple,
    PaperPlaneTilt,
    Smiley,
    Sticker,
    User,
  } from "phosphor-react";
  import { useTheme, styled } from "@mui/material/styles";
  import React, { useRef, useState } from "react";
  
  import data from "@emoji-mart/data";
  import Picker from "@emoji-mart/react";
  import { socket } from "../../socket";
  import { useSelector } from "react-redux";
  
  const StyledInput = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-input": {
      paddingTop: "12px !important",
      paddingBottom: "12px !important",
    },
  }));
  
  const Actions = [
    {
      color: "#4da5fe",
      icon: <Image size={24} />,
      y: 102,
      title: "Photo/Video",
    },
    {
      color: "#1b8cfe",
      icon: <Sticker size={24} />,
      y: 172,
      title: "Stickers",
    },
    {
      color: "#0172e4",
      icon: <Camera size={24} />,
      y: 242,
      title: "Image",
    },
    {
      color: "#0159b2",
      icon: <File size={24} />,
      y: 312,
      title: "Document",
    },
    {
      color: "#013f7f",
      icon: <User size={24} />,
      y: 382,
      title: "Contact",
    },
  ];
  
  const ChatInput = ({
    openPicker,
    setOpenPicker,
    setValue,
    value,
    inputRef,
  }) => {
    const [openActions, setOpenActions] = useState(false);

    return (
      <StyledInput
        inputRef={inputRef}
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        fullWidth
        placeholder="Write a message..."
        variant="filled"
        InputProps={{
          startAdornment: (
            <Stack sx={{ width: "max-content" }}>
              <Stack
                sx={{
                  position: "relative",
                  display: openActions ? "inline-block" : "none",
                }}
              >
                {Actions.map((el) => (
                  <Tooltip placement="right" title={el.title}>
                    <Fab
                      onClick={() => {
                        setOpenActions(!openActions);
                      }}
                      sx={{
                        position: "absolute",
                        top: -el.y,
                        backgroundColor: el.color,
                      }}
                      aria-label="add"
                    >
                      {el.icon}
                    </Fab>
                  </Tooltip>
                ))}
              </Stack>
  
              <InputAdornment>
                <IconButton
                  onClick={() => {
                    setOpenActions(!openActions);
                  }}
                >
                  <LinkSimple />
                </IconButton>
              </InputAdornment>
            </Stack>
          ),
          endAdornment: (
            <Stack sx={{ position: "relative" }}>
              <InputAdornment>
                <IconButton
                  onClick={() => {
                    setOpenPicker(!openPicker);
                  }}
                >
                  <Smiley />
                </IconButton>
              </InputAdornment>
            </Stack>
          ),
        }}
      />
    );
  };
  
  function linkify(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(
      urlRegex,
      (url) => `<a href="${url}" target="_blank">${url}</a>`
    );
  }
  
  function containsUrl(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return urlRegex.test(text);
  }
  
const Footer = () => {
    const theme = useTheme();
    const { sidebar } = useSelector((state) => state.app);
    const [openPicker, setOpenPicker] = useState(false);
    const [value, setValue] = useState("");
    const inputRef = useRef(null);
    const group_room_id = useSelector((state)=>{
      return state.app.sidebar.group_room_id
    })
    const user_id = useSelector((state)=>state.auth.userInfo._id);
    const groupChats = useSelector((state)=>state.chat.groupChats);
    // let to = chat.find((el)=>{
    //   return (room_id == el.id);
    // });
    // to = to?.to_user_id;
    function handleEmojiClick(emoji) {
      const input = inputRef.current;
      if (input) {
        const selectionStart = input.selectionStart;
        const selectionEnd = input.selectionEnd;
        setValue(
          value.substring(0, selectionStart) +
            emoji +
            value.substring(selectionEnd)
        );
        input.selectionStart = input.selectionEnd = selectionStart + 1;
      }
    }
  
    return (
      <Box
        sx={{
          position: "relative",
          backgroundColor: "transparent !important",
        }}
      >
        <Box
          width={"100%"}
          sx={{
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Stack direction="row" alignItems={"center"}>
            <Stack sx={{ width: "100%" }}>
              <Box
                style={{
                  zIndex: 10,
                  position: "fixed",
                  display: openPicker ? "inline" : "none",
                  bottom: 81,
                  right: sidebar.open ? 420 : 100,
                }}
              >
                <Picker
                  theme={theme.palette.mode}
                  data={data}
                  onEmojiSelect={(emoji) => {
                    handleEmojiClick(emoji.native);
                  }}
                />
              </Box>
              <ChatInput
                inputRef={inputRef}
                value={value}
                setValue={setValue}
                openPicker={openPicker}
                setOpenPicker={setOpenPicker}
              />
            </Stack>
            <Box
              sx={{
                height: 48,
                width: 48,
                backgroundColor: theme.palette.primary.main,
                borderRadius: 1.5,
              }}
            >
              <Stack
                sx={{ height: "100%" }}
                alignItems={"center"}
                justifyContent="center"
              >
                <IconButton
                  onClick={() => {
                    // socket.emit("text_message", {
                    //   message: value,
                    //   conversation_id: room_id,
                    //   from: user_id,
                    //   to,
                    //   type: containsUrl(value) ? "link" : "text",
                    // });
                    setValue("");
                  }}
                >
                  <PaperPlaneTilt color="#ffffff" />
                </IconButton>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Box>
    );
};
  
export default Footer;