/// Component para os inputs de uma linha 
/// como nome de usuário, senha, titulo de 
/// tarefa e etc.

import { useState } from "react"
import { TextInput, StyleSheet, View, Text, Pressable, KeyboardType } from "react-native"

import { Colors } from "@/src/constants/theme"

import { MaterialCommunityIcons } from "@expo/vector-icons"; 

interface LineInputProps {
  value: string;
  label: string;
  error?: boolean;
  errorValue?: string;
  onClosePress: () => void;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardType;
  multiline?: boolean;
  numberOfLines?: number;
  maxLenght?: number;
};

/** 
 * @param value é o valor que vai estar escrito na caixa de texto
 * geralmente ele vai ser dado por um useState('') do texto
 * de input dado por onChangeText.
 * Ex:
 * const [texto, setTexto] = useState('');
 * 
 * <LineInput value={texto} onChangeText={setTexto} />
 *
 * Cria um LineInput cujo estado é controlado pelo componente
 * que instância ele.
 * 
 * @param label é a pequena caixa de texto que indica do que
 * é o input.
 * 
 * @param error valor que indica se o valor do LineInput
 * tem algum erro. Quando true deixa o input no estilo de erro.
 * 
 * @param errorValue mensagem de erro que irá aparecer abaixo
 * do input quando error for verdadeiro.
 * 
 * @param onClosePress função que será executada quando o botão
 * de fechar for pressionado.
 * 
 * @param onChangeText função que é executada toda vez que o texto
 * do input é alterado.
 * 
 * @param keyboardType definie o tipo de teclado que irá aparecer.
 * Ex: Numéric faz com que o teclado numérico apareça. O valor
 * indefinido é o teclado normal.
 * 
 * @param multiline Se for true faz com que seja multilinha. Caso
 * contrário é apenas uma linha.
 * 
 * @param numberOfLines A quantidade de linhas que um input multi
 * linha pode ter. Se não for definido é igual a uma linha.
 * 
 * @param maxLenght Número máximo de carecters que o input pode 
 * receber.
*/ 
export default function LineInput({
  value,
  label,
  error,
  errorValue,
  onClosePress,
  onChangeText,
  keyboardType,
  multiline,
  numberOfLines,
  maxLenght
} : LineInputProps){
  const [focus, setFocus] = useState(false);

  return (
    <View>
      {!error && (
        <Pressable 
          style={styles.closeIcon} 
          onPress={onClosePress}
        >
          <MaterialCommunityIcons 
            name="close-circle" 
            size={30} 
            color={Colors.light.onSurfaceVariant}
          />
        </Pressable>
      )}
      {error && (
        <Pressable 
          style={styles.closeIcon} 
          onPress={onClosePress}
        >
          <MaterialCommunityIcons  
            name="alert-circle" 
            size={30} 
            color={Colors.light.error}
          />
        </Pressable>
      )}
      <Text
        style={[styles.label,
          focus && styles.labelFocused,
          error && styles.labelError
        ]}
      >
        {label}
      </Text>  
      <TextInput
        style={[styles.textInput,
          focus && styles.textInputFocused,
          error && styles.textInputError
        ]}
        multiline={multiline}
        numberOfLines={numberOfLines}
        onChangeText={onChangeText}
        maxLength={maxLenght}
        value={value}
        keyboardType={keyboardType}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      >
      </TextInput>
      {error && (
        <Text 
          style={styles.errorText}
        >
          {errorValue}
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  label : {
    position: 'absolute',
    left: 20,
    top: -5,
    backgroundColor: Colors.light.background,
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 16,
    color: Colors.light.onSurfaceVariant,
    fontFamily: "RobotoMono_400Regular",
    zIndex: 1
  },
  labelFocused: {
    color: Colors.light.primary
  },
  labelError: {
    color: Colors.light.error
  },
  textInput : {
    borderWidth: 1,
    padding: 16,
    paddingRight: 50,
    margin: 5,
    fontSize: 16,
    borderColor: Colors.light.onSurfaceVariant,
    color: Colors.light.onSurface,
    borderRadius: 4,
    fontFamily: "RobotoMono_400Regular",
  },
  textInputFocused : {
    borderColor: Colors.light.primary,
    borderWidth: 3
  },
  textInputError : {
    borderColor: Colors.light.error,
    borderWidth: 3
  },
  closeIcon : {
    position: 'absolute',
    right: 20,
    top: 18,
    elevation: 1,
    zIndex: 50
  },
  errorText : {
    paddingLeft: 30,
    color: Colors.light.error,
    fontSize: 14,
    fontFamily: "RobotoMono_400Regular"
  }
})