/// Component para os inputs de uma linha 
/// como nome de usuário, senha, titulo de 
/// tarefa e etc.

import { useState } from "react"
import { TextInput, StyleSheet, View, Text, Pressable, KeyboardType } from "react-native"

import { Colors } from "@/src/constants/theme"

import { MaterialCommunityIcons } from "@expo/vector-icons"; 

export interface LineInputProps {
  value: string;
  label: string;
  error?: boolean;
  errorValue?: string;
  onClosePress: () => void;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardType;
  multiline?: boolean;
  numberOfLines?: number;
  maxLenght?: number;
  secureTextEntry?: boolean;
  editable?: boolean;
};

/** 
 * @param value é o valor que vai estar escrito na caixa de texto
 * 
 * @param label é a pequena caixa de texto que indica do que é o input.
 * 
 * @param error valor que indica se o valor do LineInput tem algum erro.
 * 
 * @param errorValue mensagem de erro que irá aparecer abaixo do input.
 * 
 * @param onClosePress função executada quando o botão de fechar for pressionado.
 * 
 * @param onChangeText função executada toda vez que o texto é alterado.
 * 
 * @param placeholder texto de placeholder
 * 
 * @param keyboardType define o tipo de teclado que irá aparecer.
 * 
 * @param multiline Se for true faz com que seja multilinha.
 * 
 * @param numberOfLines quantidade de linhas de um input multilinha.
 * 
 * @param maxLenght número máximo de caracteres.
 * 
 * @param secureTextEntry se true, esconde o texto e mostra ícone de olho
 * para alternar a visibilidade.
 * 
 * @param editable flag que coloca o input como editável ou não.
 * Quando false, o ícone de fechar e o olho ficam ocultos.
*/ 
export default function LineInput({
  value,
  label,
  error,
  errorValue,
  onClosePress,
  onChangeText,
  placeholder,
  keyboardType,
  multiline,
  numberOfLines,
  maxLenght,
  secureTextEntry,
  editable
} : LineInputProps){
  const [focus, setFocus] = useState(false);

  const [senhaVisivel, setSenhaVisivel] = useState(false);

  const mostrarIcones = editable !== false;

  return (
    <View>

      {mostrarIcones && secureTextEntry && (
        <Pressable
          style={styles.eyeIcon}
          onPress={() => setSenhaVisivel(!senhaVisivel)}
        >
          <MaterialCommunityIcons
            name={senhaVisivel ? "eye" : "eye-off"}
            size={24}
            color={Colors.light.onSurfaceVariant}
          />
        </Pressable>
      )}

      {mostrarIcones && !secureTextEntry && !error && (
        <Pressable 
          style={styles.closeIcon} 
          onPress={onClosePress}
        >
          <MaterialCommunityIcons 
            name="close-circle" 
            size={28} 
            color={Colors.light.onSurfaceVariant}
          />
        </Pressable>
      )}
      {mostrarIcones && !secureTextEntry && error && (
        <Pressable 
          style={styles.closeIcon} 
          onPress={onClosePress}
        >
          <MaterialCommunityIcons  
            name="alert-circle" 
            size={28} 
            color={Colors.light.error}
          />
        </Pressable>
      )}

      <Text
        style={[
          styles.label,
          focus && styles.labelFocused,
          error && styles.labelError
        ]}
      >
        {label}
      </Text>  

      <TextInput
        style={[
          styles.textInput,
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
        placeholder={placeholder}
        secureTextEntry={secureTextEntry && !senhaVisivel}
        editable={editable}
      />

      {error && (
        <Text style={styles.errorText}>
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
    padding: 14,
    paddingRight: 50,
    margin: 5,
    fontSize: 15,
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
    top: 20,
    elevation: 1,
    zIndex: 50
  },
  eyeIcon: {
    position: 'absolute',
    right: 20,
    top: 22,
    elevation: 1,
    zIndex: 50
  },
  errorText : {
    paddingLeft: 30,
    color: Colors.light.error,
    fontSize: 13,
    fontFamily: "RobotoMono_400Regular"
  }
})