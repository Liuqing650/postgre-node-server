const { Client } = require('pg');
const plConfig = require('../config/pl.js');

const client = new Client(plConfig);
const defaultValue = null;

client.connect((err) => {
  if (err) {
    console.error('[CLIENT]数据库连接失败', err.stack)
  } else {
    console.log('[CLIENT]数据库连接成功...')
  }
});
// query
const query = (sql, values, callback) => {
  let val = values;
  let done = callback;
  if (typeof values === 'function') {
    val = defaultValue;
    done = values;
  }
  console.log('sql-------->', sql);
  client.query(sql, val)
    .then((result) => {
      done(null, result);
      // client.end();
    })
    .catch(err => {
      done(err, null);
      // client.end();
    })
}

const db = {
  query,
};
module.exports = db;
