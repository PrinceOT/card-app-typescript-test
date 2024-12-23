import {useState, useContext, ChangeEvent, MouseEvent} from 'react'
import {EntryContext} from '../utilities/globalContext'
import {Entry, EntryContextType} from '../@types/context'

export default function NewEntry(){
    const emptyEntry: Entry = {title: "", description: "",created_at: new Date(),scheduled_for: new Date()}
    const { saveEntry } = useContext(EntryContext) as EntryContextType
    const [newEntry,setNewEntry] = useState<Entry>(emptyEntry)
    const handleInputChange = (event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        setNewEntry({
            ...newEntry,
            [event.target.name] : event.target.value
        })
    }
    const handleSend = (e: MouseEvent<HTMLButtonElement>) => {
        saveEntry(newEntry)
        setNewEntry(emptyEntry)
    }
    return(
        <section className="flex justify-center flex-col w-fit ml-auto mr-auto mt-10 gap-5 bg-gray-300 p-8 rounded-md">
            <input className="dark:bg-gray-400 dark:placeholder-black p-3 rounded-md" type="text" placeholder="Title" name="title" value={newEntry.title} onChange={handleInputChange}/>
            <textarea className=" dark:bg-gray-400 dark:placeholder-black p-3 rounded-md" placeholder="Description" name="description" value={newEntry.description} onChange={handleInputChange}/>
            <label htmlFor='scheduled_for'>Created At</label>
            <input className=" dark:bg-gray-400 p-3 rounded-md" type="date" name="created_at" value={(new Date(newEntry.created_at)).toISOString().split('T')[0]} onChange={handleInputChange}/>
            <label htmlFor='scheduled_for'>Scheduled For </label>
            <input className="dark:bg-gray-400 dark:text-black p-3 rounded-md" type="date" name="scheduled_for" value={(new Date(newEntry.scheduled_for)).toISOString().split('T')[0]} onChange={handleInputChange}/>
         
            <button onClick={(e) => {handleSend(e)}} className="bg-blue-400 hover:bg-blue-600 font-semibold text-white p-3 rounded-md">Create</button>
        </section>
    )
}