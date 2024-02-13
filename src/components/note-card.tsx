import * as Dialog from '@radix-ui/react-dialog'
import {formatDistanceToNow} from 'date-fns';
import {ptBR} from 'date-fns/locale';
import {X} from 'lucide-react'
interface NoteCardPros {
  note: 
  {
    id: string;
    date: Date;
    content: string
  } 
  onNoteDelete: (id:string) => void;
}

export function NoteCard({note, onNoteDelete}: NoteCardPros){
  return (
    <Dialog.Root>
      <Dialog.Trigger className='text-left outline-none roundend-md bg-slate-800 p-5 flex flex-col gap-5 overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-sky-400 focus:ring-2 focus:ring-sky-400'>
          <span className='text-small text-slate-300'>
            {formatDistanceToNow(note.date, {locale:ptBR, addSuffix: true})}
          </span>
          <p className='text-small text-slate-400 leading-6 break-words'>
            {note.content}
          </p>
          <div className='absolute bottom-0 right-0 left-0 h-1/2 pointer-events-none bg-gradient-to-t from-black/60 to-black/0'></div>
      </Dialog.Trigger>
   
      <Dialog.Portal>
        <Dialog.Overlay className='inset-0 fixed bg-black/60'/>
        <Dialog.Content className='z-10  overflow-hidden inset-0  fixed md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2  md:max-w-2xl w-full md:h-[60vh] outline-none md:rounded-lg bg-slate-700 flex flex-col'>
          <Dialog.Close className='absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-200'>
            <X className='inset-5'></X>
          </Dialog.Close>
          <div className='flex flex-1 flex-col p-5'>
            <span className='text-small text-slate-300'>
              {formatDistanceToNow(note.date, {locale:ptBR, addSuffix: true})}  
            </span>
            <p className='text-small text-slate-400 leading-6 break-words'>
              {note.content}
            </p>
          </div>
          <button onClick={() => onNoteDelete(note.id)}
          className='w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group'
          type='button'
          >
            Deseja <span className='text-red-400 group-hover:underline'>apagar esta nota?</span>
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}