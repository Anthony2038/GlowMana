// src/screens/LoginScreen.js
import React, { useState, useContext } from 'react';
import { Ionicons } from '@expo/vector-icons'; // Certifique-se de instalar @expo/vector-icons
import { ImageBackground, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import CustomButton from '../components/CustomButton';

const API_URL = 'https://example.com'; // Altere para sua URL de API

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = (vals) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const e = (vals?.email ?? email).trim().toLowerCase();
    const p = vals?.password ?? password;
    if (!e || !emailRegex.test(e)) {
      Alert.alert('Erro', 'Informe um e-mail válido.');
      return false;
    }
    if (!p || p.length < 6) {
      Alert.alert('Erro', 'A senha deve ter ao menos 6 caracteres.');
      return false;
    }
    return true;
  };

  const { signIn } = useContext(AuthContext);

  const handleLogin = async () => {
    console.log('=== ENTRAR CLICADO ===');
    const sanitized = { email: email.trim().toLowerCase(), password };
    console.log('Email (sanitizado):', sanitized.email);
    console.log('Senha length:', sanitized.password.length);
    if (!validate(sanitized)) {
      console.log('❌ Validação falhou');
      return;
    }
    console.log('✅ Validação passou, iniciando login...');
    setLoading(true);
    try {
      const data = await signIn(sanitized.email, sanitized.password);
      console.log('📊 Dados retornados do signIn:', data);
      
      if (data && data.token) {
        console.log('🎉 Login bem-sucedido! Navegando para MainApp...');
        navigation.navigate('MainApp');
      } else {
        console.warn('⚠️ Login sem token');
        Alert.alert('Erro', 'Resposta inválida do servidor.');
      }
    } catch (error) {
      console.error('❌ Erro no login:', error);
      console.error('Stack:', error.stack);
      console.error('Status:', error?.status);
      const message = error?.status === 401 
        ? 'E-mail ou senha incorretos.'
        : (error?.message || 'Falha ao autenticar. Verifique sua conexão.');
      Alert.alert('Erro no Login', message);
    } finally {
      console.log('🏁 Finalizando login...');
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      // ADICIONE SUA IMAGEM DE FUNDO AQUI
      source={require('../assets/fundo-estatua.png')}
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
            />

            <Text style={styles.label}>Senha</Text>
            <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.inputPassword}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Digite sua senha"
                />
                <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color="#888" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity>
                <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
            </TouchableOpacity>

            <View style={{marginTop: 30, width: '100%'}}>
              {loading ? (
                <ActivityIndicator size="large" color="#000" />
              ) : (
                <CustomButton
                    title="Entrar"
                    onPress={handleLogin}
                    type="secondary"
                />
              )}
            </View>
        </View>
    </ImageBackground>
  );
};

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

export default LoginScreen;