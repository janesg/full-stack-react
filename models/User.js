const mongoose = require('mongoose');

// Use ES6 destructuring as equivalent of following:
// const Schema = mongoose.Schema;
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    credits: { type: Number, default: 0 }
});

// Register schema with mongoose under specific name
mongoose.model('users', userSchema);
