const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        maxlength: [500, 'Name cannot exceed 500 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
     password: {
        type: String,
        required: [true, 'Password is required'],
        maxlength: [500, 'pass cannot exceed 500 characters']
    }
});

const users = mongoose.model('users', userSchema);

module.exports = users;

