export function NoteCard(){
  return (
    <button className='text-left outline-none roundend-md bg-slate-800 p-5 space-y-3 overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-sky-400 focus:ring-2 focus:ring-sky-400'>
        <span className='text-small text-slate-300'>
           há 2dias
        </span>
         <p className='text-small text-slate-400 leading-6'>
           Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero quo saepe, molestiae in temporibus error hic consequatur beatae sit possimus provident quae doloremque, facere cum cumque iure culpa. Quia, alias?
        </p>
        <div className='absolute bottom-0 right-0 left-0 h-1/2 pointer-events-none bg-gradient-to-t from-black/60 to-black/0'></div>
    </button>
  )
}