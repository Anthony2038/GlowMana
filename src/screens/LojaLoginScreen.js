// src/screens/LojaLoginScreen.js
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ImageBackground, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CustomButton from '../components/CustomButton'; // Reutilizando seu botão

export default function LojaLoginScreen({ navigation }) {
  const [secureSenha, setSecureSenha] = React.useState(true);

  return (
    <ImageBackground
      // ADICIONE A IMAGEM DE FUNDO DA LOJA AQUI
      source={require('../assets/fundo-estatua.png')} // Troque esta imagem
      style={styles.background}
    >
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
            <Text style={styles.title}>GlowMana</Text>
        </View>
        <View style={styles.formContainer}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <Text style={styles.label}>Senha</Text>
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.inputPassword}
                    secureTextEntry={secureSenha}
                />
                <TouchableOpacity onPress={() => setSecureSenha(!secureSenha)}>
                    <Ionicons 
                      name={secureSenha ? "eye-outline" : "eye-off-outline"} 
                      size={24} 
                      color="#888" 
                      style={styles.eyeIcon} 
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity>
                <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
            </TouchableOpacity>

            <View style={{marginTop: 30, width: '100%'}}>
              <CustomButton
                  title="Entrar"
                  onPress={() => navigation.navigate('LojaApp')} // Navega para o App da Loja
                  type="secondary"
              />
            </View>
        </View>
    </ImageBackground>
  );
};

// Estilos reutilizados do LoginScreen.js
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'serif',
  },
  formContainer: {
    flex: 2,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 25,
    paddingTop: 40,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
    borderColor: '#E0E0E0',
    borderWidth: 1,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    borderColor: '#E0E0E0',
    borderWidth: 1,
  },
  inputPassword: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 15,
  },
  forgotPassword: {
    textAlign: 'right',
    marginTop: 10,
    color: '#555',
    fontWeight: '500',
  }
});