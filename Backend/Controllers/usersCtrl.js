const asyncHandler = require("express-async-handler")
const User = require("../model/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//! User Registration

const userController = {
    //! Register
    register: asyncHandler(async(req, res)=>{
        const {username, email, password} = req.body;
        // console.log(req.body);

        //! Validation
        if(!username || !email || !password){
            throw new Error("All fields are required");
        }

        //! Check if user already exists
        const userExists = await User.findOne({email});
        if(userExists){
            throw new Error("User already exists");
        }


        //! Hash the user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // console.log(hashedPassword);

        //! Create the user and save into Database
        const userCreated = await User.create({
            email,
            username,
            password:hashedPassword,
        });

        //! Send the response
        res.json({ 
            username: userCreated.username,
            email: userCreated.email,
            id: userCreated._id,
        });
    }),
    //! login
        login: asyncHandler(async(req, res)=>{
            //! Get the user data
            const {email, password} = req.body;
            //! check if email is valid 
            const user = await User.findOne({email});
            if(!user){
                throw new Error("User not found");
            }
            //! Check if password is correct
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if(!isPasswordCorrect){
                throw new Error("Password is incorrect");
            }
            //! Generate a token
            const token = jwt.sign({id: user._id}, "AyKc", {expiresIn: "30d"});
            //! Send the response
            res.json({
                message: "Login Success",
                token,
                id: user._id,
                email: user.email,
                username: user.username,
            });
        }),

    //! profile
        profile: asyncHandler(async(req, res)=>{
            //! Get the user data
            console.log(req.user);
            const user = await User.findById(req.user);
            if(!user){
                throw new Error("User not found");
            }
            //! Send the response
            res.json({username: user.username, email: user.email});
        }),

        //! Change password
        changeUserPassword: asyncHandler(async(req, res)=>{
            const {newPassword} = req.body
            //! find the user
            const user = await User.findById(req.user);
            if(!user){
                throw new Error("User not found");
            }
            //! Hash the new password before saving
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            user.password = hashedPassword;

            //! Resave the password
            await user.save({
                validateBeforeSave: false,
            });
            //! Send the response
            res.json({message:"Password Changed successfully"});
        }),

        //! update user profile
        updateUserProfile: asyncHandler(async(req, res)=>{
            const {email, username} = req.body;
            const updatedUser = await User.findByIdAndUpdate(req.user, {
                username,
                email,
            },
        {
            new: true,
        });
            res.json({message:"User profile updated successfully", updatedUser});
        }),
};

module.exports = userController;