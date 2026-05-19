import { useState } from "react";

import { createUsername } from "@/src/types/User";

export default function useUsernameStr(initialUsernameStr : string) {
  const [usernameStr, setUsernameStr] = useState(initialUsernameStr);

  const username = createUsername(usernameStr);

  return {
    usernameStr,
    username,
    setUsernameStr
  }
}