const AddEditNotes = () => {
    return (
        <div>
            <div className="flex flex-col gap-2">
                <label htmlFor="" className="input-label">TITLE</label>
                <input type="text"
                    className="text-2xl text-slate-950 outline-none"
                    placeholder="Summary for the note"
                />
            </div>
            <div className="flex flex-col gap-2 mt-4">
                <label htmlFor="" className="input-label">CONTENT</label>
                <textarea
                    name="" id=""
                    className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
                    placeholder="Content/Ideas"
                    rows={10}
                />
            </div>
            <div className="mt-3">
                <label htmlFor="" className="input-label">Tags</label>
            </div>
            <button
                className="btn-primary font-medium mt-5 p-3" onClick={() => { }}>
                ADD
            </button>
        </div>
    )
}

export default AddEditNotes