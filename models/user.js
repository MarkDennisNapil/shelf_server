const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "First name required!"]
    },
    last_name: {
        type: String,
        required: [true, "Last name required!"]
    },
    photo: {
        type: String
    },
    email: {
        type: String,
        required: [true, "Email required!"],
        unique: [true, "Email already used!"]
    },
    password: {
        type: String,
        required: [true, "Password required"]
    },
    status: {
        type: String,
        default: 'Pending'
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    dateModified: {
        type: Date,
        default: Date.now
    }
},
{
    collection: 'user'
});
const users = mongoose.model("user", userSchema);
module.exports = users;