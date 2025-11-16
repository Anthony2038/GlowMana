// Teste do sistema de feedback
const http = require('http');

function request(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;

    const options = {
      hostname: 'localhost',
      port: 3001,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (data) {
      options.headers['Content-Length'] = data.length;
    }

    const req = http.request(options, (res) => {
      let responseBody = '';
      res.on('data', (chunk) => {
        responseBody += chunk;
      });
      res.on('end', () => {
        try {
          const result = JSON.parse(responseBody);
          resolve({ status: res.statusCode, data: result });
        } catch (e) {
          resolve({ status: res.statusCode, data: responseBody });
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(data);
    }
    req.end();
  });
}

async function testFeedbackSystem() {
  console.log('🧪 TESTANDO SISTEMA DE FEEDBACK\n');
  console.log('=' .repeat(60));

  // 1. Listar feedbacks existentes
  console.log('\n📋 1. Listando feedbacks existentes...\n');
  try {
    const result = await request('GET', '/feedbacks?visible=true&_sort=date&_order=desc');
    if (result.status === 200) {
      console.log(`✅ ${result.data.length} feedbacks encontrados:`);
      result.data.forEach((fb, idx) => {
        console.log(`   ${idx + 1}. ${fb.userName} - ${fb.rating}⭐ - "${fb.comment.substring(0, 50)}..."`);
      });
    } else {
      console.log(`❌ Erro ao buscar feedbacks - Status ${result.status}`);
    }
  } catch (error) {
    console.log(`❌ Erro: ${error.message}`);
  }

  // 2. Criar novo feedback
  console.log('\n\n📝 2. Criando novo feedback...\n');
  try {
    const newFeedback = {
      userId: 1,
      userName: 'Demo User',
      rating: 5,
      comment: 'Teste automatizado do sistema de feedback. Funcionando perfeitamente!',
      date: new Date().toISOString(),
      visible: true
    };

    const result = await request('POST', '/feedbacks', newFeedback);
    if (result.status === 201) {
      console.log(`✅ Feedback criado com sucesso!`);
      console.log(`   ID: ${result.data.id}`);
      console.log(`   Usuário: ${result.data.userName}`);
      console.log(`   Avaliação: ${result.data.rating}⭐`);
      console.log(`   Comentário: "${result.data.comment}"`);
    } else {
      console.log(`❌ Erro ao criar feedback - Status ${result.status}`);
      console.log(`   Resposta: ${JSON.stringify(result.data)}`);
    }
  } catch (error) {
    console.log(`❌ Erro: ${error.message}`);
  }

  // 3. Buscar feedbacks de um usuário específico
  console.log('\n\n👤 3. Buscando feedbacks do usuário ID 1...\n');
  try {
    const result = await request('GET', '/feedbacks?userId=1&_sort=date&_order=desc');
    if (result.status === 200) {
      console.log(`✅ ${result.data.length} feedback(s) do usuário:`);
      result.data.forEach((fb, idx) => {
        const date = new Date(fb.date).toLocaleDateString('pt-BR');
        console.log(`   ${idx + 1}. [${date}] ${fb.rating}⭐ - "${fb.comment.substring(0, 60)}..."`);
      });
    } else {
      console.log(`❌ Erro - Status ${result.status}`);
    }
  } catch (error) {
    console.log(`❌ Erro: ${error.message}`);
  }

  // 4. Testar validação - feedback sem rating
  console.log('\n\n🔍 4. Testando validação (feedback sem rating)...\n');
  try {
    const invalidFeedback = {
      userId: 1,
      userName: 'Test User',
      comment: 'Comentário sem rating',
      date: new Date().toISOString(),
      visible: true
    };

    const result = await request('POST', '/feedbacks', invalidFeedback);
    console.log(`⚠️  Feedback sem rating foi aceito (validação deve ser feita no app)`);
    console.log(`   ID: ${result.data.id}`);
  } catch (error) {
    console.log(`❌ Erro: ${error.message}`);
  }

  // 5. Criar múltiplos feedbacks de diferentes usuários
  console.log('\n\n🔄 5. Criando múltiplos feedbacks...\n');
  const testFeedbacks = [
    { userId: 3, userName: 'Meu Teste', rating: 4, comment: 'Muito bom, mas pode melhorar o tempo de espera.' },
    { userId: 6, userName: 'kaio', rating: 5, comment: 'Perfeito! Melhor experiência que já tive.' },
    { userId: 9, userName: 'karlosss', rating: 3, comment: 'Razoável. Esperava mais pelo preço.' },
  ];

  for (const feedback of testFeedbacks) {
    try {
      const result = await request('POST', '/feedbacks', {
        ...feedback,
        date: new Date().toISOString(),
        visible: true
      });
      
      if (result.status === 201) {
        console.log(`✅ ${feedback.userName}: ${feedback.rating}⭐`);
      }
    } catch (error) {
      console.log(`❌ Erro ao criar feedback de ${feedback.userName}`);
    }
  }

  // 6. Verificar total de feedbacks após inserções
  console.log('\n\n📊 6. Verificando total de feedbacks...\n');
  try {
    const result = await request('GET', '/feedbacks');
    if (result.status === 200) {
      console.log(`✅ Total de feedbacks no sistema: ${result.data.length}`);
      
      // Calcular média de avaliação
      const ratings = result.data.map(fb => fb.rating).filter(r => r !== undefined);
      const avgRating = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
      console.log(`   Avaliação média: ${avgRating.toFixed(1)}⭐`);
      
      // Distribuição de estrelas
      const distribution = [1, 2, 3, 4, 5].map(star => ({
        star,
        count: ratings.filter(r => r === star).length
      }));
      
      console.log('\n   Distribuição de avaliações:');
      distribution.forEach(({ star, count }) => {
        const bar = '█'.repeat(count);
        console.log(`   ${star}⭐: ${bar} (${count})`);
      });
    }
  } catch (error) {
    console.log(`❌ Erro: ${error.message}`);
  }

  console.log('\n' + '='.repeat(60));
  console.log('✨ Testes do sistema de feedback concluídos!\n');
}

// Executar testes
testFeedbackSystem().catch(error => {
  console.error('❌ Erro fatal:', error);
  process.exit(1);
});
