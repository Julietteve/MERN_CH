// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host : process.env.HOST || '127.0.0.1',
      user : process.env.USER_DB || 'root',
      password : '',
      database : 'codersql'
    }
  },

};
