import express from 'express';
import dotenv from "dotenv";
dotenv.config();
import cors from 'cors';
import mongoose from "mongoose";
import { authenticateToken } from './utilities.js';
import config from "./config.json" assert { type: "json" };
import jwt from "jsonwebtoken";
mongoose.connect(config.connectionString);
const app = express();
import {User} from "./models/user.model.js";
app.use(express.json());
app.use(cors({
    origin: '*'
}));

app.get('/', (req, res) => {
    res.send('')
});

app.post('/register', async (req, res) => {
    console.log(req.body)
    const { fullName, email, password } = req.body;
    if (!fullName) {
        return res.status(400).json({
            error: true,
            message: 'Name is required'
        })
    }
    if (!email) {
        return res.status(400).json({
            error: true,
            message: 'Email is required'
        })
    }
    if (!password) {
        return res.status(400).json({
            error: true,
            message: 'Password is required'
        })
    }
    const isUser = await User.findOne({
        email
    })
    if(isUser) {
        return res.status(400).json({
            error: true,
            message: 'User already exists'
        })
    }
    const user = new User({
        fullName,
        email,
        password
    })

    await user.save();
    const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '36000m'
    });
    return res.json({
        error: false,
        user,
        accessToken,
        message: 'Successfully registered!!'
    })
});

app.post('/login',async (req,res)=>{
    const {email, password} = req.body;
    if (!email) {
        return res.status(400).json({
            error: true,
            message: 'Email is required'
        })
    }
    if (!password) {
        return res.status(400).json({
            error: true,
            message: 'Password is required'
        })
    }
    const userInfo = await User.findOne({email});
    if(!userInfo){
        return res.status(400).json({
            error: true,
            message: 'User not found'
        })
    }
    if(userInfo.email === email && userInfo.password === password) {
        const user = {
            user: userInfo
        };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn:'36000m'
        });
        return res.json({
            error: false,
            email,
            accessToken,
            message: 'Login successful!!'
        })
    } else {
        return res.status(400).json({
            error: true,
            message: 'Invalid credentials!'
        })
    }

})

const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log('Connected BE to 3002');
});
