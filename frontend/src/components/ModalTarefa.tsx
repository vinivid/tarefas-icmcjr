import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, Pressable, TextInput, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from '../constants/theme';
import Botao from './Botao';

type ModalTarefaProps = {
  visivel: boolean;
  fecharModal: () => void;
  onSalvar: (novaTarefa: { titulo: string; descricao: string; data: string; hora: string }) => Promise<boolean>;
  desktop?: boolean;
  tarefaParaEditar?: { 
    titulo: string;
    descricao: string;
    data: string;
    hora: string;
  };
};

export default function ModalTarefa({ visivel, fecharModal, onSalvar, desktop, tarefaParaEditar }: ModalTarefaProps) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [mostrarErros, setMostrarErros] = useState(false);

  useEffect(() => {
    if (tarefaParaEditar) {
      setTitulo(tarefaParaEditar.titulo);
      setDescricao(tarefaParaEditar.descricao);
      setData(tarefaParaEditar.data);
      setHora(tarefaParaEditar.hora);
    } else {
      setTitulo('');
      setDescricao('');
      setData('');
      setHora('');
    }
    setMostrarErros(false);
  }, [tarefaParaEditar, visivel]);

  const aoEscolherData = (event: any, dataSelecionada?: Date) => {
    setShowDatePicker(false);
    if (dataSelecionada) {
      const dia = String(dataSelecionada.getDate()).padStart(2, '0');
      const mes = String(dataSelecionada.getMonth() + 1).padStart(2, '0');
      const ano = dataSelecionada.getFullYear();
      setData(`${dia}/${mes}/${ano}`);
    }
  };

  const aoDigitarData = (valor: string) => {
    const numeros = valor.replace(/\D/g, '').slice(0, 8);
    const partes = [
      numeros.slice(0, 2),
      numeros.slice(2, 4),
      numeros.slice(4, 8)
    ].filter(Boolean);

    setData(partes.join('/'));
  };

  const aoDigitarHora = (valor: string) => {
    const numeros = valor.replace(/\D/g, '').slice(0, 4);
    const partes = [
      numeros.slice(0, 2),
      numeros.slice(2, 4)
    ].filter(Boolean);

    setHora(partes.join(':'));
  };

  const obterPrazo = () => {
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(data) || !/^\d{2}:\d{2}$/.test(hora)) {
      return null;
    }

    const [dia, mes, ano] = data.split('/').map(Number);
    const [horas, minutos] = hora.split(':').map(Number);
    const prazo = new Date(ano, mes - 1, dia, horas, minutos);

    const dataValida =
      prazo.getFullYear() === ano &&
      prazo.getMonth() === mes - 1 &&
      prazo.getDate() === dia;
    const horaValida = horas <= 23 && minutos <= 59;

    return dataValida && horaValida ? prazo : null;
  };

  const prazo = obterPrazo();
  const prazoInvalido = prazo === null || prazo.getTime() <= Date.now();

  const handleSalvar = async () => {
    if (!titulo.trim() || !descricao.trim() || prazoInvalido) {
      setMostrarErros(true);
      return; 
    }

    const salvou = await onSalvar({ titulo, descricao, data, hora });
    if (salvou) fecharModal();
  };

  return (
    <Modal visible={visivel} transparent animationType="fade">
      <View style={styles.overlayEscuro}>
        <View style={[styles.cardBranco, desktop && styles.cardBrancoDesktop]}>
          
          <View style={styles.cabecalhoModal}>
            <View style={{ width: 24 }} />
            <Text style={styles.tituloModal}>
              {tarefaParaEditar ? 'Editar Tarefa' : 'Adicionar Nova Tarefa'}
            </Text>
            <Pressable onPress={fecharModal}>
              <MaterialIcons name="close" size={24} color={Colors.light.primary} />
            </Pressable>
          </View>

          <View style={[styles.caixaInput, mostrarErros && !titulo.trim() && styles.caixaInputErro]}>
            <Text style={[styles.labelInput, mostrarErros && !titulo.trim() && styles.labelInputErro]}>
              Título
            </Text>
            
            {mostrarErros && !titulo.trim() && <Text style={styles.textoErro}>*Obrigatório</Text>}

            <TextInput
              style={styles.textInputArea}
              value={titulo}
              onChangeText={setTitulo}
              placeholder="Título da tarefa"
              placeholderTextColor="#A0A0A0"
            />
            {titulo.length > 0 && (
              <Pressable onPress={() => setTitulo('')} style={styles.botaoLimpar}>
                <MaterialIcons name="cancel" size={20} color="#79747E" />
              </Pressable>
            )}
          </View>

          <View style={[styles.caixaInput, styles.caixaInputDescricao, mostrarErros && !descricao.trim() && styles.caixaInputErro]}>
            <Text style={[styles.labelInput, mostrarErros && !descricao.trim() && styles.labelInputErro]}>
              Descrição
            </Text>

            {mostrarErros && !descricao.trim() && <Text style={styles.textoErro}>*Obrigatório</Text>}

            <TextInput
              style={[styles.textInputArea, styles.textAreaMultilinha]}
              value={descricao}
              onChangeText={setDescricao}
              placeholder="Descrição da tarefa"
              placeholderTextColor="#A0A0A0"
              multiline
              textAlignVertical="top"
            />
             {descricao.length > 0 && (
              <Pressable onPress={() => setDescricao('')} style={styles.botaoLimparTop}>
                <MaterialIcons name="cancel" size={20} color="#79747E" />
              </Pressable>
            )}
          </View>

          <Text style={styles.textoPrazo}>Prazo</Text>

          <View style={styles.secaoData}>
            <View style={[styles.caixaInput, mostrarErros && prazoInvalido && styles.caixaInputErro]}>
              <Text style={[styles.labelInput, mostrarErros && prazoInvalido && styles.labelInputErro]}>
                Data
              </Text>

              {mostrarErros && prazoInvalido && (
                <Text style={styles.textoErro}>*Prazo deve estar no futuro</Text>
              )}
              
              <TextInput
                style={styles.textInputArea}
                value={data}
                onChangeText={aoDigitarData}
                placeholder="DD/MM/AAAA"
                placeholderTextColor="#A0A0A0"
                keyboardType="numeric"
                maxLength={10}
              />
              
              {Platform.OS !== 'web' && (
                <Pressable style={styles.botaoCalendario} onPress={() => setShowDatePicker(true)}>
                  <MaterialIcons name="calendar-today" size={22} color={Colors.light.primary} />
                </Pressable>
              )}
            </View>
            <Text style={styles.formatoData}>DD/MM/AAAA</Text>
          </View>

          {showDatePicker && Platform.OS !== 'web' && (
              <DateTimePicker
                value={new Date()}
                mode="date"
                display="default"
                minimumDate={new Date()}
                onChange={aoEscolherData}
              />
            )}

          <View style={[styles.caixaInput, mostrarErros && prazoInvalido && styles.caixaInputErro]}>
            <Text style={[styles.labelInput, mostrarErros && prazoInvalido && styles.labelInputErro]}>
              Hora
            </Text>

            {mostrarErros && prazoInvalido && (
              <Text style={styles.textoErro}>*Use HH:MM</Text>
            )}

            <TextInput
              style={styles.textInputArea}
              value={hora}
              onChangeText={aoDigitarHora}
              placeholder="HH:MM"
              placeholderTextColor="#A0A0A0"
              keyboardType="numeric"
              maxLength={5}
            />
            {hora.length > 0 && (
              <Pressable onPress={() => setHora('')} style={styles.botaoLimpar}>
                <MaterialIcons name="cancel" size={20} color="#79747E" />
              </Pressable>
            )}
          </View>

          <View style={styles.wrapperBotao}>
            <Botao conteudo="Salvar" onPress={handleSalvar} />
          </View>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlayEscuro: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBranco: {
    backgroundColor: 'white',
    width: '88%',
    padding: 20,
    borderRadius: 24,
    gap: 12,
  },
  cardBrancoDesktop: {
    maxWidth: 600,
  },
  cabecalhoModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  tituloModal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.primary,
  },
  caixaInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#79747E', 
    borderRadius: 8,
    paddingHorizontal: 12,
    minHeight: 55, 
    position: 'relative',
  },
  labelInput: {
    position: 'absolute',
    top: -10,
    left: 10,
    backgroundColor: 'white',
    paddingHorizontal: 5,
    fontSize: 12,
    color: '#79747E',
  },
  textInputArea: {
    flex: 1, 
    fontSize: 16,
    color: '#49454F',
    paddingVertical: 10, 
  },
  botaoLimpar: {
    padding: 5,
  },
  caixaInputErro: {
    borderColor: '#B3261E',
  },
  labelInputErro: {
    color: '#B3261E',
  },
  textoErro: {
    position: 'absolute',
    top: -10,
    right: 10, 
    backgroundColor: 'white',
    paddingHorizontal: 5,
    fontSize: 12,
    color: '#B3261E',
  },
  caixaInputDescricao: {
    minHeight: 100, 
    alignItems: 'flex-start', 
    paddingTop: 5,
  },
  textAreaMultilinha: {
    minHeight: 80,
  },
  botaoLimparTop: {
    padding: 5,
    marginTop: 5, 
  },
  textoPrazo: {
    color: Colors.light.primary,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5,
  },
  secaoData: {
    marginBottom: 5,
  },
  botaoCalendario: {
    backgroundColor: '#F3F0F9',
    padding: 6,
    borderRadius: 8,
  },
  formatoData: {
    fontSize: 10,
    color: '#79747E',
    marginTop: 2,
    marginLeft: 4,
  },
  wrapperBotao: {
    alignItems: 'center',
    marginTop: 15,
  }
});
