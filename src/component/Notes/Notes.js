import React, { Fragment , useContext, useState } from 'react'
import NotesContext from '../../context/NotesContext';
import Icons from '../UI/Icons'
import {ADD_TODO, REMOVE_TODO} from '../../context/action.types'

import FullNote from '../Full_Note/FullNote'
import './Notes.css'

const Notes = () =>{
	const notesContext = useContext(NotesContext)
	
	const [loadedNote,setLoadedNote] = useState({visible:false,note_id:null})
    
	const archiveNote = (id) =>{
		let pinNote=notesContext.todos.filter(note=> note.id.toString() === id.toString())
		notesContext.dispatch({
			type:REMOVE_TODO,
			payload:pinNote[0]
		})
		notesContext.archiveDispatch({
			type:ADD_TODO,
			payload:pinNote[0]
		})
	}
	const deleteNoteHandler =(id)=>{
		let deletingNote=notesContext.todos.filter(note=> note.id.toString() === id.toString())
		notesContext.dispatch({
			type:REMOVE_TODO,
			payload:deletingNote[0]
		})
		notesContext.trashDispatch({
			type:ADD_TODO,
			payload:deletingNote[0]
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
					<button className="btn-pin" onClick={()=>archiveNote(note.id)}><Icons type="archive"/></button>
					 <span class="tooltiptext">Archieve</span>
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