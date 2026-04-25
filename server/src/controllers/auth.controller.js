const authService = require('../services/auth.service');

const setTokenCookies = (res, accessToken, refreshToken) => {
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000, // 15 mins
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

const register = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = await authService.registerUser(req.body);
    setTokenCookies(res, accessToken, refreshToken);
    res.status(201).json({ success: true, message: 'Registration successful' });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = await authService.loginUser(req.body.email, req.body.password);
    setTokenCookies(res, accessToken, refreshToken);
    res.status(200).json({ success: true, message: 'Login successful' });
  } catch (error) {
    next(error);
  }
};

const refresh = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res.status(401).json({ message: 'Refresh token required' });
    }

    const { accessToken, refreshToken } = await authService.refreshToken(token);
    setTokenCookies(res, accessToken, refreshToken);
    res.status(200).json({ success: true, message: 'Token refreshed' });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({ success: true, message: 'Logout successful' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  refresh,
  logout
};
