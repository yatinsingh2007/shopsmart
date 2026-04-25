const request = require('supertest');
const app = require('../../src/app');
const prisma = require('../../src/lib/prisma');
const jwt = require('jsonwebtoken');

jest.mock('../../src/lib/prisma', () => ({
  user: {
    findUnique: jest.fn(),
    update: jest.fn(),
  },
}));

describe('User API Integration', () => {
  let token;

  beforeAll(() => {
    token = jwt.sign({ id: 1, role: 'USER', email: 'test@example.com' }, process.env.JWT_SECRET || 'secret');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('GET /api/users/me should return status 200 and user profile', async () => {
    const mockUser = { id: 1, email: 'test@example.com', name: 'Test User', role: 'USER' };
    prisma.user.findUnique.mockResolvedValue(mockUser);

    const response = await request(app)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
  });

  it('PUT /api/users/me should return 200 and update user', async () => {
    const mockUpdatedUser = { id: 1, email: 'test@example.com', name: 'Updated User', role: 'USER' };
    prisma.user.update.mockResolvedValue(mockUpdatedUser);

    const response = await request(app)
      .put('/api/users/me')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Updated User' });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Updated User');
  });

  it('GET /api/health should return status 200', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });
});
