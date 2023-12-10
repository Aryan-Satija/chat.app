import React from "react";
import Chats from "./Chats";
import Conversation from "../../components/Conversation/index.js";
import { Stack } from "@mui/material";
const GeneralApp = () => {
  return (
    <Stack direction="row">
      <Chats/>
      <Conversation/>
    </Stack>
  );
};

export default GeneralApp;
