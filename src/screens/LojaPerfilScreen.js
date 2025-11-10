// src/screens/LojaPerfilScreen.js
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// <<< MUDANÇA: Usando MaterialIcons para consistência
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

export default function LojaPerfilScreen({ navigation }) { // Adicionado navigation
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

      <ScrollView contentContainerStyle={{ padding: 20, alignItems: "center" }}>
        {/* Título */}
        <Text style={styles.pageTitle}>Perfil</Text>

        {/* Foto de perfil */}
        <View style={styles.profileBox}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
            }}
            style={styles.profileImage}
          />
          <TouchableOpacity
            style={styles.addPhotoButton}
            onPress={() => Alert.alert("Alterar foto")}
          >
            <AntDesign name="camera" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Campos */}
        <View style={{ width: "100%", marginTop: 30, gap: 16 }}>
          <TextInput
            placeholder="Nome"
            placeholderTextColor="#bcbcbc"
            style={styles.input}
          />
          <TextInput
            placeholder="E-mail"
            placeholderTextColor="#bcbcbc"
            style={styles.input}
          />
          <TextInput
            placeholder="Telefone"
            placeholderTextColor="#bcbcbc"
            style={styles.input}
          />
          <TextInput
            placeholder="Senha"
            placeholderTextColor="#bcbcbc"
            secureTextEntry
            style={styles.input}
          />
        </View>

        {/* Botão */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert("Perfil atualizado!")}
        >
          <Text style={styles.buttonText}>Editar perfil</Text>
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
    alignSelf: "center",
  },
  profileBox: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "#d9d9d9",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    elevation: 6,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  addPhotoButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#000",
    borderRadius: 20,
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
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
    width: 200,
    alignSelf: "center",
    marginBottom: 20,
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});