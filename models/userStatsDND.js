const mongoose = require('mongoose')

const userStatsDNDSchema = new mongoose.Schema({
    userID: { type: String, required: true, unique: true },
    name: {type: String, required: true},
    stats: { type: Object, required: true },
});

const UserStatsDND = mongoose.model('UserStatsDND', userStatsDNDSchema);

module.exports = UserStatsDND