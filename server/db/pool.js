const { Pool } = require('pg');
const plConfig = require('../config/pl.js');

const pool = new Pool(plConfig);
const defaultValue = null;

// pool.connect((err) => {
//   if (err) {
//     console.error('[POOL]数据库连接失败', err.stack)
//   } else {
//     console.log('[POOL]数据库连接成功...')
//   }
// });
// query
const query = (sql, values, callback) => {
  let val = values;
  let done = callback;
  if (typeof values === 'function') {
    val = defaultValue;
    done = values;
  }
  console.log('sql-------->', sql);
  pool.query(sql, val)
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
