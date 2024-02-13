
import { useState } from 'react';
import logo from './assets/Logo.svg';
import { NewNoteCard } from './components/newNoteCard';
import { NoteCard } from './components/note-card';

interface Note {
  id: string;
  date: Date;
  content:string;
}
export function App() {
  const [notes, setNotes ] = useState<Note[]>([]);

  function onNoteCreated(content: string){
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }
   
    setNotes([newNote, ...notes])
  }
  return (
    <div className='mx-auto px-6 xl:px-0 max-w-6xl my-12 space-y-6 '>
      <img src={logo} alt="logo nlw" className='w-48 sm:w-64'/>
      <form>
        <input 
        type="text" 
        placeholder='Busque suas notas...' 
        className='w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500 outline-none'
        />
      </form>

      <div className='h-px bg-slate-500'>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[248px] gap-6'>
        <NewNoteCard onNoteCreated={onNoteCreated}/>
        {notes.map(note => <NoteCard key={note.id} note={note}/>)}
        </div>
    </div>
  )
}

 