// src/screens/LojaPerfilScreen.js
import React, { useContext, useState, useEffect } from 'react';
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
  ActivityIndicator,
} from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';

export default function LojaPerfilScreen({ navigation }) {
  const { user, updateProfile } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(''); // campo extra local
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || name.trim().length < 2) {
      Alert.alert('Erro', 'Informe um nome válido.');
      return false;
    }
    if (!email || !emailRegex.test(email)) {
      Alert.alert('Erro', 'E-mail inválido.');
      return false;
    }
    if (password && password.length < 6) {
      Alert.alert('Erro', 'Senha deve ter ao menos 6 caracteres.');
      return false;
    }
    return true;
  };

  const handleUpdate = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const updates = { name, email };
      if (password) updates.password = password;
      await updateProfile(updates);
      Alert.alert('Sucesso', 'Perfil atualizado.');
      setPassword('');
    } catch (e) {
      Alert.alert('Erro', e.message || 'Falha ao atualizar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{ width: 24 }} />
        <Text style={styles.headerTitle}>GlowMana</Text>
        <TouchableOpacity style={styles.bell} onPress={() => navigation.navigate('Notificacoes')}>
          <MaterialIcons name="notifications-none" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, alignItems: 'center' }}>
        <Text style={styles.pageTitle}>Perfil</Text>

        <View style={styles.profileBox}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/847/847969.png' }}
            style={styles.profileImage}
          />
          <TouchableOpacity
            style={styles.addPhotoButton}
            onPress={() => Alert.alert('Alterar foto')}
          >
            <AntDesign name="camera" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={{ width: '100%', marginTop: 30, gap: 16 }}>
          <TextInput
            placeholder="Nome"
            placeholderTextColor="#bcbcbc"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="E-mail"
            placeholderTextColor="#bcbcbc"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Telefone (local)"
            placeholderTextColor="#bcbcbc"
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
          />
          <TextInput
            placeholder="Nova senha (opcional)"
            placeholderTextColor="#bcbcbc"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleUpdate} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Editar perfil</Text>}
        </TouchableOpacity>
      </ScrollView>
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
  bell: {},
  pageTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    alignSelf: 'center',
  },
  profileBox: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#d9d9d9',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
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
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#000',
    borderRadius: 20,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#1e1e1e',
    borderRadius: 25,
    color: '#fff',
    height: 55,
    paddingHorizontal: 20,
    fontWeight: '600',
  },
  button: {
    marginTop: 40,
    backgroundColor: '#000',
    borderRadius: 20,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    alignSelf: 'center',
    marginBottom: 20,
  },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});