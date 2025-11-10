// src/screens/AgendamentosScreen.js
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Dados de exemplo
const sampleAppointments = [
  { id: '1', title: 'HydraGloss + Henna', date: '12/08/2025', time: '15:00', address: 'Rua Bolonha, 21' },
  { id: '2', title: 'Volume Egípcio + Banho de Gel', date: '12/08/2025', time: '15:00', address: 'Rua Bolonha, 21' },
];

export default function AgendamentosScreen() { 
  const navigation = useNavigation();

  const handleCardPress = (appointment) => {
    navigation.navigate('AgendamentoDetalhe', { appointment: appointment });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
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

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Agendamentos Confirmados</Text>
        <View style={styles.row}>
          {sampleAppointments.map((a) => (
            <AppointmentCard key={a.id} appointment={a} styleVariant={0} onPress={() => handleCardPress(a)} />
          ))}
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 18 }]}>Agendamentos Aguardando Confirmação</Text>
        <View style={styles.row}>
          {sampleAppointments.map((a) => (
            // <<< MUDANÇA: 'styleVariant' alterado de 1 para 0
            <AppointmentCard key={a.id + 'w'} appointment={a} styleVariant={0} onPress={() => handleCardPress(a)} />
          ))}
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 18 }]}>Agendamentos Cancelados</Text>
        <View style={styles.row}>
          {sampleAppointments.map((a) => (
            // <<< MUDANÇA: 'styleVariant' alterado de 2 para 0
            <AppointmentCard key={a.id + 'c'} appointment={a} styleVariant={0} onPress={() => handleCardPress(a)} />
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// Card do agendamento
function AppointmentCard({ appointment, styleVariant = 0, onPress }) {
  // Agora 'styleVariant' será sempre 0, então os estilos de 'gradient' e 'dark' nunca serão aplicados.
  const gradientColors = styleVariant === 1 ? ['#7f7f7f', '#2b2b2b'] : ['#e6e6e6', '#bfbfbf'];
  const isGradient = styleVariant === 1;
  const dark = styleVariant === 2;
  const CardWrapper = isGradient ? LinearGradient : View;
  const wrapperProps = isGradient
    ? { colors: gradientColors, start: [0, 0], end: [0, 1], style: [styles.card, styles.cardShadow] }
    : { style: [styles.card, styles.cardShadow, dark && styles.cardDark] };

  return (
    <TouchableOpacity style={styles.cardWrapper} onPress={onPress} activeOpacity={0.8}>
      <CardWrapper {...wrapperProps}>
        <CardContent appointment={appointment} dark={dark} />
      </CardWrapper>
    </TouchableOpacity>
  );
}

// Conteúdo do card
function CardContent({ appointment, dark = false }) {
  return (
    <>
      <Text style={[styles.cardTitle, dark && { color: '#fff' }]}>{appointment.title}</Text>
      <View style={{ height: 8 }} />
      <Text style={[styles.cardLabel, dark && { color: '#fff' }]}>
        Dia: <Text style={[styles.cardValue, dark && { color: '#fff' }]}>{appointment.date}</Text>
      </Text>
      <Text style={[styles.cardLabel, dark && { color: '#fff' }]}>
        Horário: <Text style={[styles.cardValue, dark && { color: '#fff' }]}>{appointment.time}</Text>
      </Text>
      <View style={{ flex: 1 }} />
      <View style={styles.addressRow}>
        <View style={styles.iconCircle}>
          <Entypo name="location-pin" size={18} color={dark ? '#fff' : '#2b2b2b'} />
        </View>
        <Text style={[styles.addressText, dark && { color: '#fff' }]}>{appointment.address}</Text>
      </View>
    </>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
  height: 64,
  paddingHorizontal: 16,
  flexDirection: 'row',
  alignItems: 'center', // Centraliza verticalmente
  justifyContent: 'space-between', // Empurra itens para as bordas
},
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '800' },
  bell: {},
  content: { paddingHorizontal: 16, paddingTop: 18, paddingBottom: 40 },
  sectionTitle: { fontSize: 20, fontWeight: '800', marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  cardWrapper: { width: '48%' },
  // Este é o estilo que será usado para todos (styleVariant 0)
  card: { minHeight: 120, borderRadius: 14, padding: 14, backgroundColor: '#ddd', justifyContent: 'flex-start' },
  cardDark: { backgroundColor: '#3a3a3a' },
  cardShadow: { shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 6 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#111' },
  cardLabel: { marginTop: 6, color: '#333', fontWeight: '600' },
  cardValue: { fontWeight: '700' },
  addressRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  iconCircle: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', marginRight: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.12, shadowRadius: 2, elevation: 3 },
  addressText: { fontWeight: '700', color: '#222' },
});