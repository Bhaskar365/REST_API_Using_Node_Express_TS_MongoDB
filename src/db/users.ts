import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username : { type: String, required : true },
    email: { type : String, required : true },
    authentication : {
        password : { type : String, required: true, select: false },
        salt : { type : String, select: false },
        sessionToken : { type: String, select : false }
    }
});

export const userModel = mongoose.model('User', UserSchema);

export const getUsers = () => userModel.find();

export const getUserByEmail = (email:string) => userModel.findOne({ email });

export const getUserBySessionToken = (sessionToken:string) => ({
    'authentication.sessionToken' : sessionToken
});

export const createUser = (values:Record<string,any>) => new userModel(values)
    .save().then((user)=> user.toObject());

export const deleteUserById = (id:string) => userModel.findOneAndDelete({ _id:id});

export const updateUserById = (id:string, values:Record<string,any>) => userModel.findOneAndReplace({id,values});

