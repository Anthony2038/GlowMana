// src/screens/RegisterScreen.js
import React, { useState, useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ImageBackground, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import CustomButton from '../components/CustomButton';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [pressInfo, setPressInfo] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validate = (vals) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const n = (vals?.name ?? name).trim();
    const e = (vals?.email ?? email).trim().toLowerCase();
    const p = vals?.password ?? password;
    const c = vals?.confirmPassword ?? confirmPassword;

    if (!n || n.length < 2) {
      Alert.alert('Erro', 'Informe seu nome.');
      return false;
    }
    if (!e || !emailRegex.test(e)) {
      Alert.alert('Erro', 'Informe um e-mail válido.');
      return false;
    }
    if (!p || p.length < 6) {
      Alert.alert('Erro', 'A senha deve ter ao menos 6 caracteres.');
      return false;
    }
    if (p !== c) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return false;
    }
    return true;
  };

  const { signUp } = useContext(AuthContext);

  const handleRegister = async () => {
    setPressInfo('Toque detectado no botão Cadastrar');
    setTimeout(() => setPressInfo(''), 3000);
    console.log('====================================');
    console.log('BOTÃO CADASTRAR CLICADO!');
    console.log('====================================');
    const sanitized = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      confirmPassword,
    };
    console.log('Nome (sanitizado):', sanitized.name);
    console.log('Email (sanitizado):', sanitized.email);
    console.log('Senha length:', sanitized.password.length);
    console.log('Confirm length:', sanitized.confirmPassword.length);
    
    if (!validate(sanitized)) {
      console.log('❌ Validação falhou');
      return;
    }
    
    console.log('✅ Validação passou');
    setLoading(true);
    
    try {
      console.log('🔄 Chamando signUp...');
      const data = await signUp(sanitized.name, sanitized.email, sanitized.password);
      console.log('✅ Resposta signUp:', JSON.stringify(data));
      
      if (!data || !data.token) {
        console.warn('⚠️ Resposta sem token:', data);
        throw new Error('Resposta inválida do servidor. Tente novamente.');
      }
      
      console.log('🎉 Cadastro bem-sucedido! Navegando para LoginActual...');
      Alert.alert('Sucesso', 'Cadastro realizado! Faça login para continuar.', [
        { text: 'OK', onPress: () => {
          console.log('Navegando para LoginActual');
          navigation.navigate('LoginActual');
        }}
      ]);
    } catch (error) {
      console.error('❌ Erro no cadastro:', error);
      console.error('Stack completo:', error.stack);
      console.error('Status:', error?.status);
      console.error('Data:', error?.data);
      const friendly = error?.status === 409
        ? 'E-mail já cadastrado. Tente fazer login ou use outro e-mail.'
        : (error?.message || 'Falha ao cadastrar. Verifique sua conexão.');
      Alert.alert('Erro no Cadastro', friendly);
    } finally {
      console.log('🏁 Finalizando cadastro...');
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
            <Text style={styles.label}>Nome</Text>
            <TextInput 
              style={styles.input} 
              value={name} 
              onChangeText={setName}
              placeholder="Digite seu nome"
              autoCapitalize="words"
            />

            <Text style={styles.label}>E-mail</Text>
            <TextInput 
              style={styles.input} 
              keyboardType="email-address" 
              value={email} 
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Digite seu e-mail"
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
                <TouchableOpacity 
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                    <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={24} color="#888" />
                </TouchableOpacity>
            </View>

            <Text style={styles.label}>Confirma senha</Text>
             <View style={styles.passwordContainer}>
                <TextInput 
                  style={styles.inputPassword} 
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword} 
                  onChangeText={setConfirmPassword}
                  placeholder="Confirme sua senha"
                />
                <TouchableOpacity 
                  style={styles.eyeIcon}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                    <Ionicons name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} size={24} color="#888" />
                </TouchableOpacity>
            </View>

            <View style={{marginTop: 30, width: '100%'}}>
              {loading ? (
                <ActivityIndicator size="large" color="#000" />
              ) : (
                <CustomButton
                    title="Cadastrar"
                    onPress={handleRegister}
                    type="secondary"
                    disabled={loading}
                />
              )}
              {pressInfo ? (
                <Text style={{ textAlign: 'center', marginTop: 8, color: '#666' }}>{pressInfo}</Text>
              ) : null}
            </View>
        </View>
    </ImageBackground>
  );
};

// Os estilos são muito parecidos com a LoginScreen, você pode criar um arquivo de estilos compartilhado.
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  header: {
    flex: 0.8,
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
    paddingTop: 30,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  errorText: {
    color: '#d00',
    fontSize: 13,
    marginTop: -8,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
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
    marginBottom: 15,
  },
  inputPassword: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 15,
  }
});

export default RegisterScreen;