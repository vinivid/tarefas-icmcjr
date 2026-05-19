import { useState } from "react";

import { createPassword } from "@/src/types/User";

export default function usePasswordStr(initialPasswordStr : string) {
  const [passwordStr, setPasswordStr] = useState(initialPasswordStr);

  const password = createPassword(passwordStr);

  return {
    passwordStr,
    password,
    setPasswordStr
  }
}