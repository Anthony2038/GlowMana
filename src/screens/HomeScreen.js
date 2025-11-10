// src/screens/HomeScreen.js
import { Ionicons } from '@expo/vector-icons';
// <<< MUDANÇA: Importei useNavigation para navegar
import { useNavigation } from '@react-navigation/native';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// --- Dados Mock (Exemplos) ---
// <<< MUDANÇA: Adicionei dados para as promoções
const promocoesData = [
  {
    id: 'p1',
    title: 'HydraGloss + Henna',
    // ADICIONE SUAS IMAGENS
    image1: require('../assets/Hydragloss.jpeg'),
    image2: require('../assets/Henna.jpeg'),
  },
  {
    id: 'p2',
    title: 'Volume Egípcio + Banho de Gel',
    // ADICIONE SUAS IMAGENS
    image1: require('../assets/VolumeEgipcio.jpeg'),
    image2: require('../assets/BanhoDeGel.jpeg'),
  },
];

// <<< MUDANÇA: Adicionei mais serviços
const servicosData = [
  { id: 's1', title: 'HydraGloss', image: require('../assets/Hydragloss.jpeg') },
  { id: 's2', title: 'Limpeza de pele', image: require('../assets/Limpeza.jpeg') },
  { id: 's3', title: 'Volume Egípcio', image: require('../assets/VolumeEgipcio.jpeg') },
  { id: 's4', title: 'Banho de Gel', image: require('../assets/BanhoDeGel.jpeg') },
  { id: 's5', title: 'Design Sobrancelha', image: require('../assets/DesignDeSobrancelha.jpeg') },
];

// <<< MUDANÇA: Adicionei dados para o novo carrossel "Os mais populares"
const popularesData = [
  { id: 'pop1', title: 'Limpeza de pele', image: require('../assets/Limpeza.jpeg') },
  { id: 'pop2', title: 'HydraGloss', image: require('../assets/Hydragloss.jpeg') },
  { id: 'pop3', title: 'Banho de Gel', image: require('../assets/BanhoDeGel.jpeg') },
];
// --- Fim dos Dados Mock ---


// Componentes para os cards para evitar repetição
// <<< MUDANÇA: Adicionado 'onPress' para navegação
const ServiceCard = ({ image, title, onPress }) => (
  <TouchableOpacity style={styles.serviceCard} onPress={onPress}>
    {/* ADICIONE AS IMAGENS DOS SERVIÇOS AQUI */}
    <Image source={image} style={styles.serviceImage} />
    <Text style={styles.serviceTitle}>{title}</Text>
  </TouchableOpacity>
);

// <<< MUDANÇA: Adicionado 'onPress' para navegação
const PromotionCard = ({ image1, image2, title, onPress }) => (
    <TouchableOpacity style={styles.promoCard} onPress={onPress}>
        <View style={styles.promoImageContainer}>
            {/* ADICIONE AS IMAGENS DAS PROMOÇÕES AQUI */}
            <Image source={image1} style={styles.promoImageSmall} />
            <Image source={image2} style={styles.promoImageSmall} />
            <View style={styles.percentBadge}>
                <Text style={styles.percentText}>%</Text>
            </View>
        </View>
        <Text style={styles.promoTitle}>{title}</Text>
    </TouchableOpacity>
);


