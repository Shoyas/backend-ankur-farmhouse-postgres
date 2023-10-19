"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userFilterableFields = exports.userSearchableFields = exports.userRoleEnum = void 0;
exports.userRoleEnum = [
    'super_admin',
    'admin',
    'customer',
];
exports.userSearchableFields = ['email', 'name', 'role'];
exports.userFilterableFields = ['searchTerm', 'role', 'page', 'size'];
