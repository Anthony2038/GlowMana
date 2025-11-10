// src/screens/InitialScreen.js
import { ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';

const InitialScreen = ({ navigation }) => {
  return (
    <ImageBackground
      // ADICIONE SUA IMAGEM DE FUNDO AQUI
      source={require('../assets/fundo-estatua.png')}
      style={styles.background}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.overlay}>
        <Text style={styles.title}>GlowMana</Text>
        <Text style={styles.subtitle}>Seja bem-vindo!</Text>

        {/* ADICIONE A IMAGEM DO OLHO AQUI }
        <View style={styles.eyeContainer}>
            {/* <Image source={require('../assets/olho-decorativo.png')} style={styles.eyeImage} /> /}
        </View>*/}

        <View style={styles.buttonContainer}>
          <CustomButton
            title="Cliente"
            onPress={() => navigation.navigate('Login')}
            type="primary"
          />
          <CustomButton
            title="Loja"
            onPress={() => navigation.navigate('LojaLogin')}
            type="secondary"
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'serif', // Use uma fonte que combine com a imagem
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 8,
  },
  eyeContainer: {
    // Este container é um placeholder para o olho.
    // Você pode precisar ajustar o posicionamento absoluto se a imagem do olho
    // for separada do fundo.
    height: 100, // Altura de exemplo
    marginVertical: 40,
  },
  eyeImage: {
      width: 150,
      height: 80,
      resizeMode: 'contain',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center',
  },
});

export default InitialScreen;