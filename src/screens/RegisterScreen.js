// src/screens/RegisterScreen.js
import { Ionicons } from '@expo/vector-icons';
import { ImageBackground, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CustomButton from '../components/CustomButton';

const RegisterScreen = ({ navigation }) => {
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
            <TextInput style={styles.input} />

            <Text style={styles.label}>E-mail</Text>
            <TextInput style={styles.input} keyboardType="email-address" />

            <Text style={styles.label}>Senha</Text>
            <View style={styles.passwordContainer}>
                <TextInput style={styles.inputPassword} secureTextEntry />
                <TouchableOpacity style={styles.eyeIcon}>
                    <Ionicons name="eye-outline" size={24} color="#888" />
                </TouchableOpacity>
            </View>

            <Text style={styles.label}>Confirma senha</Text>
             <View style={styles.passwordContainer}>
                <TextInput style={styles.inputPassword} secureTextEntry />
                <TouchableOpacity style={styles.eyeIcon}>
                    <Ionicons name="eye-outline" size={24} color="#888" />
                </TouchableOpacity>
            </View>

            <View style={{marginTop: 30, width: '100%'}}>
              <CustomButton
                  title="Cadastrar"
                  onPress={() => navigation.navigate('MainApp')}
                  type="secondary"
              />
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