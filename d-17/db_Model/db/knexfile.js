// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      host : process.env.HOST || '127.0.0.1',
      user : process.env.USER_DB || 'root',
      password : '',
      database : process.env.DATABASE
    }
  },

};
