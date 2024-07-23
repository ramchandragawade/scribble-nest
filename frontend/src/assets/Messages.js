const strings = {
    NO_SCRIBBLES: 'No scribbles',
    SCRIBBLE_ADDED: 'Scribble Added Successfully!',
    SCRIBBLE_UPDATED: 'Scribble Updated Successfully!',
    SCRIBBLE_DELETED: 'Scribble Deleted Successfully!',
    SCRIBBLE_PINNED: 'Scribble Pinned!',
    SCRIBBLE_UNPINNED: 'Scribble Unpinned!',
    UNEXPECTED_ERROR: 'An unexpected error occurred. Please try again!',
    PLACEHOLDER_SUMMARY_SCRIBBLE: 'Summary for the scribble',
    SCRIBBLE_SEARCH_NOT_FOUND: `It looks like there are no scribbles matching your search. Try adjusting your keywords or creating a new scribble to capture your thoughts!`,
    SCRIBBLE_LIST_EMPTY: `Got a new idea or thought? Click on add button to add a new scribble and keep track of everything on your mind. Your next great idea is just a scribble away!`,
}

export default function getMessageByKey(key) {
    // Return the value corresponding to the key, or a default message if the key is not found
    return strings[key] || key;
}