// Teste simples de login
const http = require('http');

function testLogin(email, password) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ email, password });

    const options = {
      hostname: 'localhost',
      port: 3001,
      path: '/auth/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
      },
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const result = JSON.parse(body);
          resolve({ status: res.statusCode, data: result });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.write(data);
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Testando Login com usuários do db.json\n');

  const users = [
    { email: 'test@demo.com', password: 'password123', name: 'Demo User' },
    { email: 'meu@teste.com', password: 'senha123', name: 'Meu Teste' },
    { email: 'kaiomarciosol@gmail.com', password: 'kaio2918', name: 'Kaio' },
  ];

  for (const user of users) {
    try {
      console.log(`\n🔐 Testando: ${user.name} (${user.email})`);
      const result = await testLogin(user.email, user.password);

      if (result.status === 200) {
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
  }

  console.log('\n\n🧪 Testando Cadastro de Novo Usuário\n');

  try {
    const newUser = {
      name: 'Teste Auto ' + Date.now(),
      email: `teste${Date.now()}@demo.com`,
      password: 'senha123',
    };

    console.log(`📝 Criando usuário: ${newUser.email}`);

    const data = JSON.stringify(newUser);
    const options = {
      hostname: 'localhost',
      port: 3001,
      path: '/auth/register',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
      },
    };

    const result = await new Promise((resolve, reject) => {
      const req = http.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => {
          body += chunk;
        });
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, data: JSON.parse(body) });
          } catch (e) {
            resolve({ status: res.statusCode, data: body });
          }
        });
      });

      req.on('error', reject);
      req.write(data);
      req.end();
    });

    if (result.status === 201) {
      console.log(`   ✅ CADASTRO SUCESSO!`);
      console.log(`   Token: ${result.data.token}`);
      console.log(`   User: ${JSON.stringify(result.data.user)}`);

      // Tentar fazer login com o novo usuário
      console.log(`\n🔐 Testando login com o novo usuário...`);
      const loginResult = await testLogin(newUser.email, newUser.password);

      if (loginResult.status === 200) {
        console.log(`   ✅ LOGIN SUCESSO após cadastro!`);
      } else {
        console.log(`   ❌ LOGIN FALHOU após cadastro`);
      }
    } else {
      console.log(`   ❌ CADASTRO FALHOU - Status ${result.status}`);
      console.log(`   Resposta: ${JSON.stringify(result.data)}`);
    }
  } catch (error) {
    console.log(`   ❌ ERRO: ${error.message}`);
  }

  console.log('\n✨ Testes concluídos!\n');
}

runTests();
