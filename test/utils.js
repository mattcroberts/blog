const mongoose = require('mongoose');

module.exports.clearMongooseCache = () => {
    mongoose.models = {};
    mongoose.modelSchemas = {};
    mongoose.connection.close();
};
