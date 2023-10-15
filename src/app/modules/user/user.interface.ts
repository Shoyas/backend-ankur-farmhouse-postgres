export type ILoginUser = {
  email: string;
  password: string;
};

export type ILoginUserResponse = {
  email?: string;
  role?: string;
  token: string;
  refreshToken: string;
};

export type IRefreshTokenResponse = {
  token: string;
};

export type IUserRoleEnum = 'super_admin' | 'admin' | 'customer';

export type IChangePassword = {
  oldPassword: string;
  newPassword: string;
};
