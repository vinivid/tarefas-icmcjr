import { UserInputError } from "@/src/types/User";

export function usernameErrorMsg(err : UserInputError) {
  if (err === UserInputError.Empty) 
    return "É necessário ter pelo menos um caracter";

  if (err === UserInputError.InvalidChars)
    return "Não são permitidos caracteres especiais";

  if (err === UserInputError.Maxlen ) 
    return "O tamanho máximo são 15 caracteres";

  return "Erro impossível";
}

export function dateErrorMsg(err : UserInputError) {
  if (err === UserInputError.Empty) 
    return "É necessário preencher a data";

  if (err === UserInputError.InvalidInput)
    return "Data inválida";

  return "Erro impossível";
}

export function emailErrorMsg(err : UserInputError) {
  if (err === UserInputError.Empty)
    return "É necessário preencher o email";

  if (err === UserInputError.Maxlen)
    return "O número máximo de carcteres é 256";

  if (err === UserInputError.InvalidChars)
    return "Não é permitido o uso de carateres especiais";

  if (err === UserInputError.InvalidInput)
    return "Email inválido";

  return "Erro impossivel";
}

export function cpfErrorMsg(err : UserInputError) {
  if (err === UserInputError.Maxlen || err === UserInputError.Minlen)
    return "O cpf tem exatamente 11 digitos";

  if (err === UserInputError.InvalidInput)
    return "Cpf inválido";

  return "Erro impossível";
}

export function passwordErrorMsg(err : UserInputError) {
  if (err === UserInputError.Minlen)
    return "É necessário no minímo 8 caracteres";

  if (err === UserInputError.Empty)
    return "É necessário ter no minímo 8 caracteres que não são somente espaço";

  if (err === UserInputError.InvalidChars)
    return "Não é permitido o uso de carateres especiais";

  if (err === UserInputError.Maxlen)
    return "O tamanho máximo é de 64 caracteres";

  if (err === UserInputError.TrailingSpace)
    return "Não permitido espaços no final da senha";
  
  return "Erro impossivl";
}