import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    useremail: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true // Convert all emails to lowercase before saving
    }, 
    
    role: {
        type: String,
        enum: ['instructor', 'user'],
        default: 'user'
    }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
export default User;
