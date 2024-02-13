import { ChangeEvent, FormEvent, useState } from 'react';

import {X} from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import {toast} from 'sonner'

interface NewNoteCardProps {
  onNoteCreated: (content:string) => void
}

let speechRecognition: SpeechRecognition | null = null;

export function NewNoteCard({onNoteCreated}: NewNoteCardProps){
  const [shouldShowOnBoaring, setShouldShowOnBoaring] = useState(true);
  const [content, setContent] = useState('')
  const [isRecording, setIsRecording] = useState(false)

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
      if(content === ''){
        return
      }
      onNoteCreated(content)
      setContent("")
      setShouldShowOnBoaring(true)
      toast.success("Nota criada com sucesso")
  }

  function handleStartRecording(){
    const isSpeechRecognitionAPIAvailable = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window 
    if(!isSpeechRecognitionAPIAvailable){
      alert("Gravação não suportada em seu navegador")
      return
    }
    setIsRecording(true)
    setShouldShowOnBoaring(false)
    const SpeechRecognitionAPI = window.SpeechRecognition ||  window.webkitSpeechRecognition
    speechRecognition = new SpeechRecognitionAPI()

    speechRecognition.lang = 'pt-BR'
    speechRecognition.continuous = true
    speechRecognition.maxAlternatives = 1
    speechRecognition.interimResults = true

    speechRecognition.onresult = event => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript)
      }, '')
      setContent(transcription)
    }
    speechRecognition.onerror = event => console.log(event.error)
    speechRecognition.start()
  }
  function handleStopRecording(){
    setIsRecording(false) 
    if(speechRecognition !== null){
      speechRecognition.stop()
    }
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
        <Dialog.Content className='z-10  overflow-hidden inset-0  fixed md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2  md:max-w-2xl w-full md:h-[60vh] outline-none md:rounded-lg bg-slate-700 flex flex-col'>
          <Dialog.Close className='absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-200'>
            <X className='inset-5'></X>
          </Dialog.Close>
          <form className='flex flex-col flex-1'> 
            <div className='flex flex-1 flex-col p-5'>
              <span className='text-small text-slate-300'>
                Adicionar Nota
              </span>
              { shouldShowOnBoaring ? (
                    <p className='text-small text-slate-400 leading-6 break-words'>
                      Comece 
                      <button type='button' onClick={handleStartRecording} className='font-medium text-sky-400 ml-1 hover:underline'> gravando uma nota em áudio</button> ou se preferir utilize 
                      <button type='button' onClick={handleStartEditor} className='font-medium text-sky-400 ml-1 hover:underline'> apenas texto</button>.
                  </p>
              ): (
                <textarea autoFocus onChange={handleContentChange} value={content}
                className='text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none'
                ></textarea> 
              )}
            </div>
            {isRecording ? (
               <button  onClick={handleStopRecording}
                className='w-full bg-blue-900 py-4 flex justify-center items-center gap-2 text-center text-sm text-slate-200 outline-none font-medium hover:bg-blue-700 transition-colors duration-200'
                type='button'>
                  <div className='size-3 rounded-full bg-red-400 animate-pulse '></div>
                 Gravando! (Click p/Interromper)
               </button>
            ) :
              <button onClick={handleSaveNote}
              className='w-full bg-sky-400 py-4 text-center text-sm text-slate-950 outline-none font-medium hover:bg-sky-500'
              type='button'>
                Salvar Nota
              </button>
            }
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}