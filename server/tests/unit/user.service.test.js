const { getAllUsers, createUser } = require('../../src/services/user.service');
const prisma = require('../../src/lib/prisma');

jest.mock('../../src/lib/prisma', () => ({
  user: {
    findMany: jest.fn(),
    create: jest.fn(),
  },
}));

describe('UserService (Functional)', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all users', async () => {
    const mockUsers = [{ id: 1, email: 'test@example.com', name: 'Test User' }];
    prisma.user.findMany.mockResolvedValue(mockUsers);

    const users = await getAllUsers();

    expect(users).toEqual(mockUsers);
    expect(prisma.user.findMany).toHaveBeenCalledTimes(1);
  });

  it('should create a user', async () => {
    const userData = { email: 'new@example.com', name: 'New User' };
    const mockUser = { id: 2, ...userData };
    prisma.user.create.mockResolvedValue(mockUser);

    const user = await createUser(userData);

    expect(user).toEqual(mockUser);
    expect(prisma.user.create).toHaveBeenCalledWith({ data: userData });
  });
});
