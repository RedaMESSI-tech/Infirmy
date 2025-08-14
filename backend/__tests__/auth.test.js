import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../src/index.js';
import User from '../src/models/User.js';

let mongoServer;

beforeAll(async () => {
  // Démarrer MongoDB en mémoire pour les tests
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Nettoyer après les tests
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  // Nettoyer la base de données avant chaque test
  await User.deleteMany({});
});

describe('POST /api/auth/register', () => {
  it('devrait créer un nouvel utilisateur avec des données valides', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'Password123!',
      role: 'patient',
      firstName: 'John',
      lastName: 'Doe',
      phone: '0123456789'
    };

    const response = await request(app)
      .post('/api/auth/register')
      .send(userData)
      .expect(201);

    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user');
    expect(response.body.user.email).toBe(userData.email);
    expect(response.body.user.role).toBe(userData.role);
    expect(response.body.user.firstName).toBe(userData.firstName);
    expect(response.body.user.lastName).toBe(userData.lastName);
    expect(response.body.user.phone).toBe(userData.phone);
    expect(response.body.user).not.toHaveProperty('password');
  });

  it('devrait refuser l\'inscription avec un email déjà utilisé', async () => {
    // Créer un utilisateur existant
    await User.create({
      email: 'test@example.com',
      password: 'hashedPassword',
      role: 'patient',
      firstName: 'Jane',
      lastName: 'Doe'
    });

    const userData = {
      email: 'test@example.com',
      password: 'Password123!',
      role: 'nurse',
      firstName: 'John',
      lastName: 'Smith'
    };

    const response = await request(app)
      .post('/api/auth/register')
      .send(userData)
      .expect(409);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toContain('déjà utilisé');
  });

  it('devrait refuser l\'inscription avec des données manquantes', async () => {
    const userData = {
      email: 'test@example.com',
      // password manquant
      role: 'patient'
    };

    const response = await request(app)
      .post('/api/auth/register')
      .send(userData)
      .expect(400);

    expect(response.body).toHaveProperty('errors');
  });
});

describe('POST /api/auth/login', () => {
  beforeEach(async () => {
    // Créer un utilisateur de test
    await User.create({
      email: 'test@example.com',
      password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4tbQJ6iK2O', // Password123!
      role: 'patient',
      firstName: 'John',
      lastName: 'Doe'
    });
  });

  it('devrait connecter un utilisateur avec des identifiants valides', async () => {
    const loginData = {
      email: 'test@example.com',
      password: 'Password123!'
    };

    const response = await request(app)
      .post('/api/auth/login')
      .send(loginData)
      .expect(200);

    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user');
    expect(response.body.user.email).toBe(loginData.email);
    expect(response.body.message).toBe('Connexion réussie');
  });

  it('devrait refuser la connexion avec un mot de passe incorrect', async () => {
    const loginData = {
      email: 'test@example.com',
      password: 'WrongPassword123!'
    };

    const response = await request(app)
      .post('/api/auth/login')
      .send(loginData)
      .expect(401);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toContain('incorrect');
  });

  it('devrait refuser la connexion avec un email inexistant', async () => {
    const loginData = {
      email: 'nonexistent@example.com',
      password: 'Password123!'
    };

    const response = await request(app)
      .post('/api/auth/login')
      .send(loginData)
      .expect(401);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toContain('incorrect');
  });
});

describe('GET /api/auth/me', () => {
  let token;
  let user;

  beforeEach(async () => {
    // Créer un utilisateur et obtenir un token
    user = await User.create({
      email: 'test@example.com',
      password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4tbQJ6iK2O',
      role: 'patient',
      firstName: 'John',
      lastName: 'Doe'
    });

    // Simuler une connexion pour obtenir un token
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'Password123!'
      });

    token = loginResponse.body.token;
  });

  it('devrait retourner le profil de l\'utilisateur connecté', async () => {
    const response = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).toHaveProperty('user');
    expect(response.body.user.email).toBe(user.email);
    expect(response.body.user.role).toBe(user.role);
    expect(response.body.user.firstName).toBe(user.firstName);
    expect(response.body.user.lastName).toBe(user.lastName);
  });

  it('devrait refuser l\'accès sans token', async () => {
    const response = await request(app)
      .get('/api/auth/me')
      .expect(401);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toContain('token');
  });

  it('devrait refuser l\'accès avec un token invalide', async () => {
    const response = await request(app)
      .get('/api/auth/me')
      .set('Authorization', 'Bearer invalid-token')
      .expect(401);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toContain('Token invalide');
  });
});
