import { KeyboardType } from "react-native";

import { UserInputError } from "@/src/types/User";
import { Result } from "@/src/types/Result";
import LineInput from "@/src/components/LineInput";

export interface UserFieldInputProps<T> {
  label: string;
  fieldStr: string;
  fieldRes: Result<T, UserInputError>;
  keyboardType?: KeyboardType;
  secureTextEntry?: boolean;
  placeholder?: string;
  maxLenght?: number;
  setFieldStr: (v : string) => void;
  errorMsg: (err : UserInputError) => string;
  editable?: boolean;
}

/**
 * Este componente é um input de informação 
 * de usuário genérico.
 * 
 * @param label a label do input.
 * 
 * @param fieldStr a str do campo de input. Ex
 * nomeDeUsuario, senha, email etc.
 * 
 * @param fieldRes o result advindo de tentar 
 * criar o tipo T apartir da fieldStr.
 * 
 * @param keyboardtype tipo de teclado quando para
 * entrada. "numeric" para númerico e não colocar
 * para o teclado padrão.
 * 
 * @param secureTextEntry indica se o input deve
 * estar no modo de senha.
 * 
 * @param placeholder texto de placeholder
 * 
 * @param maxLenght número máximo de caracteres a serem inseridos
 *  
 * @param setFieldStr o hook relacionado ao campo
 * de input. Ex: useUsernameStr
 * 
 * @param errorMsg função que dado um UserInputError
 * gera a string que explica o erro de input para o
 * usuário
 * 
 * @param editable indica se o input é editavel ou
 * não
 */
export default function UserFieldInput<T>({
  label,
  fieldStr,
  fieldRes,
  keyboardType,
  secureTextEntry,
  placeholder,
  maxLenght,
  setFieldStr,
  errorMsg,
  editable
} : UserFieldInputProps<T> ) {
  
  return (
    <>
    {fieldRes.ok ? (
      <LineInput
        label={label}
        value={fieldStr}
        onChangeText={setFieldStr}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        onClosePress={() => setFieldStr('')}
        editable={editable}
      />
    ) : (
      <LineInput
        label={label}
        value={fieldStr}
        onChangeText={setFieldStr}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        maxLenght={maxLenght}
        error={
          !( 
          (fieldRes.error === UserInputError.Empty)
          || ((fieldRes.error === UserInputError.Minlen) && fieldStr === '')
          )
        }
        errorValue={errorMsg(fieldRes.error)}
        onClosePress={() => setFieldStr('')}
        editable={editable}
      />
    )}
    </>
  )
}