const request = require('supertest');
const app = require('../../src/app');
const prisma = require('../../src/lib/prisma');

jest.mock('../../src/lib/prisma', () => ({
  user: {
    findMany: jest.fn(),
    create: jest.fn(),
  },
}));

describe('User API Integration', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('GET /api/users should return status 200 and list of users', async () => {
    const mockUsers = [{ id: 1, email: 'test@example.com', name: 'Test User' }];
    prisma.user.findMany.mockResolvedValue(mockUsers);

    const response = await request(app).get('/api/users');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUsers);
  });

  it('POST /api/users should return 201 when creating a user', async () => {
    const userData = { email: 'new@example.com', name: 'New User' };
    prisma.user.create.mockResolvedValue({ id: 2, ...userData });

    const response = await request(app)
      .post('/api/users')
      .send(userData);

    expect(response.status).toBe(201);
    expect(response.body.email).toBe(userData.email);
  });

  it('GET /api/health should return status 200', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });
});
