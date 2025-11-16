// Teste completo de autenticação
const http = require('http');

function request(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;

    const options = {
      hostname: 'localhost',
      port: 3005,
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
          resolve({ status: res.statusCode, data: JSON.parse(responseBody) });
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

async function testAuthComplete() {
  console.log('🔐 TESTE COMPLETO DE AUTENTICAÇÃO\n');
  console.log('=' .repeat(60));

  // 1. Login com credenciais corretas
  console.log('\n✅ 1. Login com credenciais VÁLIDAS');
  console.log('   Email: test@demo.com');
  console.log('   Senha: password123');
  try {
    const result = await request('POST', '/auth/login', { 
      email: 'test@demo.com', 
      password: 'password123' 
    });
    
    if (result.status === 200 && result.data.token) {
      console.log(`   ✅ LOGIN SUCESSO!`);
      console.log(`   Token: ${result.data.token}`);
      console.log(`   User: ${JSON.stringify(result.data.user)}`);
    } else {
      console.log(`   ❌ FALHOU - Status ${result.status}`);
      console.log(`   Resposta: ${JSON.stringify(result.data)}`);
    }
  } catch (error) {
    console.log(`   ❌ ERRO: ${error.message}`);
  }

  // 2. Login com senha incorreta
  console.log('\n\n❌ 2. Login com senha INCORRETA');
  console.log('   Email: test@demo.com');
  console.log('   Senha: senhaerrada');
  try {
    const result = await request('POST', '/auth/login', { 
      email: 'test@demo.com', 
      password: 'senhaerrada' 
    });
    
    if (result.status === 401) {
      console.log(`   ✅ Erro esperado retornado corretamente`);
      console.log(`   Mensagem: ${result.data.message}`);
    } else {
      console.log(`   ⚠️  Status inesperado: ${result.status}`);
      console.log(`   Resposta: ${JSON.stringify(result.data)}`);
    }
  } catch (error) {
    console.log(`   ❌ ERRO: ${error.message}`);
  }

  // 3. Login com email inexistente
  console.log('\n\n❌ 3. Login com email INEXISTENTE');
  console.log('   Email: naoexiste@demo.com');
  console.log('   Senha: password123');
  try {
    const result = await request('POST', '/auth/login', { 
      email: 'naoexiste@demo.com', 
      password: 'password123' 
    });
    
    if (result.status === 401) {
      console.log(`   ✅ Erro esperado retornado corretamente`);
      console.log(`   Mensagem: ${result.data.message}`);
    } else {
      console.log(`   ⚠️  Status inesperado: ${result.status}`);
      console.log(`   Resposta: ${JSON.stringify(result.data)}`);
    }
  } catch (error) {
    console.log(`   ❌ ERRO: ${error.message}`);
  }

  // 4. Cadastro de novo usuário
  console.log('\n\n📝 4. CADASTRO de novo usuário');
  const newEmail = `teste${Date.now()}@demo.com`;
  console.log(`   Nome: Usuário Teste`);
  console.log(`   Email: ${newEmail}`);
  console.log(`   Senha: senha123`);
  try {
    const result = await request('POST', '/auth/register', { 
      name: 'Usuário Teste',
      email: newEmail,
      password: 'senha123' 
    });
    
    if (result.status === 201 && result.data.token) {
      console.log(`   ✅ CADASTRO SUCESSO!`);
      console.log(`   Token: ${result.data.token}`);
      console.log(`   User ID: ${result.data.user.id}`);
      
      // 5. Login com o usuário recém-cadastrado
      console.log('\n\n🔄 5. Login com usuário RECÉM-CADASTRADO');
      const loginResult = await request('POST', '/auth/login', { 
        email: newEmail,
        password: 'senha123' 
      });
      
      if (loginResult.status === 200 && loginResult.data.token) {
        console.log(`   ✅ LOGIN SUCESSO após cadastro!`);
        console.log(`   Token: ${loginResult.data.token}`);
      } else {
        console.log(`   ❌ LOGIN FALHOU após cadastro`);
        console.log(`   Status: ${loginResult.status}`);
      }
    } else {
      console.log(`   ❌ CADASTRO FALHOU - Status ${result.status}`);
      console.log(`   Resposta: ${JSON.stringify(result.data)}`);
    }
  } catch (error) {
    console.log(`   ❌ ERRO: ${error.message}`);
  }

  // 6. Cadastro com email já existente
  console.log('\n\n⚠️  6. Cadastro com email JÁ EXISTENTE');
  console.log('   Email: test@demo.com (já cadastrado)');
  try {
    const result = await request('POST', '/auth/register', { 
      name: 'Tentativa Duplicada',
      email: 'test@demo.com',
      password: 'senha123' 
    });
    
    if (result.status === 409) {
      console.log(`   ✅ Erro esperado retornado corretamente`);
      console.log(`   Mensagem: ${result.data.message}`);
    } else {
      console.log(`   ⚠️  Status inesperado: ${result.status}`);
      console.log(`   Resposta: ${JSON.stringify(result.data)}`);
    }
  } catch (error) {
    console.log(`   ❌ ERRO: ${error.message}`);
  }

  // 7. Testar todos os usuários do db.json
  console.log('\n\n👥 7. Testando LOGIN de TODOS os usuários cadastrados');
  const testUsers = [
    { email: 'test@demo.com', password: 'password123', name: 'Demo User' },
    { email: 'autodebug@demo.com', password: 'password123', name: 'Auto Test Debug' },
    { email: 'meu@teste.com', password: 'senha123', name: 'Meu Teste' },
    { email: 'novo@demo.com', password: 'password123', name: 'Novo Usuário' },
    { email: 'kaiomarciosol@gmail.com', password: 'kaio2918', name: 'kaio' },
  ];

  let successCount = 0;
  for (const user of testUsers) {
    try {
      const result = await request('POST', '/auth/login', { 
        email: user.email, 
        password: user.password 
      });
      
      if (result.status === 200) {
        console.log(`   ✅ ${user.name}`);
        successCount++;
      } else {
        console.log(`   ❌ ${user.name} - Status ${result.status}`);
      }
    } catch (error) {
      console.log(`   ❌ ${user.name} - ${error.message}`);
    }
  }

  console.log(`\n   Total: ${successCount}/${testUsers.length} logins bem-sucedidos`);

  console.log('\n' + '='.repeat(60));
  console.log('✨ Testes de autenticação concluídos!\n');
  
  console.log('📋 CREDENCIAIS VÁLIDAS PARA TESTE NO APP:\n');
  console.log('   Email: test@demo.com');
  console.log('   Senha: password123');
  console.log('\n   Email: meu@teste.com');
  console.log('   Senha: senha123');
  console.log('\n   Email: kaiomarciosol@gmail.com');
  console.log('   Senha: kaio2918');
  console.log('\n⚠️  IMPORTANTE: Servidor mock deve estar rodando na porta 3005');
  console.log('   O app está configurado para: http://192.168.0.156:3005\n');
}

// Executar testes
testAuthComplete().catch(error => {
  console.error('❌ Erro fatal:', error);
  process.exit(1);
});
