// scripts/start-all.js
const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Iniciando Mock API e Expo...\n');

// Inicia o mock server
const mockServer = spawn('node', ['mock/server.js'], {
  cwd: path.resolve(__dirname, '..'),
  stdio: 'inherit',
  shell: true
});

// Aguarda 2 segundos para o mock server iniciar
setTimeout(() => {
  console.log('\n🌐 Iniciando Expo...\n');
  
  // Inicia o Expo
  const expo = spawn('npx', ['expo', 'start', '--web'], {
    cwd: path.resolve(__dirname, '..'),
    stdio: 'inherit',
    shell: true
  });

  // Garante que os processos sejam encerrados juntos
  process.on('SIGINT', () => {
    console.log('\n\n🛑 Encerrando servidores...');
    mockServer.kill();
    expo.kill();
    process.exit();
  });

  expo.on('exit', (code) => {
    console.log('\n🛑 Expo encerrado. Encerrando mock server...');
    mockServer.kill();
    process.exit(code);
  });
}, 2000);

mockServer.on('error', (err) => {
  console.error('❌ Erro ao iniciar mock server:', err);
  process.exit(1);
});
