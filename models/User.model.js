import mongoose from 'mongoose';
import { boolean } from 'zod';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false, trim: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  avatar: { 
    url: {type: String, trim: true },
    public_id: {type: String, trim: true}
  },
  isEmailVerified:{
    type: boolean, default: false,
  },
  phone: {type: String, trim: true},
  address: {type: String, trim: true},
  deletedAt: { type: Date, default: null, index: true },
//   createdAt: { type: Date, default: Date.now },
}, {timestamps: true});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next();
})

userSchema.methods = {
    comparePassword: async function(password){
        return await bcrypt.compare(password, this.password)
    }
}

const UserModel = mongoose.models.User || mongoose.model('User', userSchema, 'users');

export default UserModel;
