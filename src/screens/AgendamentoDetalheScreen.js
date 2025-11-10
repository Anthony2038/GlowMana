import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AgendamentosDetalhe({ route, navigation }) {
  const { appointment } = route.params;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={{ color: "blue", marginBottom: 20 }}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{appointment.title}</Text>
      <Text>Data: {appointment.date}</Text>
      <Text>Horário: {appointment.time}</Text>
      <Text>Endereço: {appointment.address}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 20 },
});
