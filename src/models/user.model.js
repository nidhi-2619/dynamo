import mongoose, {Schema} from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


// direct encryption is not possible so we will use mongoose hook
// we will use pre hook, it will execute just before saving the data


const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String, //contains the url of the image
        trim:true,
    },
    coverImage:{
        type:String, //contains the url of the image
    },
    watchHistory:[// array because more than one video can be watched
        { // dependent on videos
            type:Schema.Types.ObjectId,
            ref:'Video'
        }
    ],
    password:{
        type:String,
        required:[true,"Password is required"],
        trim:true
    },
    refreshToken:{
        type:String,
        trim:true
    }

},{timestamp:true});

// prehook 
// middleware [next is a flag which will tell that the function has been executed]
userSchema.pre({
    save: async function(next){
        if(this.isModified('password')){
            this.password = await bcrypt.hash(this.password, 10);
        }
        next();
    }

});

// custom methods
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id:this._id,
        username:this.username,
        email:this.email,
        fullname:this.fullname,
    
    }, process.env.ACCESS_TOKEN_SECRET, {expiresIn:process.env.ACCESS_TOKEN_EXPIRY});
}
// refresh token has less information than access token, and we use it oftenly
userSchema.methods.generateRefreshToken = async function(){
    return jwt.sign({_id:this._id}, process.env.REFESH_TOKEN_SECRET, {expiresIn: process.env.REFESH_TOKEN_EXPIRY});
}


export const User = mongoose.model('User', userSchema);
// it will store as user in the database

// jwt is a bearer token : means someone who bear 