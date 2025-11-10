// src/screens/PerfilScreen.js
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// Componente de Cabeçalho (padrão do app)
const AppHeader = ({ navigation }) => (
  <LinearGradient
    colors={["#4a4a4a", "#2b2b2b"]}
    start={[0, 0]}
    end={[1, 1]}
    style={styles.header}
  >
    <Text style={styles.headerTitle}>GlowMana</Text>
    <TouchableOpacity 
      style={styles.bell} 
      activeOpacity={0.7}
      onPress={() => navigation.navigate('Notificacoes')} // Navega para Notificações
    >
      <MaterialIcons name="notifications-none" size={24} color="#fff" />
    </TouchableOpacity>
  </LinearGradient>
);

export default function PerfilScreen({ navigation }) {
  const [secureSenha, setSecureSenha] = React.useState(true);
  const [secureConfirma, setSecureConfirma] = React.useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <AppHeader navigation={navigation} />
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.pageTitle}>Perfil</Text>

        <View style={styles.avatarContainer}>
          <TouchableOpacity style={styles.avatar} activeOpacity={0.8}>
            {/* ADICIONE A IMAGEM DE PERFIL AQUI */}
            {/* <Image source={...} style={styles.avatarImage} /> */}
            <Ionicons name="person" size={80} color="#555" />
            
            <View style={styles.cameraIcon}>
              <Ionicons name="camera" size={20} color="white" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Formulário */}
        <Text style={styles.label}>Nome</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            defaultValue="Fulana"
          />
          <Ionicons name="pencil" size={20} color="#555" style={styles.inputIcon} />
        </View>
        
        <Text style={styles.label}>E-mail</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            defaultValue="Fulana123@gmail.com"
            keyboardType="email-address"
          />
          <Ionicons name="pencil" size={20} color="#555" style={styles.inputIcon} />
        </View>

        <Text style={styles.label}>Senha</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            defaultValue="********"
            secureTextEntry={secureSenha}
          />
          <TouchableOpacity onPress={() => setSecureSenha(!secureSenha)}>
            <Ionicons 
              name={secureSenha ? "eye-outline" : "eye-off-outline"} 
              size={24} 
              color="#555" 
              style={styles.inputIcon} 
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Confirma senha</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            defaultValue="********"
            secureTextEntry={secureConfirma}
          />
          <TouchableOpacity onPress={() => setSecureConfirma(!secureConfirma)}>
            <Ionicons 
              name={secureConfirma ? "eye-outline" : "eye-off-outline"} 
              size={24} 
              color="#555" 
              style={styles.inputIcon} 
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.saveButton} activeOpacity={0.8}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingHorizontal: 25,
    paddingBottom: 40,
  },
  // Estilos do Cabeçalho
  header: {
    height: 64,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
  },
bell: {
    position: 'absolute',
    right: 18,
    // Adicione estas duas linhas
    height: '100%', // Faz o TouchableOpacity ter a altura total do header
    justifyContent: 'center', // Centraliza o ícone verticalmente dentro dele
  },
  // Estilos da Página
  pageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  avatarImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#333',
    borderRadius: 15,
    padding: 5,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  inputIcon: {
    padding: 15,
  },
  saveButton: {
    backgroundColor: '#000000',
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});