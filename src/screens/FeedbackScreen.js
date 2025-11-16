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
  ScrollView
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import feedbackService from '../services/feedback';

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

// Componente de Seletor de Estrelas
const StarRating = ({ rating, onRatingChange, editable = false }) => {
  return (
    <View style={styles.starsContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => editable && onRatingChange(star)}
          disabled={!editable}
        >
          <Ionicons
            name={star <= rating ? 'star' : 'star-outline'}
            size={36}
            color="#FFD700"
            style={{ marginHorizontal: 4 }}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

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
const FeedbackCard = ({ item }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons name="person-circle" size={40} color="white" />
        <Text style={styles.cardName}>{item.userName}</Text>
      </View>
      <Text style={styles.cardComment}>{item.comment}</Text>
      <View style={styles.cardFooter}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="star" size={18} color="#FFD700" />
          <Text style={styles.cardRating}>{item.rating}/5</Text>
        </View>
        <Text style={styles.cardDate}>{formatDate(item.date)}</Text>
      </View>
    </View>
  );
};

export default function FeedbackScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const loadFeedbacks = async () => {
    try {
      setLoading(true);
      const data = await feedbackService.getFeedbacks();
      setFeedbacks(data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os feedbacks.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitFeedback = async () => {
    if (!user) {
      Alert.alert('Erro', 'Você precisa estar logado para enviar um feedback.');
      return;
    }

    if (rating === 0) {
      Alert.alert('Atenção', 'Por favor, selecione uma avaliação.');
      return;
    }

    if (!comment.trim()) {
      Alert.alert('Atenção', 'Por favor, escreva um comentário.');
      return;
    }

    try {
      setSubmitting(true);
      await feedbackService.createFeedback(user.id, user.name, rating, comment);
      
      Alert.alert('Sucesso', 'Seu feedback foi enviado com sucesso!');
      setModalVisible(false);
      setRating(0);
      setComment('');
      loadFeedbacks(); // Recarrega a lista
    } catch (error) {
      Alert.alert('Erro', error.message || 'Não foi possível enviar o feedback.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <AppHeader navigation={navigation} />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2e2e2e" />
          <Text style={styles.loadingText}>Carregando feedbacks...</Text>
        </View>
      ) : (
        <FlatList
          data={feedbacks}
          renderItem={({ item }) => <FeedbackCard item={item} />}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={
            <Text style={styles.pageTitle}>Feedback dos clientes</Text>
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="chatbox-outline" size={64} color="#ccc" />
              <Text style={styles.emptyText}>Nenhum feedback ainda.</Text>
              <Text style={styles.emptySubtext}>Seja o primeiro a avaliar!</Text>
            </View>
          }
          contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 100 }}
          refreshing={loading}
          onRefresh={loadFeedbacks}
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

      {/* Modal de Enviar Feedback */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Seu Feedback</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name="close" size={28} color="#333" />
                </TouchableOpacity>
              </View>

              <Text style={styles.modalLabel}>Como você avalia nosso serviço?</Text>
              <StarRating rating={rating} onRatingChange={setRating} editable />

              <Text style={styles.modalLabel}>Conte-nos sua experiência:</Text>
              <TextInput
                style={styles.textArea}
                multiline
                numberOfLines={6}
                placeholder="Compartilhe sua opinião sobre o atendimento, ambiente, qualidade do serviço..."
                placeholderTextColor="#999"
                value={comment}
                onChangeText={setComment}
                maxLength={500}
              />
              <Text style={styles.charCount}>{comment.length}/500</Text>

              <TouchableOpacity
                style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
                onPress={handleSubmitFeedback}
                disabled={submitting}
              >
                {submitting ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <>
                    <Ionicons name="send" size={20} color="white" />
                    <Text style={styles.submitButtonText}>Enviar Feedback</Text>
                  </>
                )}
              </TouchableOpacity>
            </ScrollView>
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
  // Estilos do Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    marginTop: 10,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    paddingVertical: 10,
  },
  textArea: {
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 15,
    fontSize: 15,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    minHeight: 120,
    textAlignVertical: 'top',
    color: '#333',
  },
  charCount: {
    textAlign: 'right',
    color: '#999',
    fontSize: 12,
    marginTop: 5,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#2e2e2e',
    borderRadius: 25,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonDisabled: {
    backgroundColor: '#999',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 15,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
});