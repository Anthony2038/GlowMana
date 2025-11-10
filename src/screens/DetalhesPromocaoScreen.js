// src/screens/DetalhesPromocaoScreen.js
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// Componente de Cabeçalho (padrão do app)
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
      onPress={() => navigation.navigate('Notificacoes')} // Navega para Notificações
    >
      <MaterialIcons name="notifications-none" size={24} color="#fff" />
    </TouchableOpacity>
  </LinearGradient>
);

export default function DetalhesPromocaoScreen({ route, navigation }) {
  // Recebe o item da promoção da tela anterior
  const { promocao } = route.params;

  // Dados de exemplo, já que 'promocao' só tem 'titulo' por enquanto
  const dadosPromocao = {
    titulo: promocao.titulo || "PROMOÇÃO HydraGloss + Henna",
    valor: "R$120,00",
    descricao: {
      hydrogloss: "hidratação labial profunda que regenera, nutre e dá brilho aos lábios, deixando-os mais macios, viçosos e com aspecto saudável.",
      henna: "aplicação de pigmento natural que preenche falhas, define o desenho e realça o olhar com efeito temporário.",
      resultado: "lábios hidratados e luminosos + sobrancelhas definidas, preenchidas e harmônicas.",
      duracao: "Henna até 7 dias na pele e 15 dias nos fios."
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <AppHeader navigation={navigation} />
      
      <ScrollView>
        <Text style={styles.pageTitle}>{dadosPromocao.titulo.toUpperCase()}</Text>

        <View style={styles.imagesContainer}>
          {/* ADICIONE SUAS IMAGENS DA PROMOÇÃO AQUI */}
          <Image 
            source={require('../assets/Hydragloss.jpeg')} // Ex: require('../assets/promocao/hydragloss.png')
            style={styles.promoImage} 
          />
          <Image 
            source={require('../assets/Henna.jpeg')} // Ex: require('../assets/promocao/henna.png')
            style={styles.promoImage} 
          />
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.price}>Valor: {dadosPromocao.valor}</Text>
          <Text style={styles.subTitle}>Sobre os procedimentos:</Text>
          
          <Text style={styles.description}>
            <Text style={styles.bold}>HydroGloss: </Text>
            {dadosPromocao.descricao.hydrogloss}
          </Text>
          <Text style={styles.description}>
            <Text style={styles.bold}>Henna: </Text>
            {dadosPromocao.descricao.henna}
          </Text>
           <Text style={styles.description}>
            <Text style={styles.bold}>Resultado: </Text>
            {dadosPromocao.descricao.resultado}
          </Text>
           <Text style={styles.description}>
            <Text style={styles.bold}>Duração da henna: </Text>
            {dadosPromocao.descricao.duracao}
          </Text>
        </View>

        <TouchableOpacity style={styles.agendarButton} activeOpacity={0.8}>
          <Text style={styles.agendarButtonText}>Agendar</Text>
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
  // Estilos do Cabeçalho
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
    // Adicione estas duas linhas
    height: '100%', // Faz o TouchableOpacity ter a altura total do header
    justifyContent: 'center', // Centraliza o ícone verticalmente dentro dele
  },
  // Estilos da Página
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 20,
    marginHorizontal: 15,
  },
  imagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 15,
  },
  promoImage: {
    width: 160,
    height: 160,
    borderRadius: 20,
    backgroundColor: '#e0e0e0', // Cor de fundo enquanto a imagem não carrega
  },
  detailsCard: {
    backgroundColor: '#2e2e2e',
    borderRadius: 25,
    padding: 25,
    margin: 15,
    marginTop: 25,
  },
  price: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  subTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    color: '#e0e0e0',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
  },
  bold: {
    fontWeight: 'bold',
    color: '#fff',
  },
  agendarButton: {
    backgroundColor: '#2e2e2e',
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 40,
  },
  agendarButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});