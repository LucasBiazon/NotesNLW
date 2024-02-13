import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from 'react';

import {X} from 'lucide-react'
import {ptBR} from 'date-fns/locale';
import {formatDistanceToNow} from 'date-fns';
import * as Dialog from '@radix-ui/react-dialog'
import {toast} from 'sonner'

interface NewNoteCardProps {
  onNoteCreated: (content:string) => void
}

export function NewNoteCard({onNoteCreated}: NewNoteCardProps){
  const [shouldShowOnBoaring, setShouldShowOnBoaring] = useState(true);
  const [content, setContent] = useState('')

  function handleStartEditor(){
    setShouldShowOnBoaring(false);
  }
  function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>){
      setContent(event.target.value)
      if(event.target.value === ''){
        setShouldShowOnBoaring(true);
      }
  } 

  function handleSaveNote(event: FormEvent){
      event.preventDefault();
      console.log(content)
      onNoteCreated(content)
      setContent("")
      setShouldShowOnBoaring(true)
      toast.success("Nota criada com sucesso")
  }
  
  return (
    <Dialog.Root>
      <Dialog.Trigger className='roundend-md bg-slate-700 p-5 flex flex-col text-left gap-3'>
        <span className='text-small text-slate-200'>
          Adicionar Nota 
        </span>
        <p className='text-small text-slate-400 leading-6'>
          Grave uma nota em áudio que será convertida para texto automaticamente.
        </p>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='inset-0 fixed bg-black/60'/>
        <Dialog.Content className='z-10  overflow-hidden fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[360px] sm:max-w-2xl w-full h-[60vh] outline-none rounded-lg bg-slate-700 flex flex-col'>
          <Dialog.Close className='absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-200'>
            <X className='inset-5'></X>
          </Dialog.Close>
          <form onSubmit={handleSaveNote} className='flex flex-col flex-1'> 
            <div className='flex flex-1 flex-col p-5'>
              <span className='text-small text-slate-300'>
                Adicionar Nota
              </span>
              { shouldShowOnBoaring ? (
                    <p className='text-small text-slate-400 leading-6 break-words'>
                      Comece 
                      <button  type='button'  className='font-medium text-sky-400 ml-1 hover:underline'> gravando uma nota em áudio</button> ou se preferir utilize 
                      <button type='button' onClick={handleStartEditor} className='font-medium text-sky-400 ml-1 hover:underline'> apenas texto</button>.
                  </p>
              ): (
                <textarea autoFocus onChange={handleContentChange} value={content}
                className='text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none'
                ></textarea> 
              )}
            </div>
            <button 
            className='w-full bg-sky-400 py-4 text-center text-sm text-slate-950 outline-none font-medium hover:bg-sky-500'
            type='submit'>
              Salvar Nota
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}