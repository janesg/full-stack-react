const mongoose = require('mongoose');

// Use ES6 destructuring as equivalent of following:
// const Schema = mongoose.Schema;
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String
});

mongoose.model('users', userSchema);
