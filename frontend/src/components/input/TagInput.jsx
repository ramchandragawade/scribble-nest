import { useState } from 'react'
import { MdAdd, MdClose } from 'react-icons/md'
const TagInput = ({ tags, setTags }) => {
    const [inputVal, setInputval] = useState('');
    const [error, setError] = useState(null);
    const handleInputChange = (e) => {
        const val = e.target.value;
        setInputval(val);
        if (error && !tags.includes(val)) {
            setError(null);
        }
    }

    const addNewTag = () => {
        const val = inputVal.trim();
        setError(null);
        if (val !== '' && !tags.includes(val)) {
            setTags([...tags, val]);
            setInputval('');
            return;
        }
        if(val===''){
            setError('Cannot add empty tag.');
            return;
        }
        if (tags.includes(val)) {
            setError('Tag already exists.');
            return;
        }

    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            addNewTag();
        }
    }

    const handleRemoveTag = (tagToRemove) => {
        const newTags = tags.filter(tag => tag !== tagToRemove);
        setTags(newTags);
        if (error && !newTags.includes(inputVal)) {
            setError('');
        }
    }

    return (
        <div>
            {
                tags && tags.length > 0 && (
                    <div className="flex items-center gap-2 flex-wrap mt-2">
                        {
                            tags.map((tag, i) => (
                                <span key={i} className='flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded'>
                                    # {tag}
                                    <button onClick={() => { handleRemoveTag(tag) }}>
                                        <MdClose />
                                    </button>
                                </span>
                            ))
                        }
                    </div>
                )
            }
            <div className="flex items-center gap-4 mt-3">
                <input type="text"
                    className="text-sm bg-transparent border px-3 py-2 rounded outline-none"
                    placeholder="Add tags"
                    value={inputVal}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
                <button
                    className="w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700 group"
                    onClick={addNewTag}
                >
                    <MdAdd
                        className='text-2xl text-blue-700 group-hover:text-white'
                    />
                </button>
            </div>
            {
                error && <p className="text-red-500 text-xs pt-2">{error}</p>
            }
        </div>
    )
}

export default TagInput