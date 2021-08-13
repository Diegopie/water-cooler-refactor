const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: 'Email is required',
        lowercase: true
    },
    password: {
        type: String,
        required: 'Password is required'
    },
    username: {
        type: String,
        require: 'Username is required',
        lowercase: true
    },
    firstName: {
        type: String,
        default: '',
        lowercase: true
    },
    lastName: {
        type: String,
        default: '',
        lowercase: true
    },
    status: {
        type: Number,
        default: 0
    },
    inboundPendingRooms: {
        type: Array,
        default: []
    },
    inboundPendingSpaces: {
        type: Array,
        default: []
    },
    inboundPendingFriends: {
        type: Array,
        default: []
    },
    outboundPendingFriends: {
        type: Array,
        default: []
    },
    friends: {
        type: Array,
        default: []
    },
    blocked: {
        type: Array,
        default: []
    },
    imageSrc: {
        type: String,
        default: ''
    },
    activeRoom: {
        type: String,
        default: ''
    }
    
}, {//Not return password back to front end
    toJSON: {
        transform(doc, ret){
            delete ret.password;
        }
    }
});

// prehook that Hashes password automatically
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {return next();}
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(this.password, salt);
    this.password = hashedPassword;
});

//used for validating whetherthe user’s password is correct when they try to log in.
UserSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
};


UserSchema.index({ 
    username: 'text',
    firstName: 'text',
    lastName: 'text',
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
