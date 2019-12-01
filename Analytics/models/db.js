const mongoose = require('mongoose');
module.exports = () => {
  function connect() {
    mongoose.connection.openUri('mongodb://127.0.0.1:27017', function(err) {
      if (err) {
        console.error('mongodb connection error', err);
      }
      console.log('mongodb connected');
    });
  }
  connect();
  mongoose.connection.on('disconnected', connect);
  require('./user');
};