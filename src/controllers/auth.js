//src / controllers / auth.js
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUsersSession,
  resetPassword,
  requestResetToken,
} from '../services/auth.js';
import { ONE_DAY } from '../constants/index.js';

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
};

export const registerUserController = async (req, res) => {
  try {
    const user = await registerUser(req.body);

    const session = await loginUser({
      email: req.body.email,
      password: req.body.password,
    });

    setupSession(res, session);

    const data = {
      name: user.name,
      email: user.email,
    };

    res.status(201).json({
      message: 'Successfully registered a user!',
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error registering user',
      error: error.message,
    });
  }
};

export const loginUserController = async (req, res) => {
  try {
    const session = await loginUser(req.body);

    setupSession(res, session);

    res.status(200).json({
      message: 'Successfully logged in a user!',
      data: {
        accessToken: session.accessToken,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error logging in user',
      error: error.message,
    });
  }
};

export const logoutUserController = async (req, res) => {
  try {
    if (req.cookies.sessionId) {
      await logoutUser(req.cookies.sessionId);
    }

    res.clearCookie('sessionId');
    res.clearCookie('refreshToken');

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: 'Error logging out user',
      error: error.message,
    });
  }
};

export const refreshUserSessionController = async (req, res) => {
  try {
    const session = await refreshUsersSession({
      sessionId: req.cookies.sessionId,
      refreshToken: req.cookies.refreshToken,
    });

    setupSession(res, session);

    res.status(200).json({
      message: 'Successfully refreshed a session!',
      data: {
        accessToken: session.accessToken,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error refreshing session',
      error: error.message,
    });
  }
};

export const resetPasswordController = async (req, res) => {
  try {
    await resetPassword(req.body);
    res.status(200).json({
      message: 'Password was successfully reset!',
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error resetting password',
      error: error.message,
    });
  }
};

export const requestResetEmailController = async (req, res) => {
  console.log('Inside requestResetEmailController');
  try {
    await requestResetToken(req.body.email);
    console.log('Email request successful');
    res.status(200).json({
      message: 'Reset password email was successfully sent!',
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message,
      data: {},
    });
  }
};
