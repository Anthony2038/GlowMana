const fs = require('fs');
const path = require('path');

// Ler o db.json
const dbPath = path.join(__dirname, 'db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

const BASE_URL = process.env.MOCK_URL || 'http://localhost:3001';

async function validateUser(user) {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log(`✅ [${user.id}] ${user.name} (${user.email}) - LOGIN OK`);
      console.log(`   Token: ${data.token}`);
      return { success: true, user, data };
    } else {
      console.log(`❌ [${user.id}] ${user.name} (${user.email}) - FALHOU`);
      console.log(`   Erro: ${data.message || response.statusText}`);
      return { success: false, user, error: data.message };
    }
  } catch (error) {
    console.log(`❌ [${user.id}] ${user.name} (${user.email}) - ERRO DE CONEXÃO`);
    console.log(`   Erro: ${error.message}`);
    return { success: false, user, error: error.message };
  }
}

async function validateAllUsers() {
  console.log('🔍 Iniciando validação de todos os usuários cadastrados...\n');
  console.log(`Backend: ${BASE_URL}`);
  console.log(`Total de usuários: ${db.users.length}\n`);
  console.log('='.repeat(60));

  const results = [];
  
  for (const user of db.users) {
    const result = await validateUser(user);
    results.push(result);
    console.log('');
  }

  console.log('='.repeat(60));
  console.log('\n📊 RESUMO DA VALIDAÇÃO:\n');

  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  console.log(`✅ Sucessos: ${successful}/${db.users.length}`);
  console.log(`❌ Falhas: ${failed}/${db.users.length}`);

  if (failed > 0) {
    console.log('\n⚠️  Usuários com falha:');
    results
      .filter(r => !r.success)
      .forEach(r => {
        console.log(`   - ${r.user.email}: ${r.error}`);
      });
  }

  console.log('\n✨ Validação concluída!');
  process.exit(failed > 0 ? 1 : 0);
}

// Executar validação
validateAllUsers().catch(error => {
  console.error('❌ Erro fatal:', error);
  process.exit(1);
});
