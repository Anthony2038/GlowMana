// src/screens/NotificacoesScreen.js
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from 'react';
import notificationsService from '../services/notifications';

export default function NotificacoesScreen({ navigation }) { // Adicionado { navigation }
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    try {
      setLoading(true);
      // exemplo: buscar notificações da loja com shopId=1
      const data = await notificationsService.fetchNotifications('?shopId=1&_sort=date&_order=desc');
      setNotifications(data || []);
    } catch (err) {
      // falha silenciosa por enquanto
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* 🔹 Cabeçalho */}
<LinearGradient
        colors={["#4a4a4a", "#2b2b2b"]}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.header}
      >
        {/* <<< MUDANÇA: Espaçador invisível da mesma largura do ícone */}
        <View style={{ width: 22 }} />

        <Text style={styles.headerTitle}>GlowMana</Text>

        <TouchableOpacity 
          style={styles.bell} // <<< MUDANÇA: O estilo bell não terá mais 'position: absolute'
          activeOpacity={0.7} 
          onPress={() => navigation.navigate('Notificacoes')}
        >
          <MaterialIcons name="notifications-none" size={22} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>

      {/* 🔹 Conteúdo */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Notificações</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#2e2e2e" />
        ) : (
          notifications.map((n) => (
            <View key={n.id} style={styles.notificationCard}>
              <Text style={styles.notificationText}>{n.text}</Text>
              <Text style={styles.notificationDate}>{new Date(n.date).toLocaleString()}</Text>
            </View>
          ))
        )}

        <View style={{ height: 60 }} />
      </ScrollView>

      {/* <<< CORREÇÃO: Barra inferior estática removida daqui >>> */}
    </SafeAreaView>
  );
}

// 🎨 Estilos
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
  height: 64,
  paddingHorizontal: 16,
  flexDirection: 'row',
  alignItems: 'center', // Centraliza verticalmente
  justifyContent: 'space-between', // Empurra itens para as bordas
},
  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "800" },
  bell: {  },
  scrollContent: { paddingHorizontal: 16, paddingTop: 18 },
  title: { fontSize: 20, fontWeight: "800", marginBottom: 12 },
  notificationCard: {
    backgroundColor: "#bfbfbf",
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  notificationText: {
    color: "#111",
    fontSize: 14.5,
    fontWeight: "500",
  },
  notificationDate: {
    textAlign: "right",
    color: "#333",
    fontSize: 13,
    marginTop: 6,
  },
  // <<< CORREÇÃO: Estilos da bottomNav removidos >>>
});