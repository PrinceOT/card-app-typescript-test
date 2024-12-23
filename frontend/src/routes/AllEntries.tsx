import {useContext} from 'react'
import { EntryContext } from '../utilities/globalContext'
import { EntryContextType, Entry } from '../@types/context'
import { useNavigate, Link } from "react-router-dom";
import  { useEffect,useState } from 'react';

export default function AllEntries(){
    
    const {entries, deleteEntry} = useContext(EntryContext) as EntryContextType
    let navigate = useNavigate();
    console.log(entries)

   
        let dates = entries.map((date) => (date.scheduled_for.toString().split("T")[0]))
        let removeDups =  dates.filter((item, index) => dates.indexOf(item) === index);
        let sortedData = removeDups.sort((a, b) => {
            const dateA = new Date(a);
            const dateB = new Date(b);
            return dateA.getTime() - dateB.getTime(); 
          });
          

           
            console.log(sortedData)
        
     
    if(entries.length == 0){
        return(
            <section>
                <h1 className="text-center font-semibold text-2xl m-5">You don't have any card</h1>
                <p className="text-center font-medium text-md">Lets <Link className="text-blue-400 underline underline-offset-1" to="/create">Create One</Link></p>
            </section>
        )
    }

    
      
    
   
    return( 
        <section>
        {sortedData.map((date)=> {
                return(
                <section>
                <h1 className="text-center font-bold text-sm md:text-lg">{(new Date(date)).toLocaleDateString().split('T')[0]}</h1>
                <section className="grid grid-cols-2 md:grid-cols-4">
                    {entries.filter((entry) => new Date(entry.scheduled_for.toString()).toLocaleDateString() === new Date(date.toString()).toLocaleDateString()).map((card:Entry,index: number)=> {
                return(
                    <div id={card.id} key={index}className="bg-gray-300 shadow-md shadow-gray-500 m-3 p-4 rounded flex flex-col justify-between">
                        <h1 className="font-bold text-sm md:text-lg">{card.title}</h1>
                        <p className="text-center text-lg font-light md:mt-2 md:mb-4 mt-1 mb-3">{card.description}</p>
                        <section className="flex items-center justify-between flex-col md:flex-row pt-2 md:pt-0">
                        <div className="flex justify-center">
                            <button onClick={()=> {deleteEntry(card.id as string)}} className="m-1 md:m-2 p-1 font-semibold rounded-md bg-red-500 hover:bg-red-700">✖</button>
                            <button onClick={()=> {navigate(`/edit/${card.id}`, { replace: true });}} className="m-1 md:m-2 p-1 font-semibold rounded-md bg-blue-500 hover:bg-blue-700">🖊</button>
                        </div>
                        <time className="text-right text-sm md:text-lg">{new Date(card.created_at.toString()).toLocaleDateString()}</time>
                    
                        </section>
                        
                    </div>
                )
            })}</section>
            </section>)
            }



                    

                )
            

        }</section>)


        /* <section className="grid grid-cols-2 md:grid-cols-4">
           
            {entries.map((entry: Entry, index: number) => {
                return(
                    <div id={entry.id} key={index}className="bg-gray-300 shadow-md shadow-gray-500 m-3 p-4 rounded flex flex-col justify-between">
                        <h1 className="font-bold text-sm md:text-lg">{entry.title}</h1>
                        <p className="text-center text-lg font-light md:mt-2 md:mb-4 mt-1 mb-3">{entry.description}</p>
                        <section className="flex items-center justify-between flex-col md:flex-row pt-2 md:pt-0">
                        <div className="flex justify-center">
                            <button onClick={()=> {deleteEntry(entry.id as string)}} className="m-1 md:m-2 p-1 font-semibold rounded-md bg-red-500 hover:bg-red-700">✖</button>
                            <button onClick={()=> {navigate(`/edit/${entry.id}`, { replace: true });}} className="m-1 md:m-2 p-1 font-semibold rounded-md bg-blue-500 hover:bg-blue-700">🖊</button>
                        </div>
                        <time className="text-right text-sm md:text-lg">{new Date(entry.created_at.toString()).toLocaleDateString()}</time>
                        <time className="text-right text-sm md:text-lg">{new Date(entry.scheduled_for.toString()).toLocaleDateString()}</time>
                        </section>
                        
                    </div>
                )
            })}
        */
       }
       