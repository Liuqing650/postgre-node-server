const promise = require('bluebird');
const db = require('../db');
const Uuid = require('uuid');

const getRoleList = (request, response, next) => {
  // const params = request.params;
  db.query(`
    select id, role, state,
    case when create_time isnull then '' else to_char(create_time, 'YYYY-MM-DD HH24:MI:SS') end as create_time,
    case when modify_time isnull then '' else to_char(modify_time, 'YYYY-MM-DD HH24:MI:SS') end as modify_time
    from sc_role order by create_time desc;
  `,function(err, result) {
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

const addRole = (request, response, next) => {
  const params = {
    id: Uuid.v4(),
    role: request.body.role,
    state: request.body.state,
  };
  db.query(
    `insert into sc_role(id, role, state, create_time) values ('${params.id}', '${params.role}', ${params.state}, CURRENT_TIMESTAMP)`,
    function(err, result) {
      if (err) {
        next(err);
        return console.error('error running query', err);
      }
      response.status(200).json({
        status: 'success',
        data: result.rows,
        message: 'add role success'
      });
    }
  );
}

const updateRole = (request, response, next) => {
  const params = {
    id: request.body.id.toString(),
    role: request.body.role,
    state: request.body.state,
  };
  db.query(
    'update sc_role set role=$1, state=$2, modify_time=CURRENT_TIMESTAMP where id=$3 and state=1',
    [params.role, params.state, params.id],
    function(err, result) {
      if (err) {
        next(err);
        return console.error('error running query', err);
      }
      response.status(200).json({
        status: 'success',
        data: result.rows,
        message: 'update role success'
      });
    }
  );
}

const deleteRole = (request, response, next) => {
  const params = request.params;
  db.query(`delete from sc_role where id='${params.id} and state=1'`,
    function(err, result) {
      if (err) {
        next(err);
        return console.error('error running query', err);
      }
      response.status(200).json({
        status: 'success',
        data: [],
        message: 'delete role success'
      });
    }
  );
}

const hideRole = (request, response, next) => {
  const params = request.params;
  db.query(
    `update sc_role set state=$1 where id=$2`,
    [params.state, params.id],
    function(err, result) {
      if (err) {
        next(err);
        return console.error('error running query', err);
      }
      response.status(200).json({
        status: 'success',
        data: [],
        message: 'hide role success'
      });
    }
  );
}

module.exports = {
  getRoleList: getRoleList,
  addRole: addRole,
  updateRole: updateRole,
  deleteRole: deleteRole,
  hideRole: hideRole,
};
