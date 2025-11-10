// src/pages/PromocoesScreen.js
import { Ionicons } from '@expo/vector-icons';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const promocoes = [
  {
    id: '1',
    titulo: 'HydraGloss + Henna',
    imagens: [
      require('../assets/Hydragloss.jpeg'),
      require('../assets/Henna.jpeg'),
    ],
  },
  {
    id: '2',
    titulo: 'Volume Egípcio + Banho de Gel',
    imagens: [
      require('../assets/VolumeEgipcio.jpeg'),
      require('../assets/BanhoDeGel.jpeg'),
    ],
  },
  {
    id: '3',
    titulo: 'HydraGloss + Banho de Gel',
    imagens: [
      require('../assets/Hydragloss.jpeg'),
      require('../assets/BanhoDeGel.jpeg'),
    ],
  },
  {
    id: '4',
    titulo: 'Volume Egípcio + Henna',
    imagens: [
      require('../assets/VolumeEgipcio.jpeg'),
      require('../assets/Henna.jpeg'),
    ],
  },
  {
    id: '5',
    titulo: 'HydraGloss + Volume Egípcio',
    imagens: [
      require('../assets/Hydragloss.jpeg'),
      require('../assets/VolumeEgipcio.jpeg'),
    ],
  },
  {
    id: '6',
    titulo: 'Henna + Banho de Gel',
    imagens: [
      require('../assets/Henna.jpeg'),
      require('../assets/BanhoDeGel.jpeg'),
    ],
  },
  {
    id: '7',
    titulo: 'Limpeza de Pele + Henna',
    imagens: [
      require('../assets/Limpeza.jpeg'),
      require('../assets/Henna.jpeg'),
    ],
  },
  {
    id: '8',
    titulo: 'HydraGloss + Banho de Gel',
    imagens: [
      require('../assets/Hydragloss.jpeg'),
      require('../assets/BanhoDeGel.jpeg'),
    ],
  },
];

export default function PromocoesScreen({ navigation }) {
  const handleCardPress = (item) => {
    navigation.navigate('DetalhesPromocao', { promocao: item });
  };

  const renderCard = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleCardPress(item)}>
      <View style={styles.imagesContainer}>
        {item.imagens.map((img, index) => (
          <Image key={index} source={img} style={styles.cardImage} />
        ))}
        <View style={styles.descontoIcon}>
          <Text style={styles.descontoText}>%</Text>
        </View>
      </View>
      <Text style={styles.cardTitle}>{item.titulo}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>GlowMana</Text>
        <Ionicons name="notifications-outline" size={24} color="white" />
      </View>

      {/* Título */}
      <Text style={styles.sectionTitle}>Promoções</Text>

      {/* Lista */}
      <FlatList
        data={promocoes}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  header: {
    backgroundColor: '#555',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  card: {
    backgroundColor: '#2e2e2e',
    borderRadius: 15,
    width: '48%',
    padding: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  imagesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cardImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 3,
  },
  descontoIcon: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 3,
  },
  descontoText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 10,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 5,
  },
});
