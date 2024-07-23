import { useState } from "react"
import TagInput from "../components/input/TagInput"
import { MdClose } from "react-icons/md";
import axiosInstance from "../utils/axiosInstance";

const AddEditNotes = ({ noteData, type, onClose, getAllNotes, showToast }) => {
    const [title, setTitle] = useState(noteData?.title || '');
    const [content, setContent] = useState(noteData?.content || '');
    const [tags, setTags] = useState(noteData?.tags || []);
    const [error, setError] = useState(null);

    //Add note
    const addNewNote = async () => {
        try {
            const res = await axiosInstance.post('/note', {
                title,
                content,
                tags
            });
            if(res.data?.note) {
                showToast('Note Added Successfully!');
                getAllNotes();
                onClose();
            }
        } catch (error) {
            if (error?.response?.data?.message) {
                setError(error.response.data.message);
            } else {
                setError('An unexpected error occurred. Please try again!');
            }
        }
    }

    //Edit note
    const editNote = async () => {
        try {
            const res = await axiosInstance.put(`/note/${noteData?._id}`, {
                title,
                content,
                tags
            });
            if(res.data?.note) {
                showToast('Note Updated Successfully!');
                getAllNotes();
                onClose();
            }
        } catch (error) {
            if (error?.response?.data?.message) {
                setError(error.response.data.message);
            } else {
                setError('An unexpected error occurred. Please try again!');
            }
        }
    }

    const onTitleChange = ({ target }) => {
        setTitle(target.value);
    }

    const onContentChange = ({ target }) => {
        setContent(target.value);
    }

    const validateInput = () => {
        if (!title) {
            setError('Please enter the title');
            return false;
        }
        if (!content) {
            setError('Please add some content');
            return false;
        }
        setError('')
        return true;
    }
    const handleAddNote = () => {
        if (!validateInput()) {
            return;
        }
        if (type === 'edit') {
            editNote()
        } else {
            addNewNote()
        }
        //SaveNote api
    }
    return (
        <div className="relative">
            <button
                className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-100"
                onClick={onClose}>
                <MdClose className="text-xl text-slate-400" />
            </button>
            <div className="flex flex-col gap-2">
                <label htmlFor="" className="input-label">TITLE</label>
                <input type="text"
                    className="text-md md:text-2xl text-slate-950 outline-none"
                    placeholder="Summary for the note"
                    value={title}
                    onChange={onTitleChange}
                />
            </div>
            <div className="flex flex-col gap-2 mt-4">
                <label htmlFor="" className="input-label">CONTENT</label>
                <textarea
                    name="" id=""
                    className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
                    placeholder="Content/Ideas"
                    rows={10}
                    value={content}
                    onChange={onContentChange}
                />
            </div>
            <div className="mt-3">
                <label htmlFor="" className="input-label">Tags</label>
                <TagInput
                    tags={tags}
                    setTags={setTags}
                />
            </div>
            {
                error && <p className="text-red-500 text-xs pt-3">{error}</p>
            }
            <button
                className="btn-primary font-medium mt-5 p-3" onClick={handleAddNote}>
                {type==='edit' ? 'UPDATE' : 'ADD'}
            </button>
        </div>
    )
}

export default AddEditNotes