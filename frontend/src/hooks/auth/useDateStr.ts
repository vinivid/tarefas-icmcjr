import { useState } from "react";

import { createBirthYear } from "@/src/types/User";

export default function useDateStr(initialDate : string) {
  const [dateStr, setDateStr] = useState(initialDate);
  
  const date = createBirthYear(dateStr);

  return {
    dateStr,
    date,
    setDateStr
  }
}