const mongoose = require('mongoose');

const Person = new mongoose.Schema({
    username: String,
    foodType: String
});

const foodType = mongoose.model('foodType', Person);

module.exports = foodType;