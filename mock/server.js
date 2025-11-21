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

// Store Admin Login endpoint
server.post('/auth/store-login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'email and password are required' });
  }

  const db = router.db;
  const admin = db.get('storeAdmins').find({ email, password }).value();
  if (!admin) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  return res.json({ 
    token: `fake-admin-token-${admin.id}`, 
    user: { 
      id: admin.id, 
      name: admin.name, 
      email: admin.email, 
      role: admin.role,
      storeName: admin.storeName 
    } 
  });
});

// Update profile endpoint
server.post('/auth/update', (req, res) => {
  const { token, name, email, password, phone, birthDate, address, profileImage, notifications, promotions } = req.body;
  if (!token) return res.status(401).json({ message: 'token required' });
  const match = token.match(/fake-jwt-token-(\d+)/);
  if (!match) return res.status(401).json({ message: 'invalid token' });
  const userId = parseInt(match[1], 10);
  const db = router.db;
  const user = db.get('users').find({ id: userId }).value();
  if (!user) return res.status(404).json({ message: 'user not found' });

  const updates = {};
  if (name) updates.name = name;
  if (email) {
    const existingEmail = db.get('users').find({ email }).value();
    if (existingEmail && existingEmail.id !== userId) {
      return res.status(409).json({ message: 'Email já usado' });
    }
    updates.email = email;
  }
  if (password) updates.password = password;
  if (phone !== undefined) updates.phone = phone;
  if (birthDate !== undefined) updates.birthDate = birthDate;
  if (address !== undefined) updates.address = address;
  if (profileImage !== undefined) updates.profileImage = profileImage;
  if (notifications !== undefined) updates.notifications = notifications;
  if (promotions !== undefined) updates.promotions = promotions;

  db.get('users').find({ id: userId }).assign(updates).write();
  const updated = db.get('users').find({ id: userId }).value();
  const userData = {
    id: updated.id,
    name: updated.name,
    email: updated.email,
    phone: updated.phone,
    birthDate: updated.birthDate,
    address: updated.address,
    profileImage: updated.profileImage,
    notifications: updated.notifications,
    promotions: updated.promotions,
  };
  return res.json({ user: userData });
});

// Fallback to default json-server router for other routes
server.use(router);

const PORT = process.env.MOCK_PORT || 3001;
server.listen(PORT, () => {
  console.log(`JSON Server is running at http://localhost:${PORT}`);
  console.log(`Available at http://192.168.0.156:${PORT} for mobile devices`);
});
