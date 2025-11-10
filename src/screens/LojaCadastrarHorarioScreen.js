// src/screens/LojaCadastrarHorarioScreen.js
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Header Corrigido
const AppHeader = ({ navigation }) => (
  <View style={styles.header}>
    <View style={{ width: 24 }} />
    <Text style={styles.headerTitle}>GlowMana</Text>
    <TouchableOpacity style={styles.bell} onPress={() => navigation.navigate('Notificacoes')}>
      <MaterialIcons name="notifications-none" size={24} color="#fff" />
    </TouchableOpacity>
  </View>
);

// Dados de exemplo
const datas = [
  { diaSemana: 'Ter', dia: '12/08' },
  { diaSemana: 'Qua', dia: '13/08' },
  { diaSemana: 'Qui', dia: '14/08' },
  { diaSemana: 'Sex', dia: '15/08' },
  { diaSemana: 'Sáb', dia: '16/08' },
];
const horarios = ['10:00', '14:00', '16:00', '18:00', '20:00'];

export default function LojaCadastrarHorarioScreen({ navigation }) {
  const [dataSel, setDataSel] = useState(datas[0].dia);
  const [horarioSel, setHorarioSel] = useState(horarios[0]);

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.pageTitle}>Cadastrar data e horário</Text>

        <Text style={styles.sectionTitle}>Selecione uma data:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ marginBottom: 20 }}>
          {datas.map((data) => (
            <TouchableOpacity
              key={data.dia}
              style={[styles.chip, data.dia === dataSel && styles.chipSelected]}
              onPress={() => setDataSel(data.dia)}
            >
              <Text style={[styles.chipText, data.dia === dataSel && styles.chipTextSelected]}>{data.diaSemana}</Text>
              <Text style={[styles.chipText, styles.chipTextBold, data.dia === dataSel && styles.chipTextSelected]}>{data.dia}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Selecione um horário:</Text>
        <View style={styles.horariosContainer}>
          {horarios.map((horario) => (
            <TouchableOpacity
              key={horario}
              style={[styles.chip, styles.chipHorario, horario === horarioSel && styles.chipSelected]}
              onPress={() => setHorarioSel(horario)}
            >
              <Text style={[styles.chipText, styles.chipTextBold, horario === horarioSel && styles.chipTextSelected]}>{horario}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonTextSecondary}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonPrimary]} onPress={() => { /* Lógica de salvar */ }}>
                <Text style={styles.buttonTextPrimary}>Cadastrar</Text>
            </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    height: 60,
    backgroundColor: "#2b2b2b",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  headerTitle: { color: "#fff", fontWeight: "700", fontSize: 20 },
  bell: {},
  scroll: { padding: 20, paddingBottom: 40 },
  pageTitle: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 25 },
  sectionTitle: { fontSize: 18, fontWeight: '500', color: '#333', marginBottom: 15 },
  chip: {
    backgroundColor: '#1e1e1e',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginRight: 10,
    alignItems: 'center',
    minWidth: 70,
  },
  chipSelected: {
    backgroundColor: '#333',
    borderColor: '#000',
    borderWidth: 2,
  },
  chipText: {
    color: '#fff',
    fontSize: 14,
  },
  chipTextSelected: {
    color: '#fff',
  },
  chipTextBold: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 2,
  },
  horariosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chipHorario: {
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 80,
  },
  button: {
    borderRadius: 30,
    paddingVertical: 18,
    width: '48%',
    alignItems: 'center',
  },
  buttonPrimary: {
    backgroundColor: '#2e2e2e',
  },
  buttonTextPrimary: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonSecondary: {
    backgroundColor: '#fff',
    borderColor: '#2e2e2e',
    borderWidth: 1.5,
  },
  buttonTextSecondary: {
    color: '#2e2e2e',
    fontSize: 16,
    fontWeight: '600',
  },
});