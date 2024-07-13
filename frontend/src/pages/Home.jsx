import NoteCard from "../components/cards/NoteCard"
import AddEditNotes from "../components/modal/AddEditNotes";
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
  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <div className="md:grid md:grid-cols-3 md:gap-4 md:mt-6">
          {noteCard}
          {noteCard}
          {noteCard}
          {noteCard}
          {noteCard}
          {noteCard}
        </div>
      </div>

      <button className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10" onClick={()=>{}}>
        <MdAdd
          className="text-[32px] text-white"
        />
      </button>

      <AddEditNotes/>
    </>
  )
}

export default Home