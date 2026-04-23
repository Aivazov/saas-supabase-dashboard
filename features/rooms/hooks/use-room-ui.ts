// hooks/use-room-ui.ts

import { useState } from "react";

export const useRoomUI = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");

  return {
    taskTitle,
    setTaskTitle,
    inviteEmail,
    setInviteEmail,
  };
};