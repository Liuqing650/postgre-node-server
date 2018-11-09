const promise = require('bluebird');
const db = require('../db');
const Uuid = require('uuid');

const getUserRoleList = (request, response, next) => {
  // const params = request.params;
  db.query(`
    select u.name, u.sex, u.age, r.role, ur.state,
    case when ur.create_time isnull then '' else to_char(ur.create_time, 'YYYY-MM-DD HH24:MI:SS') end as create_time,
    case when ur.modify_time isnull then '' else to_char(ur.modify_time, 'YYYY-MM-DD HH24:MI:SS') end as modify_time
    from sc_user u left join sc_user_role ur on u.id = ur.user_id
    left join sc_role r on ur.role_id = r.id where u.id = ur.user_id
    and ur.role_id = r.id order by ur.create_time desc
  `, function(err, result) {
    if (err) {
      next(err);
      return console.error('error running query', err);
    }
    response.status(200).json({
      status: 'success',
      data: result.rows,
      message: 'get success'
    });
  });
}

const addUserRole = (request, response, next) => {
  const params = {
    id: Uuid.v4(),
    userId: request.body.userId,
    roleId: request.body.roleId,
  };
  db.query(
    `insert into sc_user_role (user_id, role_id, state, create_time, id) values (
      '${params.userId}', '${params.roleId}', 1, CURRENT_TIMESTAMP, '${params.id}'
    )`,
    function(err, result) {
      if (err) {
        next(err);
        return console.error('error running query', err);
      }
      response.status(200).json({
        status: 'success',
        data: result.rows,
        message: 'add user success'
      });
    }
  );
}

const updateUserRole = (request, response, next) => {
  const params = {
    id: request.body.id.toString(),
    userId: request.body.userId,
    roleId: request.body.roleId,
  };
  db.query(
    'update sc_user_role set user_id=$1, role_id=$2, modify_time=CURRENT_TIMESTAMP where id=$5',
    [params.userId, params.roleId, params.id],
    function(err, result) {
      if (err) {
        next(err);
        return console.error('error running query', err);
      }
      response.status(200).json({
        status: 'success',
        data: result.rows,
        message: 'update user success'
      });
    }
  );
}

const deleteUserRole = (request, response, next) => {
  const params = request.params;
  db.query(`delete from sc_user_role where id='${params.id}'`,
    function(err, result) {
      if (err) {
        next(err);
        return console.error('error running query', err);
      }
      response.status(200).json({
        status: 'success',
        data: [],
        message: 'delete user success'
      });
    }
  );
}

module.exports = {
  getUserRoleList: getUserRoleList,
  addUserRole: addUserRole,
  updateUserRole: updateUserRole,
  deleteUserRole: deleteUserRole,
};
