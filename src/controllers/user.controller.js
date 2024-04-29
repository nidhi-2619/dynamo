import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res, next) => {
    // get data from the frontend
    // validation 
    // check if the user already exists:either user name or email]
    //check for images , check for avatar
    // upload to cloudinary
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return response

    const {username, fullName, email, password} = req.body
    
    //validations
    // if(fullName==="" || username==="" || email==="" || password===""){
    //     return res.status(400).json({success:false, message:"All fields are required"})
    // }
    if([username, fullName, email, password].some((field)=>field?.trim()===""))// if after trim the field is empty means field was empty
    {
        throw new ApiError(400, "All fields are required")
    }
    if (email.includes('@')===false){
        throw new ApiError(400, "Invalid email")
    }
    if (password.length<6){
        throw new ApiError(400, "Password must be atleast 6 characters long")
    }
    // check if the user already exists:either user name or email]
    const existedUsername = User.findOne({username})
    
    if(existedUsername){
            throw new ApiError(404, "Username already exists")
        }
    
    const existedEmail = User.findOne({email})

    if(existedEmail){
        throw new ApiError(409, "Email already exists.")
    }

    // middleware give some extra fields to the req like req,files
    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path 

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required.")
    }

    // now upload to cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath,'tempFiles/')
    const coverImage = await uploadOnCloudinary(coverImageLocalPath,'tempFiles/')

    if (!avatar){
        throw new ApiError(400, "Avatar is required.")
    }

    const user = await User.create({
        fullName,
        username: username.toLowerCase(),
        email,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
    })
    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser){
        throw new ApiError(500, "User could not be created.")
    }

    return res.status(201).json(
        new ApiResponse(
            200,
            createdUser,
            "User Registered Successfully!"
        )
    )
})

export { registerUser };