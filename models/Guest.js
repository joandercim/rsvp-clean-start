const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: [true, 'Please fill in your name.']
    }
});

const guest = mongoose.model('Guest', PersonSchema);

module.exports = guest;