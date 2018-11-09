// 是否使用连接池
const usePool = true;
const db = usePool ? require('./pool.js') : require('./client.js');
module.exports = db;