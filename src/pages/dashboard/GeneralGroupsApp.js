import React from "react";
import Groups from "./Groups";
import { Stack } from "@mui/material";
import GroupConversation from "../../components/GroupConversation/index.js";
const GeneralGroupsApp = () => {
  return (
    <Stack direction="row">
      <Groups/>
      <GroupConversation/>
    </Stack>
  );
};

export default GeneralGroupsApp;
