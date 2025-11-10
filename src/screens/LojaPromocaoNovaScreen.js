// src/screens/LojaPromocaoNovaScreen.js
import { MaterialIcons } from '@expo/vector-icons';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

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

export default function LojaPromocaoNovaScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.pageTitle}>Promoção nova</Text>

        <TouchableOpacity
          style={styles.addImageBox}
          onPress={() => Alert.alert("Adicionar imagem")}
        >
          <MaterialIcons name="add" size={32} color="#000" />
          <Text style={styles.addImageText}>Adicionar{"\n"}imagem</Text>
        </TouchableOpacity>

        <View style={{ marginTop: 30, gap: 16 }}>
          <TextInput
            placeholder="Nome"
            placeholderTextColor="#bcbcbc"
            style={styles.input}
          />
          <TextInput
            placeholder="Valor"
            placeholderTextColor="#bcbcbc"
            style={styles.input}
          />
          <TextInput
            placeholder="Sobre o procedimento"
            placeholderTextColor="#bcbcbc"
            style={[styles.input, { height: 90 }]}
            multiline
          />
          <TextInput
            placeholder="Resultado"
            placeholderTextColor="#bcbcbc"
            style={styles.input}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert("Promoção adicionada!")}
        >
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// Estilos reutilizados da LojaServicoNovoScreen
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
  pageTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },
  addImageBox: {
    width: 140,
    height: 160,
    borderRadius: 20,
    backgroundColor: "#a6a6a6",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    elevation: 5,
  },
  addImageText: {
    textAlign: "center",
    marginTop: 6,
    fontWeight: "700",
    color: "#000",
  },
  input: {
    backgroundColor: "#1e1e1e",
    borderRadius: 25,
    color: "#fff",
    height: 55,
    paddingHorizontal: 20,
    fontWeight: "600",
  },
  button: {
    marginTop: 40,
    backgroundColor: "#000",
    borderRadius: 20,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    width: 180,
    alignSelf: "center",
    marginBottom: 20,
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});