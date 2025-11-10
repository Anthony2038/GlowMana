// src/screens/LojaServicoNovoScreen.js
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// <<< MUDANÇA: Usando MaterialIcons para consistência
import { MaterialIcons } from "@expo/vector-icons";

export default function LojaServicoNovoScreen({ navigation }) { // Adicionado navigation
  return (
    <SafeAreaView style={styles.container}>
      {/* Header Corrigido */}
      <View style={styles.header}>
        <View style={{ width: 24 }} />
        <Text style={styles.headerTitle}>GlowMana</Text>
        <TouchableOpacity style={styles.bell} onPress={() => navigation.navigate('Notificacoes')}>
          <MaterialIcons name="notifications-none" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.pageTitle}>Serviço novo</Text>

        {/* Adicionar imagem */}
        <TouchableOpacity
          style={styles.addImageBox}
          onPress={() => Alert.alert("Adicionar imagem")}
        >
          <MaterialIcons name="add" size={32} color="#000" />
          <Text style={styles.addImageText}>Adicionar{"\n"}imagem</Text>
        </TouchableOpacity>

        {/* Campos */}
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

        {/* Botão */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert("Serviço adicionado!")}
        >
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
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
    justifyContent: "space-between", // <<< MUDANÇA
    paddingHorizontal: 16, // <<< MUDANÇA
  },
  headerTitle: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 20,
  },
  bell: { 
    // position: "absolute" removido 
  },
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