
import logo from './assets/Logo.svg';
import { NoteCard } from './components/note-card';

export function App() {

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

        <div className='roundend-md bg-slate-700 p-5 space-y-3'>
          <span className='text-small text-slate-200'>
            Adicionar Nota 
          </span>
          <p className='text-small text-slate-400 leading-6'>
            Grave uma nota em áudio que será convertida para texto automaticamente.
          </p>
        </div>

        <NoteCard
          note={{
            date: new Date(), 
            content:'Good'
          }}
        />
      </div>
    </div>
  )
}

 