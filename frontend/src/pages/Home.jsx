import { useEffect, useState } from "react";
import Modal from 'react-modal';
import NoteCard from "../components/cards/NoteCard"
import AddEditNotes from "./AddEditNotes";
import Navbar from "../components/nav/Navbar"
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import ToastMsg from "../components/misc/ToastMsg";
import EmptyCard from "../components/cards/EmptyCard";
import AddNotesImg from '../assets/images/add-notes.svg';
import NoResultImg from '../assets/images/no-result.svg';
import getMessageByKey from "../assets/Messages";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: 'add',
    data: null
  });
  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [showToast, setShowToast] = useState({
    isShown: false,
    message: '',
    type: 'add'
  });
  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({
      isShown: true,
      type: 'edit',
      data: noteDetails
    });
  }

  const handleShowToast = (message, type) => {
    setShowToast({
      isShown: true,
      message,
      type
    })
  }

  const handleCloseToast = () => {
    setShowToast({
      isShown: false,
      message: ''
    })
  }

  const getUserInfo = async () => {
    try {
      const res = await axiosInstance.get('/user');
      if (res.data?.user) {
        setUserInfo(res.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate('/login');
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const res = await axiosInstance.get('/all-notes');
      if (res.data?.notes) {
        setAllNotes(res.data.notes)
      }
    } catch (e) {
      console.log(getMessageByKey('UNEXPECTED_ERROR') + e);
    }
  }

  const onSearchNote = async (query) => {
    try {
      const res = await axiosInstance.get('/search-notes', {
        params: {
          query
        }
      });
      if (res.data?.notes) {
        setIsSearch(true);
        setAllNotes(res.data.notes);
      }
    } catch (e) {
      console.log(getMessageByKey('UNEXPECTED_ERROR') + e);
    }
  }

  const onClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  }

  const handleDelete = async (noteData) => {
    try {
      const res = await axiosInstance.delete(`/note/${noteData?._id}`);
      if (res.data && !res.data.error) {
        handleShowToast(getMessageByKey('SCRIBBLE_DELETED'), 'delete');
        getAllNotes();
      }
    } catch (error) {
      console.log(getMessageByKey('UNEXPECTED_ERROR') + error);
    }
  }

  const handlePin = async (noteData) => {
    try {
      const res = await axiosInstance.put(`/pinned-note/${noteData?._id}`, {
        isPinned: !noteData.isPinned
      });
      if (res.data && !res.data.error) {
        handleShowToast(`${getMessageByKey(noteData.isPinned ? 'SCRIBBLE_UNPINNED' : 'SCRIBBLE_PINNED')}`);
        getAllNotes();
      }
    } catch (error) {
      console.log(getMessageByKey('UNEXPECTED_ERROR') + error);
    }
  }

  useEffect(() => {
    getUserInfo();
    getAllNotes();
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote} onClearSearch={onClearSearch} />
      <div className="container mx-auto">
        {allNotes.length > 0 ? (
          <div className="md:grid md:grid-cols-3 md:gap-4 md:mt-6 mb-20 md:mb-0">
            {allNotes.map((item) => {
              const { _id, title, createdOn: date, content, tags, isPinned } = item;
              return <NoteCard
                key={_id}
                title={title}
                date={date}
                content={content}
                tags={tags}
                isPinned={isPinned}
                onDelete={() => { handleDelete(item) }}
                onEdit={() => { handleEdit(item) }}
                onPinNote={() => { handlePin(item) }}
              />
            })
            }
          </div>) :
          <EmptyCard
            imgSrc={isSearch ? NoResultImg : AddNotesImg}
            message={
              getMessageByKey(isSearch ? 'SCRIBBLE_SEARCH_NOT_FOUND' : 'SCRIBBLE_LIST_EMPTY')
            }
            onClickFn={() => {
              setOpenAddEditModal({
                isShown: true,
                type: 'add',
                data: null
              });
            }}
          />
        }
      </div>
      <button
        className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full md:rounded-2xl bg-primary hover:bg-blue-600 fixed right-4 bottom-6 md:bottom-10 md:right-10"
        onClick={() => {
          setOpenAddEditModal({
            isShown: true,
            type: 'add',
            data: null
          });
        }}>
        <MdAdd
          className="text-[32px] text-white"
        />
      </button>

      <Modal
        appElement={document.getElementById('root')}
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => { }}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          }
        }}
        contentLabel={""}
        className="w-[90%] md:w-[50%] max-h-[90%] bg-white rounded-md mx-auto mt-14 p-5 overflow-auto"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({
              isShown: false,
              type: 'add',
              data: null
            })
          }}
          getAllNotes={getAllNotes}
          showToast={handleShowToast}
        />
      </Modal>

      <ToastMsg
        isShown={showToast.isShown}
        message={showToast.message}
        type={showToast.type}
        onClose={handleCloseToast}
      />

    </>
  )
}

export default Home