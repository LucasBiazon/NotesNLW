
import { ChangeEvent, useState } from 'react';
import logo from './assets/Logo.svg';
import { NewNoteCard } from './components/newNoteCard';
import { NoteCard } from './components/note-card';

interface Note {
  id: string;
  date: Date;
  content:string;
}
export function App() {
  const [search, setSearch] = useState('');
  const [notes, setNotes ] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem('notes');
    if(notesOnStorage){
      return JSON.parse(notesOnStorage);
    }
    return []
  });


  function onNoteCreated(content: string){
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }
   
    const notesArray = [newNote, ...notes]
    setNotes(notesArray)
    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>){
    const query = event.target.value
    setSearch(query)
  }
  const filteredNotes = search !== '' ? 
  notes.filter( note => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())) : notes
  return (
    <div className='mx-auto px-6 xl:px-0 max-w-6xl my-12 space-y-6 '>
      <img src={logo} alt="logo nlw" className='w-48 sm:w-64'/>
      <form>
        <input 
        type="text" 
        placeholder='Busque suas notas...' 
        className='w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500 outline-none'
        onChange={handleSearch}
        value={search}
        />
      </form>

      <div className='h-px bg-slate-500'>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[248px] gap-6'>
        <NewNoteCard onNoteCreated={onNoteCreated}/>
        {filteredNotes.map(note => <NoteCard key={note.id} note={note}/>)}
        </div>
    </div>
  )
}

 