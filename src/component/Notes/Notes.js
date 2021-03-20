import React, { Fragment , useContext, useState } from 'react'
import NotesContext from '../../context/NotesContext';
import {REMOVE_TODO} from '../../context/action.types'

import FullNote from '../Full_Note/FullNote'
import './Notes.css'

const Notes = () =>{
	const notesContext = useContext(NotesContext)
	// const [fullNoteVisible,setFullNoteVisible] = useState(false)
	const [loadedNote,setLoadedNote] = useState({visible:false,note_id:null})

	const deleteNoteHandler =(id)=>{
		notesContext.dispatch({
			type:REMOVE_TODO,
			payload:id
		})
		setLoadedNote({visible:false,note_id:null})
	}
	
	const loadFullNote = (id) =>{
		setLoadedNote({visible:true,note_id:id})
	}
	const offLoadFullNote=()=>{
		setLoadedNote({visible:false,note_id:null})
	}

	let notes=(<h2>No Notes Yet</h2>)
	notes=notesContext.todos.map(note=>{
		return  (<div className="note-box" key="note.id">
					<div className="note-title"><h4>{note.title}</h4></div>
					<div className="note-content">{note.content}</div>
					<div className="note-footer">
						<button  className="btn-edit" onClick={()=>loadFullNote(note.id)}>Edit</button>
						<button className="btn-delete" onClick={()=>deleteNoteHandler(note.id)}>Delete</button>
					</div>
				</div>
				)
	})
	return(
		<Fragment>
		 {loadedNote.visible?<FullNote id={loadedNote.note_id}  offLoadFullNote={offLoadFullNote}/>:null}
		
		  <div className="main-section">
			{notes}
		  </div>
		</Fragment>
	)
}

export default Notes