const HomeScreen = () => {
  // <<< MUDANÇA: Inicializei o hook de navegação
  const navigation = useNavigation();

  return (
    <View style={styles.safeArea}>
      {/* <<< MUDANÇA: Adicionei paddingBottom para dar espaço no fim da tela */}
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.header}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.avatar}>
                    <Ionicons name="person-outline" size={24} color="#555" />
                </View>
                <View>
                    <Text style={styles.welcomeTitle}>Seja bem-vinda, Mana!</Text>
                    <Text style={styles.welcomeSubtitle}>Vem marca teu horário!</Text>
                </View>
            </View>
          {/* <<< MUDANÇA: Navegação para Notificações adicionada */}
          <TouchableOpacity onPress={() => navigation.navigate('Notificacoes')}>
            <Ionicons name="notifications-outline" size={28} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Seção de Promoções */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Promoções</Text>
            {/* <<< MUDANÇA: Navegação para a tela de Promoções */}
            <TouchableOpacity onPress={() => navigation.navigate('Promocoes')}>
              <Text style={styles.seeAll}>Veja todos</Text>
            </TouchableOpacity>
          </View>
          {/* <<< MUDANÇA: Adicionado paddingLeft para alinhar com os títulos */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 20 }}>
            {/* <<< MUDANÇA: Mapeando os dados e adicionando navegação */}
            {promocoesData.map((item) => (
              <PromotionCard
                key={item.id}
                title={item.title}
                image1={item.image1}
                image2={item.image2}
                onPress={() => navigation.navigate('DetalhesPromocao', { promocao: item })}
              />
            ))}
          </ScrollView>
        </View>

        {/* Seção de Serviços */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Serviços</Text>
             <TouchableOpacity>
              <Text style={styles.seeAll}>Veja todos</Text>
            </TouchableOpacity>
          </View>
          {/* <<< MUDANÇA: Adicionado paddingLeft e mapeando mais dados */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 20 }}>
            {servicosData.map((item) => (
              <ServiceCard 
                key={item.id} 
                title={item.title} 
                image={item.image}
                onPress={() => { /* Adicione navegação para serviço específico se desejar */ }}
              />
            ))}
          </ScrollView>
        </View>

        {/* <<< MUDANÇA: Seção "Os mais populares" transformada em carrossel */}
        <View style={styles.section}>
            {/* <<< MUDANÇA: Cabeçalho alinhado igual aos outros */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Os mais populares</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>Veja todos</Text>
              </TouchableOpacity>
            </View>
            
            {/* <<< MUDANÇA: Carrossel horizontal */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 20, paddingRight: 10 }}>
              {popularesData.map((item) => (
                <TouchableOpacity 
                  key={item.id} 
                  style={styles.popularCarouselCard} // <<< MUDANÇA: Novo estilo de card
                  onPress={() => { /* Adicione navegação se desejar */ }}
                >
                  {/* ADICIONE SUA IMAGEM */}
                  <Image source={item.image} style={styles.popularImage} />
                  <View style={styles.popularOverlay} />
                  <Text style={styles.popularTitle}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
        </View>
        
      </ScrollView>
       {/* <<< MUDANÇA: Barra de Navegação Inferior (Fake) REMOVIDA 
           O App.js agora cuida da navegação real.
       */}
    </View>
  );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8F8F8'
    },
    container: {
        flex: 1,
        paddingTop: 50,
        // <<< MUDANÇA: Adicionado espaço no final da rolagem
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#EAEAEA',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    welcomeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    welcomeSubtitle: {
        fontSize: 14,
        color: '#777',
    },
    section: {
        marginBottom: 30,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    seeAll: {
        fontSize: 14,
        color: '#555',
        fontWeight: '500',
    },
    promoCard: {
        width: 170,
        height: 120,
        backgroundColor: '#333',
        borderRadius: 20,
        // <<< MUDANÇA: Trocado marginLeft por marginRight para espaçamento
        marginRight: 15,
        padding: 10,
        justifyContent: 'space-between',
    },
    promoImageContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    promoImageSmall: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderColor: '#FFF',
        borderWidth: 2,
        marginLeft: -15,
    },
    percentBadge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: 'white',
        borderRadius: 12,
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    percentText: {
        fontWeight: 'bold',
        color: '#333',
    },
    promoTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    serviceCard: {
        alignItems: 'center',
        // <<< MUDANÇA: Trocado marginLeft por marginRight
        marginRight: 20,
        width: 100,
    },
    serviceImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    serviceTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
        textAlign: 'center'
    },
    // <<< MUDANÇA: Estilo para o novo card do carrossel "Populares"
    popularCarouselCard: {
        height: 180,
        width: 280, // Tamanho fixo para o carrossel
        marginRight: 15, // Espaçamento
        borderRadius: 20,
        overflow: 'hidden',
        justifyContent: 'flex-end',
    },
    popularImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    popularOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    popularTitle: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        margin: 20,
    },
    // <<< MUDANÇA: Estilos da barra de navegação fake removidos
});

export default HomeScreen;