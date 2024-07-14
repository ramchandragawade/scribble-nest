import { useState } from "react";
import Modal from 'react-modal';
import NoteCard from "../components/cards/NoteCard"
import AddEditNotes from "./AddEditNotes";
import Navbar from "../components/nav/Navbar"
import { MdAdd } from "react-icons/md";

const Home = () => {
  const noteCard = (
    <NoteCard
      title={'Meeting on 7th April'}
      date={'3rd April 2024'}
      content={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'}
      tags={'#meeting'}
      isPinned={true}
      onDelete={() => { }}
      onEdit={() => { }}
      onPinNote={() => { }}
    />
  )
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: 'add',
    data: null
  });

  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <div className="md:grid md:grid-cols-3 md:gap-4 md:mt-6 mb-20 md:mb-0">
          {noteCard}
          {noteCard}
          {noteCard}
          {noteCard}
          {noteCard}
          {noteCard}
        </div>
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
        />
      </Modal>
    </>
  )
}

export default Home