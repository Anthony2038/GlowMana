// src/screens/PerfilScreen.js
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext, useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
  Image,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../context/AuthContext';

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
      onPress={() => navigation.navigate('Notificacoes')}
    >
      <MaterialIcons name="notifications-none" size={24} color="#fff" />
    </TouchableOpacity>
  </LinearGradient>
);

export default function PerfilScreen({ navigation }) {
  const { user, updateProfile, signOut } = useContext(AuthContext);
  const [secureSenha, setSecureSenha] = useState(true);
  const [secureConfirma, setSecureConfirma] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [address, setAddress] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [promotions, setPromotions] = useState(true);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setBirthDate(user.birthDate || '');
      setAddress(user.address || '');
      setProfileImage(user.profileImage || null);
      setNotifications(user.notifications !== false);
      setPromotions(user.promotions !== false);
    }
  }, [user]);

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Precisamos de acesso à galeria.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao selecionar imagem.');
    }
  };

  const formatPhone = (text) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length <= 10) {
      return cleaned.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    }
    return cleaned.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
  };

  const formatDate = (text) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length <= 2) return cleaned;
    if (cleaned.length <= 4) return cleaned.replace(/(\d{2})(\d{0,2})/, '$1/$2');
    return cleaned.replace(/(\d{2})(\d{2})(\d{0,4})/, '$1/$2/$3').slice(0, 10);
  };

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || name.trim().length < 2) {
      Alert.alert('Erro', 'Informe um nome válido.');
      return false;
    }
    if (!email || !emailRegex.test(email)) {
      Alert.alert('Erro', 'Informe um e-mail válido.');
      return false;
    }
    if (phone && phone.replace(/\D/g, '').length < 10) {
      Alert.alert('Erro', 'Telefone inválido.');
      return false;
    }
    if (password && password.length < 6) {
      Alert.alert('Erro', 'A nova senha deve ter ao menos 6 caracteres.');
      return false;
    }
    if (password && password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const updates = { 
        name, 
        email, 
        phone: phone.replace(/\D/g, ''),
        birthDate,
        address,
        profileImage,
        notifications,
        promotions,
      };
      if (password) updates.password = password;
      await updateProfile(updates);
      Alert.alert('Sucesso', 'Perfil atualizado.');
      setPassword('');
      setConfirmPassword('');
    } catch (e) {
      Alert.alert('Erro', e.message || 'Falha ao atualizar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <AppHeader navigation={navigation} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.pageTitle}>Perfil</Text>

        <View style={styles.avatarContainer}>
          <TouchableOpacity style={styles.avatar} activeOpacity={0.8} onPress={pickImage}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.avatarImage} />
            ) : (
              <Ionicons name="person" size={80} color="#555" />
            )}
            <View style={styles.cameraIcon}>
              <Ionicons name="camera" size={20} color="white" />
            </View>
          </TouchableOpacity>
          <Text style={styles.avatarHint}>Toque para alterar foto</Text>
        </View>

        <Text style={styles.sectionTitle}>Informações Pessoais</Text>

        <Text style={styles.label}>Nome Completo</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Digite seu nome"
          />
          <Ionicons name="pencil" size={20} color="#555" style={styles.inputIcon} />
        </View>

        <Text style={styles.label}>E-mail</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="seu@email.com"
          />
          <Ionicons name="pencil" size={20} color="#555" style={styles.inputIcon} />
        </View>

        <Text style={styles.label}>Telefone</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={(text) => setPhone(formatPhone(text))}
            keyboardType="phone-pad"
            placeholder="(00) 00000-0000"
            maxLength={15}
          />
          <Ionicons name="call" size={20} color="#555" style={styles.inputIcon} />
        </View>

        <Text style={styles.label}>Data de Nascimento</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={birthDate}
            onChangeText={(text) => setBirthDate(formatDate(text))}
            keyboardType="numeric"
            placeholder="DD/MM/AAAA"
            maxLength={10}
          />
          <Ionicons name="calendar" size={20} color="#555" style={styles.inputIcon} />
        </View>

        <Text style={styles.label}>Endereço</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Rua, número, bairro"
            multiline
          />
          <Ionicons name="location" size={20} color="#555" style={styles.inputIcon} />
        </View>

        <Text style={styles.sectionTitle}>Segurança</Text>

        <Text style={styles.label}>Nova senha (opcional)</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureSenha}
            placeholder="Deixe em branco para manter"
          />
          <TouchableOpacity onPress={() => setSecureSenha(!secureSenha)}>
            <Ionicons
              name={secureSenha ? "eye-outline" : "eye-off-outline"}
              size={24}
              color="#555"
              style={styles.inputIcon}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Confirmar nova senha</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={secureConfirma}
            placeholder="Confirme a nova senha"
          />
          <TouchableOpacity onPress={() => setSecureConfirma(!secureConfirma)}>
            <Ionicons
              name={secureConfirma ? "eye-outline" : "eye-off-outline"}
              size={24}
              color="#555"
              style={styles.inputIcon}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Preferências</Text>

        <TouchableOpacity 
          style={styles.preferenceRow}
          onPress={() => setNotifications(!notifications)}
        >
          <View style={styles.preferenceLeft}>
            <Ionicons name="notifications" size={24} color="#333" />
            <View style={styles.preferenceText}>
              <Text style={styles.preferenceTitle}>Notificações</Text>
              <Text style={styles.preferenceSubtitle}>Receber alertas sobre agendamentos</Text>
            </View>
          </View>
          <View style={[styles.switch, notifications && styles.switchActive]}>
            <View style={[styles.switchThumb, notifications && styles.switchThumbActive]} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.preferenceRow}
          onPress={() => setPromotions(!promotions)}
        >
          <View style={styles.preferenceLeft}>
            <Ionicons name="pricetag" size={24} color="#333" />
            <View style={styles.preferenceText}>
              <Text style={styles.preferenceTitle}>Promoções</Text>
              <Text style={styles.preferenceSubtitle}>Receber ofertas exclusivas</Text>
            </View>
          </View>
          <View style={[styles.switch, promotions && styles.switchActive]}>
            <View style={[styles.switchThumb, promotions && styles.switchThumbActive]} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} activeOpacity={0.8} onPress={handleSave} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>Salvar Alterações</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.logoutButton} 
          activeOpacity={0.8}
          onPress={() => {
            Alert.alert(
              'Sair',
              'Deseja realmente sair da sua conta?',
              [
                { text: 'Cancelar', style: 'cancel' },
                { 
                  text: 'Sair', 
                  onPress: async () => {
                    await signOut();
                    navigation.navigate('Initial');
                  },
                  style: 'destructive'
                }
              ]
            );
          }}
        >
          <Ionicons name="log-out-outline" size={20} color="#ff3b30" />
          <Text style={styles.logoutButtonText}>Sair da Conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingHorizontal: 25,
    paddingBottom: 40,
  },
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
    height: '100%',
    justifyContent: 'center',
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  avatarImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  avatarHint: {
    marginTop: 8,
    fontSize: 13,
    color: '#888',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#333',
    borderRadius: 15,
    padding: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 25,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  inputIcon: {
    padding: 15,
  },
  preferenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  preferenceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  preferenceText: {
    marginLeft: 15,
    flex: 1,
  },
  preferenceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  preferenceSubtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  switch: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#D1D1D6',
    padding: 2,
    justifyContent: 'center',
  },
  switchActive: {
    backgroundColor: '#34C759',
  },
  switchThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  switchThumbActive: {
    alignSelf: 'flex-end',
  },
  saveButton: {
    backgroundColor: '#000000',
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 30,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 15,
    marginTop: 15,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#ff3b30',
  },
  logoutButtonText: {
    color: '#ff3b30',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});