export type ILoginUser = {
  email: string;
  password: string;
};

export type ILoginUserResponse = {
  id?: string;
  email?: string;
  role?: string;
  token: string;
  refreshToken: string;
};

export type ITokenWithUser = {
  id?: string;
  email?: string;
  role?: string;
  token: string;
  refreshToken: string;
};

export type IUserRoleEnum = 'super_admin' | 'admin' | 'customer';

export type IChangePassword = {
  oldPassword: string;
  newPassword: string;
};

export type IUserFilters = {
  searchTerm?: string;
  role?: string;
};
