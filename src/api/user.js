import axios from 'axios';
import config from 'config';

// 用户表
export const getUserList = () => axios.get(`/api/user`);

export const addUser = (params) => axios.post(`/api/user/add`, params);

export const modifyUser = (params) => axios.post(`/api/user/update`, params);

export const deleteUser = (id) => axios.put(`/api/user/delete/${id}`);

// 角色表
export const getRoleList = () => axios.get(`/api/role`);

export const addRole = (params) => axios.post(`/api/role/add`, params);

export const modifyRole = (params) => axios.post(`/api/role/update`, params);

export const deleteRole = (id) => axios.put(`/api/role/delete/${id}`);

export const hideRole = (id) => axios.put(`/api/role/hide/${id}`);

// 用户角色表
export const getUserRoleList = () => axios.get(`/api/userRole`);

export const addUserRole = (params) => axios.post(`/api/userRole/add`, params);

export const updateUserRole = (params) => axios.post(`/api/userRole/update`, params);

export const deleteUserRole = (id) => axios.put(`/api/userRole/delete/${id}`);
