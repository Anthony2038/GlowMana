// App.js
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import { ImageBackground, View } from 'react-native';

// Importe o botão customizado (verifique o caminho)
import CustomButton from './src/components/CustomButton';

// --- Importações de Telas de Autenticação e Cliente ---
import AgendamentoDetalheScreen from './src/screens/AgendamentoDetalheScreen';
import AgendamentosScreen from './src/screens/AgendamentosScreen';
import DetalhesPromocaoScreen from './src/screens/DetalhesPromocaoScreen';
import FeedbackScreen from './src/screens/FeedbackScreen';
import HomeScreen from './src/screens/HomeScreen';
import InitialScreen from './src/screens/InitialScreen';
import LoginScreen from './src/screens/LoginScreen';
import NotificacoesScreen from './src/screens/NotificacoesScreen';
import PerfilScreen from './src/screens/PerfilScreen';
import PromocoesScreen from './src/screens/PromocoesScreen';
import RegisterScreen from './src/screens/RegisterScreen';

// --- Importações de Telas da Loja ---
import LojaAgendamentosScreen from './src/screens/LojaAgendamentosScreen';
import LojaCadastrarHorarioScreen from './src/screens/LojaCadastrarHorarioScreen';
import LojaFeedbackScreen from './src/screens/LojaFeedbackScreen';
import LojaHomeScreen from './src/screens/LojaHomeScreen';
import LojaLoginScreen from './src/screens/LojaLoginScreen';
import LojaPerfilScreen from './src/screens/LojaPerfilScreen';
import LojaPromocaoNovaScreen from './src/screens/LojaPromocaoNovaScreen';
import LojaServicoNovoScreen from './src/screens/LojaServicoNovoScreen';


// --- Tela de Escolha (Tela 2 Cliente) ---
const LoginFlowScreen = ({ navigation }) => {
    return (
        <ImageBackground
            source={require('./src/assets/fundo-estatua.png')}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        >
             <View style={{backgroundColor: 'rgba(0,0,0,0.3)', width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 50}}>
                <CustomButton title="Entrar" onPress={() => navigation.navigate('LoginActual')} type="primary" />
                <CustomButton title="Cadastrar" onPress={() => navigation.navigate('Register')} type="secondary" />
            </View>
        </ImageBackground>
    )
}

// --- Navegador (Abas) do CLIENTE ---
const Tab = createBottomTabNavigator();
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Agendamentos') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Feedback') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#888',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { paddingTop: 5, height: 60 }
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ title: 'Início' }} />
      <Tab.Screen name="Agendamentos" component={AgendamentosScreen} />
      <Tab.Screen name="Feedback" component={FeedbackScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}

// --- Navegador (Abas) da LOJA ---
const LojaTab = createBottomTabNavigator();
function LojaTabs() {
  return (
    <LojaTab.Navigator
      // Estilos da TabBar da Loja (baseado na imagem 13)
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'LojaHome') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'LojaAgendamentos') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'LojaFeedback') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'LojaPerfil') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#888',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { paddingTop: 5, height: 60, backgroundColor: '#f0f0f0' }
      })}
    >
      <LojaTab.Screen name="LojaHome" component={LojaHomeScreen} options={{ title: 'Início' }} />
      <LojaTab.Screen name="LojaAgendamentos" component={LojaAgendamentosScreen} options={{ title: 'Agendamentos' }} />
      <LojaTab.Screen name="LojaFeedback" component={LojaFeedbackScreen} options={{ title: 'Feedback' }} />
      <LojaTab.Screen name="LojaPerfil" component={LojaPerfilScreen} options={{ title: 'Perfil' }} />
    </LojaTab.Navigator>
  );
}


// --- Navegador Raiz (Stack) ---
const Stack = createStackNavigator();

function App() {
  return (
    // Removido o <NavigationContainer> daqui, pois o Expo Router cuida disso
    <AuthProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Telas de Autenticação (Cliente e Loja) */}
      <Stack.Screen name="Initial" component={InitialScreen} />
      
      {/* Fluxo Cliente */}
      <Stack.Screen name="Login" component={LoginFlowScreen} />
      <Stack.Screen name="LoginActual" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="MainApp" component={MainTabs} />
      
      {/* Fluxo Loja */}
      <Stack.Screen name="LojaLogin" component={LojaLoginScreen} />
      <Stack.Screen name="LojaApp" component={LojaTabs} />

      {/* Telas de Detalhe (Comuns e Cliente) */}
      <Stack.Screen name="Notificacoes" component={NotificacoesScreen} />
      <Stack.Screen name="Promocoes" component={PromocoesScreen} />
      <Stack.Screen name="DetalhesPromocao" component={DetalhesPromocaoScreen} />
      <Stack.Screen name="AgendamentoDetalhe" component={AgendamentoDetalheScreen} />

      {/* Telas de Detalhe (Loja) */}
      <Stack.Screen name="LojaCadastrarHorario" component={LojaCadastrarHorarioScreen} />
      <Stack.Screen name="LojaPromocaoNova" component={LojaPromocaoNovaScreen} />
      <Stack.Screen name="LojaServicoNovo" component={LojaServicoNovoScreen} />

    </Stack.Navigator>
    </AuthProvider>
  );
}

export default App;