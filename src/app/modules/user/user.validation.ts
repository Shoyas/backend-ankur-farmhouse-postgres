import { z } from 'zod';
import { userRoleEnum } from './user.constant';

const createUserValidation = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  email: z.string({
    required_error: 'Email is required',
  }),
  password: z.string({
    required_error: 'Password is required',
  }),
  role: z.enum([...userRoleEnum] as [string, ...string[]], {
    required_error: 'Role is required',
  }),
  contactNo: z.string({
    required_error: 'ContactNo is required',
  }),
  address: z.string({
    required_error: 'Address is required',
  }),
  profileImg: z.string().optional(),
});
const signinUserValidation = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

const changePasswordValidation = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old password is required',
    }),
    newPassword: z.string({
      required_error: 'New password is required',
    }),
  }),
});

export const UserValidation = {
  createUserValidation,
  signinUserValidation,
  changePasswordValidation,
};
