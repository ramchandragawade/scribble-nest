import mongoose, {Schema} from 'mongoose';
const notesSchema = new Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    tags: {
        type: [String],
        default:[]
    },
    isPinned: {
        type: Boolean,
        default: false
    },
    userId: {
        type:String,
        required: true
    },
    createdOn: {
        type: Date,
        default: new Date().getTime()
    }
});
export const Notes = mongoose.model('Notes', notesSchema);