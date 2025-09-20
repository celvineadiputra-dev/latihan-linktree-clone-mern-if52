import z from 'zod';
import UserModel from '../models/userModel.js';
import { LoginRequest } from '../request/LoginRequest.js';
import { RegisterRequest } from '../request/RegisterRequest.js';
import { compare, hash } from '../utils/hashUtil.js';
import { jwtSignUtil } from '../utils/jwtSignUtil.js';

export const register = async (req, res) => {
  try {
    const registerData = req.body;

    const validation = RegisterRequest.safeParse(registerData);

    if (!validation.success) {
      res.status(402).json({
        message: 'Validation error',
        data: z.flattenError(validation.error)?.fieldErrors,
      });
    }

    const { username, email, password } = validation.data;

    const hashPassword = hash(password);

    await UserModel.create({
      username,
      email,
      password: hashPassword,
    });

    res.status(201).json({
      message: 'Berhasil register, silahkan login',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};

export const login = async (req, res) => {
  try {
    const loginRequest = req.body;

    const validation = LoginRequest.safeParse(loginRequest);

    if (!validation.success) {
      return res.status(402).json({
        message: 'Validation error',
        data: z.flattenError(validation.error)?.fieldErrors,
      });
    }

    const { email, password } = validation.data;

    const user = await UserModel.findOne({
      email: email,
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        data: null,
      });
    }

    if (compare(password, user.password)) {
      res.status(200).json({
        message: 'Login success',
        data: {
          user: {
            username: user.username,
          },
          token: jwtSignUtil(user),
        },
      });
    }

    res.status(401).json({
      message: 'Unauthorized',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};
