const jsonServer = require('json-server');
const path = require('path');
const fs = require('fs');
const LOG_FILE = path.join(__dirname, 'requests.log');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults({
  static: 'public',
});

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Request logger middleware -> append to mock/requests.log
server.use((req, res, next) => {
  try {
    const entry = {
      time: new Date().toISOString(),
      method: req.method,
      path: req.path,
      headers: req.headers,
      body: req.body,
    };
    fs.appendFileSync(LOG_FILE, JSON.stringify(entry) + '\n');
  } catch (e) {
    // ignore logging errors
  }
  next();
});

// Register endpoint
server.post('/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ message: 'name, email and password are required' });
  }

  const db = router.db; // lowdb instance
  const existing = db.get('users').find({ email }).value();
  if (existing) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  const users = db.get('users');
  const id = (users.value().reduce((max, u) => Math.max(max, u.id), 0) || 0) + 1;
  const user = { id, name, email, password };
  users.push(user).write();

  // return a fake token and user
  return res.status(201).json({ token: `fake-jwt-token-${id}`, user: { id, name, email } });
});

// Login endpoint
server.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'email and password are required' });
  }

  const db = router.db;
  const user = db.get('users').find({ email, password }).value();
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  return res.json({ token: `fake-jwt-token-${user.id}`, user: { id: user.id, name: user.name, email: user.email } });
});

// Fallback to default json-server router for other routes
server.use(router);

const PORT = process.env.MOCK_PORT || 3001;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`JSON Server is running at http://localhost:${PORT}`);
});
