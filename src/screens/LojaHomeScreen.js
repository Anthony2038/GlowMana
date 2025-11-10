// src/screens/LojaHomeScreen.js
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Header Corrigido
const AppHeader = ({ navigation }) => (
  <View style={styles.header}>
    <View style={{ width: 24 }} />
    <Text style={styles.headerTitle}>GlowMana</Text>
    <TouchableOpacity style={styles.bell} onPress={() => navigation.navigate('Notificacoes')}>
      <MaterialIcons name="notifications-none" size={24} color="#fff" />
    </TouchableOpacity>
  </View>
);

// Card de Estatística
const StatCard = ({ icon, value, label }) => (
  <View style={styles.statCard}>
    {icon}
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

// Card de Ação Rápida
const ActionCard = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.actionCard} onPress={onPress}>
    {icon}
    <Text style={styles.actionLabel}>{label}</Text>
  </TouchableOpacity>
);

export default function LojaHomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.welcomeHeader}>
          <Ionicons name="person-circle-outline" size={60} color="#333" />
          <View>
            <Text style={styles.welcomeTitle}>Seja bem-vinda, Mana!</Text>
            <Text style={styles.welcomeSubtitle}>Vem marca teu horário!</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Veja os dados do seu salão hoje:</Text>
        <View style={styles.statsRow}>
          <StatCard icon={<MaterialIcons name="calendar-today" size={32} color="#fff" />} value="4" label="Agendamentos de hoje" />
          <StatCard icon={<MaterialIcons name="cancel" size={32} color="#fff" />} value="1" label="Cancelamentos" />
          <StatCard icon={<MaterialCommunityIcons name="comment-text-outline" size={32} color="#fff" />} value="2" label="Feedbacks" />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Agendamentos de Hoje</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>Veja todos</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.appointmentsRow}>
          <View style={styles.appointmentCard}>
            <Text style={styles.appointmentTitle}>HydraGloss + Henna</Text>
            <Text style={styles.appointmentText}>Dia: 12/08/2025</Text>
            <Text style={styles.appointmentText}>Horário: 15:00</Text>
            <View style={styles.locationRow}>
              <MaterialIcons name="location-pin" size={20} color="#fff" />
              <Text style={styles.appointmentText}>Rua Bolonha, 21</Text>
            </View>
          </View>
          <View style={styles.appointmentCard}>
            <Text style={styles.appointmentTitle}>HydraGloss + Henna</Text>
            <Text style={styles.appointmentText}>Dia: 12/08/2025</Text>
            <Text style={styles.appointmentText}>Horário: 18:00</Text>
            <View style={styles.locationRow}>
              <MaterialIcons name="location-pin" size={20} color="#fff" />
              <Text style={styles.appointmentText}>Rua Bolonha, 21</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Ações Rápidas</Text>
        <View style={styles.statsRow}>
          <ActionCard 
            icon={<MaterialIcons name="add" size={32} color="#fff" />} 
            label={"Cadastrar\ndata e horário"} 
            onPress={() => navigation.navigate('LojaCadastrarHorario')} 
          />
          <ActionCard 
            icon={<MaterialCommunityIcons name="bullhorn-outline" size={32} color="#fff" />} 
            label={"Adicionar\nPromoção"} 
            onPress={() => navigation.navigate('LojaPromocaoNova')} 
          />
          <ActionCard 
            icon={<MaterialCommunityIcons name="scissors-cutting" size={32} color="#fff" />} 
            label={"Adicionar\nServiço"}
            onPress={() => navigation.navigate('LojaServicoNovo')} 
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    height: 60,
    backgroundColor: "#2b2b2b",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  headerTitle: { color: "#fff", fontWeight: "700", fontSize: 20 },
  bell: {},
  scroll: { padding: 20, paddingBottom: 40 },
  welcomeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  welcomeSubtitle: { fontSize: 14, color: '#777' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#6b6b6b',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    width: '31%',
    minHeight: 110,
  },
  statValue: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginVertical: 5 },
  statLabel: { fontSize: 12, color: '#fff', textAlign: 'center' },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seeAll: { fontSize: 14, color: '#555', fontWeight: '500' },
  appointmentsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  appointmentCard: {
    backgroundColor: '#8c8c8c',
    borderRadius: 15,
    padding: 15,
    width: '48%',
  },
  appointmentTitle: { fontSize: 15, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  appointmentText: { fontSize: 13, color: '#fff', marginBottom: 4 },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  actionCard: {
    backgroundColor: '#6b6b6b',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '31%',
    height: 110,
  },
  actionLabel: { fontSize: 12, color: '#fff', textAlign: 'center', marginTop: 8, fontWeight: '500' },
});