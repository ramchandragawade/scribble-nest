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
import { User } from "./models/user.model.js";
import { Notes } from "./models/notes.model.js";
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
    if (isUser) {
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
    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '36000m'
    });
    return res.json({
        error: false,
        user,
        accessToken,
        message: 'Successfully registered!!'
    })
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
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
    const userInfo = await User.findOne({ email });
    if (!userInfo) {
        return res.status(400).json({
            error: true,
            message: 'User not found'
        })
    }
    if (userInfo.email === email && userInfo.password === password) {
        const user = {
            user: userInfo
        };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '36000m'
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

app.post('/add-note', authenticateToken, async (req, res) => {
    const { title, content, tags } = req.body;
    const { user } = req.user;
    if (!title) {
        return res.status(400).json({
            error: true,
            message: 'Title is required'
        })
    }
    if (!content) {
        return res.status(400).json({
            error: true,
            message: 'Content is required'
        })
    }
    try {
        const note = new Notes({
            title,
            content,
            tags: tags || [],
            userId: user._id
        });
        await note.save();
        return res.json({
            error: false,
            note,
            message: 'Note saved successfully'
        });
    } catch (e) {
        return res.status(500).json({
            error: true,
            message: 'Internal server error',
            errorText: e
        })
    }

})

app.put('/edit-note/:noteId', authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { title, content, tags, isPinned } = req.body;
    const { user } = req.user;
    if (!title && !content && tags) {
        return res.status(400).json({
            error: true,
            message: 'No changes'
        })
    }
    try {
        const note = await Notes.findOne({ _id: noteId, userId: user._id });
        if (!note) {
            return res.status(404).json({
                error: true,
                message: 'Note not found!'
            })
        }
        if (title) {
            note.title = title;
        }
        if (content) {
            note.content = content;
        }
        // if(tags.length>0){
        //     if(note.tags.length>0){
        //         note.tags.push(...tags);
        //     } else {
        //         note.tags = tags
        //     }
        // }
        if (tags) {
            note.tags = tags;
        }
        if (isPinned) {
            note.isPinned = isPinned;
        }
        await note.save();
        return res.json({
            error: false,
            note,
            message: 'Note updated successfully'
        });
    } catch (e) {
        return res.status(500).json({
            error: true,
            message: 'Internal server error',
            errorText: e
        })
    }

})

app.get('/all-notes', authenticateToken, async (req, res) => {
    const { user } = req.user;
    try {
        const notes = await Notes.find({
            userId : user._id
        }).sort({
            isPinned: -1
        });
        return res.json({
            error: false,
            notes,
            message: 'Retreived all notes'
        });
    } catch(e) {
        res.status(500).json({
            error: true,
            message: 'Internal server error',
            errorText: e
        })
    }
})

const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log('Connected BE to 3002');
});
