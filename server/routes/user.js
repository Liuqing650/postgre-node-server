const promise = require('bluebird');
const db = require('../db');
const Uuid = require('uuid');

const getUserList = (request, response, next) => {
  // const params = request.params;
  db.query(`select id, name, sex, age, description ,case when create_time isnull then '' else to_char(create_time, 'YYYY-MM-DD HH24:MI:SS') end as create_time from sc_user order by create_time desc`, function(err, result) {
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

const addUser = (request, response, next) => {
  console.log('body-------->', request.body);
  const params = {
    id: Uuid.v4(),
    name: request.body.name,
    sex: request.body.sex,
    age: parseInt(request.body.age),
    description: request.body.description,
  };
  db.query(
    `insert into sc_user(id, name, sex, age, description, create_time) values (
      '${params.id}', '${params.name}', '${params.sex}',
      '${params.age}', '${params.description}', CURRENT_TIMESTAMP
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

const updateUser = (request, response, next) => {
  const params = {
    id: request.body.id.toString(),
    name: request.body.name.toString(),
    sex: request.body.sex.toString(),
    age: parseInt(request.body.age),
    description: request.body.description.toString(),
  };
  db.query(
    'update sc_user set name=$1, sex=$2, age=$3, description=$4 where id=$5',
    [params.name, params.sex, params.age, params.description, params.id],
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

const deleteUser = (request, response, next) => {
  const params = request.params;
  db.query(`delete from sc_user where id='${params.id}'`,
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
  getUserList: getUserList,
  addUser: addUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
};
