// src/screens/FeedbackScreen.js
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
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

// Dados de exemplo
const feedbacks = [
  {
    id: '1',
    nome: 'Fulana Da Silva',
    rating: 5,
    data: '05/07/2025',
    comentario: 'Amei o atendimento! Profissionalismo e delicadeza. Com certeza voltarei mais vezes.',
  },
  {
    id: '2',
    nome: 'Carla Nascimento',
    rating: 4,
    data: '11/07/2025',
    comentario: 'Ambiente super agradável e minha sobrancelha ficou perfeita! Obrigada, GlowMana.',
  },
  {
    id: '3',
    nome: 'Bianca Rocha',
    rating: 5,
    data: '19/07/2025',
    comentario: 'Marquei unhas e cabelo e fiquei encantada com o resultado. Atendimento excelente!',
  },
];

// Componente do Card de Feedback
const FeedbackCard = ({ item }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <Ionicons name="person-circle" size={40} color="white" />
      <Text style={styles.cardName}>{item.nome}</Text>
    </View>
    <Text style={styles.cardComment}>{item.comentario}</Text>
    <View style={styles.cardFooter}>
      <Ionicons name="star" size={18} color="#FFD700" />
      <Text style={styles.cardRating}>{item.rating}/5</Text>
      <Text style={styles.cardDate}>{item.data}</Text>
    </View>
  </View>
);

export default function FeedbackScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <AppHeader navigation={navigation} />

      <FlatList
        data={feedbacks}
        renderItem={({ item }) => <FeedbackCard item={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <Text style={styles.pageTitle}>Feedback dos clientes</Text>
        }
        contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 100 }}
      />

      <TouchableOpacity style={styles.floatingButton} activeOpacity={0.8}>
        <Ionicons name="add" size={28} color="white" />
        <Text style={styles.floatingButtonText}>Enviar meu feedback</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#3a3a3a',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  cardComment: {
    color: '#e0e0e0',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 15,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardRating: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  cardDate: {
    color: '#b0b0b0',
    fontSize: 14,
    marginLeft: 'auto',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20, // Ajuste para ficar acima da TabBar
    left: '50%',
    marginLeft: -110, // Metade da largura
    width: 220,
    height: 55,
    backgroundColor: '#2e2e2e',
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  floatingButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});