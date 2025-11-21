// src/screens/LojaLoginScreen.js
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ImageBackground, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator, Platform } from 'react-native';
import CustomButton from '../components/CustomButton';

const API_URL = Platform.OS === 'web' ? 'http://localhost:3001' : 'http://192.168.0.156:3001';

export default function LojaLoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [secureSenha, setSecureSenha] = useState(true);

  const handleLogin = async () => {
    console.log('=== LOGIN LOJA CLICADO ===');
    
    const sanitized = { email: email.trim().toLowerCase(), password };
    
    if (!sanitized.email || !sanitized.password) {
      Alert.alert('Erro', 'Preencha e-mail e senha.');
      return;
    }

    setLoading(true);
    try {
      console.log('🏪 Fazendo login de administrador...');
      const response = await fetch(`${API_URL}/auth/store-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sanitized),
      });

      const data = await response.json();
      console.log('📊 Resposta:', data);

      if (!response.ok) {
        const message = response.status === 401 
          ? 'E-mail ou senha incorretos.'
          : data.message || 'Erro ao fazer login.';
        Alert.alert('Erro no Login', message);
        return;
      }

      if (data && data.token) {
        console.log('🎉 Login de admin bem-sucedido!');
        Alert.alert('Sucesso', `Bem-vindo, ${data.user.name}!`);
        navigation.navigate('LojaApp');
      } else {
        Alert.alert('Erro', 'Resposta inválida do servidor.');
      }
    } catch (error) {
      console.error('❌ Erro no login da loja:', error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    } finally {
      setLoading(false);
    }
  };

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
                value={email}
                onChangeText={setEmail}
                editable={!loading}
            />

            <Text style={styles.label}>Senha</Text>
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.inputPassword}
                    secureTextEntry={secureSenha}
                    value={password}
                    onChangeText={setPassword}
                    editable={!loading}
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
                  title={loading ? "Entrando..." : "Entrar"}
                  onPress={handleLogin}
                  type="secondary"
                  disabled={loading}
              />
              {loading && <ActivityIndicator size="small" color="#000" style={{marginTop: 10}} />}
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