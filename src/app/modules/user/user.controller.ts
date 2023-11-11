import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import { paginationFields } from '../../../constants/pagination';
import { IUploadFile } from '../../../interfaces/file';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { userFilterableFields } from './user.constant';
import { ILoginUserResponse } from './user.interface';
import { UserService } from './user.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const file = req.file as IUploadFile;
  const result = await UserService.createUser(payload, file);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User created successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.loginUser(req.body);
  const { refreshToken, ...others } = result;

  const responseWithToken = {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User sign in successfully!',
    data: others?.token, // Include the token at the top level
    id: others?.id,
    email: others?.email,
  };
  console.log('expected result pattern: ', responseWithToken);
  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);
  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully !',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await UserService.getAllUsers(filters, paginationOptions);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users retrieved successfully',
    data: result.data,
    meta: result.meta,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getSingleUser(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User fetched successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await UserService.updateUser(id, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User updated successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.deleteUser(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User deleted successfully',
    data: result,
  });
});

// const getSingleUserByToken = catchAsync(async (req: Request, res: Response) => {
//   const token = req.headers.token; // Assuming 'token' is the header key in Postman
//   console.log('Token in headers:', token);

//   const result = await UserService.getSingleUserByToken(token);
//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: 'Profile retrieved successfully',
//     data: result,
//   });
// });

const getSingleUserByToken = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;

  if (!token) {
    // Handle the case when the token is not provided in the headers
    return res
      .status(httpStatus.FORBIDDEN)
      .json({ message: 'Token not found in headers' });
  }

  const tokenString = Array.isArray(token) ? token[0] : token.toString(); // Convert to a string

  console.log('Token in headers:', tokenString);

  const result = await UserService.getSingleUserByToken(tokenString);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Profile retrieved successfully',
    data: result,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { ...passwordData } = req.body;
  const result = await UserService.changePassword(user, passwordData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Password change successfully',
    data: result,
  });
});

export const UserController = {
  createUser,
  loginUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  changePassword,

  getSingleUserByToken,
};
