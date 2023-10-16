import { IUserRoleEnum } from './user.interface';

export const userRoleEnum: IUserRoleEnum[] = [
  'super_admin',
  'admin',
  'customer',
];

export const userSearchableFields = ['email', 'name', 'role'];

export const userFilterableFields = ['searchTerm', 'role', 'page', 'size'];
