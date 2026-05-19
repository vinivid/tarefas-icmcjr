import { useState } from "react";

import { createEmail } from "@/src/types/User";

export default function useEmailStr(initialEmailStr : string) {
  const [emailStr, setEmailStr] = useState(initialEmailStr);

  const email = createEmail(emailStr);

  return {
    emailStr,
    email,
    setEmailStr
  }
}