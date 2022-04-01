const mongoose = require('mongoose');
const UsersSchema = new mongoose.Schema({
    username: { type: String, required: true, maxlength: 50 },
    // age: { type: String, required: true },
    dob: { type: Date, required: true },
    password: { type: String, required: true, maxlength: 80 },
    email: { type: String, required: true, maxlength: 100 },
});
module.exports = mongoose.model('User', UsersSchema);
