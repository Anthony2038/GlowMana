// src/screens/LojaFeedbackScreen.js
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const API_URL = typeof __DEV__ !== 'undefined' && __DEV__ ? 'http://192.168.0.156:3001' : 'https://example.com';

const FeedbackCard = ({ item }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <MaterialIcons name="person" size={40} color="#fff" />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={styles.cardName}>{item.nome}</Text>
        <Text style={styles.cardDate}>{item.data}</Text>
      </View>
      <View style={styles.ratingBadge}>
        <MaterialIcons name="star" size={18} color="#FFD700" />
        <Text style={styles.ratingText}>{item.rating}</Text>
      </View>
    </View>
    <Text style={styles.cardComment}>{item.comentario}</Text>
  </View>
);

export default function LojaFeedbackScreen({ navigation }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{ width: 24 }} />
        <Text style={styles.headerTitle}>GlowMana</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Notificacoes')}>
          <MaterialIcons name="notifications-none" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

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
            <Text style={styles.pageTitle}>Feedbacks Recebidos</Text>
          }
          contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 20 }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    height: 60,
    backgroundColor: '#2b2b2b',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 20,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#3a3a3a',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardDate: {
    color: '#b0b0b0',
    fontSize: 13,
    marginTop: 2,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2e2e2e',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  ratingText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 3,
  },
  cardComment: {
    color: '#e0e0e0',
    fontSize: 15,
    lineHeight: 22,
  },
});