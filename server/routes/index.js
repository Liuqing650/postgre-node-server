const express = require('express');
const user = require('./user.js');
const role =  require('./role.js');
const userRole = require('./userRole.js');

const router = express.Router();

// 用户表
router.get('/api/user', user.getUserList);
router.post('/api/user/add', user.addUser);
router.post('/api/user/update', user.updateUser);
router.put('/api/user/delete/:id', user.deleteUser);
// 角色表
router.get('/api/role', role.getRoleList);
router.post('/api/role/add', role.addRole);
router.post('/api/role/update', role.updateRole);
router.put('/api/role/delete/:id', role.deleteRole);
router.put('/api/role/hide/:id', role.hideRole);
// 用户角色表
router.get('/api/userRole', userRole.getUserRoleList);
router.post('/api/userRole/add', userRole.addUserRole);
router.post('/api/userRole/update', userRole.updateUserRole);
router.put('/api/userRole/delete/:id', userRole.deleteUserRole);

module.exports = router;