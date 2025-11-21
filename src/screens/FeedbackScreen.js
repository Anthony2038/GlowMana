// src/screens/FeedbackScreen.js
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect, useContext } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';

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

const API_URL = typeof __DEV__ !== 'undefined' && __DEV__ ? 'http://192.168.0.156:3001' : 'https://example.com';

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
  const { user, token } = useContext(AuthContext);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(5);
  const [comentario, setComentario] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const loadFeedbacks = async () => {
    try {
      const res = await fetch(`${API_URL}/feedbacks`);
      const data = await res.json();
      setFeedbacks(data);
    } catch (e) {
      Alert.alert('Erro', 'Falha ao carregar feedbacks.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!comentario.trim()) {
      Alert.alert('Erro', 'Digite um comentário.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/feedbacks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          nome: user?.name || 'Anônimo',
          rating,
          comentario,
          data: new Date().toLocaleDateString('pt-BR'),
        }),
      });
      if (!res.ok) throw new Error('Falha ao enviar');
      Alert.alert('Sucesso', 'Feedback enviado!');
      setModalVisible(false);
      setComentario('');
      setRating(5);
      loadFeedbacks();
    } catch (e) {
      Alert.alert('Erro', e.message || 'Falha ao enviar feedback.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <AppHeader navigation={navigation} />

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        <FlatList
          data={feedbacks}
          renderItem={({ item }) => <FeedbackCard item={item} />}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={
            <Text style={styles.pageTitle}>Feedback dos clientes</Text>
          }
          contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 100 }}
        />
      )}

      <TouchableOpacity 
        style={styles.floatingButton} 
        activeOpacity={0.8}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={28} color="white" />
        <Text style={styles.floatingButtonText}>Enviar meu feedback</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Seu Feedback</Text>
            
            <Text style={styles.modalLabel}>Avaliação</Text>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                  <Ionicons
                    name={star <= rating ? 'star' : 'star-outline'}
                    size={40}
                    color="#FFD700"
                  />
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.modalLabel}>Comentário</Text>
            <TextInput
              style={styles.textArea}
              multiline
              numberOfLines={4}
              value={comentario}
              onChangeText={setComentario}
              placeholder="Conte sua experiência..."
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.submitButton]}
                onPress={handleSubmit}
                disabled={submitting}
              >
                {submitting ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.submitButtonText}>Enviar</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    bottom: 80, // Aumentado para ficar bem acima da TabBar
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
    zIndex: 999, // Garantir que fique no topo
  },
  floatingButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 10,
  },
  textArea: {
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    marginBottom: 20,
    textAlignVertical: 'top',
    minHeight: 100,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#E0E0E0',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#000',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});