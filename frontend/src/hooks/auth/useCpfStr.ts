import { useState } from "react";

import { createCpf } from "@/src/types/User";

export default function useCpfStr(initialCpfStr : string) {
  const [cpfStr, setCpfStr] = useState(initialCpfStr);

  const cpf = createCpf(cpfStr);

  return {
    cpfStr,
    cpf,
    setCpfStr
  }
}