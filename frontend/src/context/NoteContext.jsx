import { createContext, useEffect, useState } from "react";
import BACKEND_URL from "../api/urls";

export const NoteContext = createContext();

export const NoteProvider=({children})=>{
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    // fetch all notes
    const getNotes = async() => {
        setLoading(true);
        try {
            const response = await BACKEND_URL.get("/get-notes");
            
            // 🐛 FIX IS HERE 🐛
            // Access the 'notes' array from the response data object
            setNotes(response.data.notes); 
            // Also, check if the response data is structured as expected
            // if (response.data && Array.isArray(response.data.notes)) {
            //     setNotes(response.data.notes);
            // }

        } catch (error) {
            console.error("Error fetching notes:", error);
            // You might want to set notes to an empty array on error
            setNotes([]); 
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        getNotes();
    },[])

    // create a note
const createNote = async (note) => {
  try {
    await BACKEND_URL.post("/createNote", note);
    await getNotes(); // 👈 re-fetch fresh list after creation
  } catch (error) {
    console.error("Error creating note:", error);
  }
};

    // update a note
const updateNote = async (id, updatedNote) => {
  try {
    await BACKEND_URL.put(`/update-notes/${id}`, updatedNote);
    await getNotes(); // ✅ refresh full list
  } catch (error) {
    console.error("Error updating note:", error);
  }
};

    // delete a note
    const deleteNote = async(id) => {
        await BACKEND_URL.delete(`/delete-note/${id}`)
        setNotes(notes.filter((note)=>(note._id!==id)))
    }

    return(
        <NoteContext.Provider value={{notes,loading,createNote,updateNote,deleteNote}}>
            {children}
        </NoteContext.Provider>
    )
}