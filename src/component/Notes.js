import React, { Fragment , useContext } from 'react'
import NotesContext from '../context/NotesContext';
import {REMOVE_TODO} from '../context/action.types'
import './Notes.css'
const Notes = () =>{
	const notesContext = useContext(NotesContext)
	const deleteNoteHandler =(id)=>{
		notesContext.dispatch({
			type:REMOVE_TODO,
			payload:id
		})
	}
	let notes=(<h2>No Notes Yet</h2>)
	notes=notesContext.todos.map(note=>{
		return  (<div className="note-box" key="note.id">
					<div className="note-title"><h4>{note.title}</h4></div>
					<div className="note-content">{note.content}</div>
					<div className="note-footer">
						<button  className="btn-edit">Edit</button>
						<button className="btn-delete" onClick={()=>deleteNoteHandler(note.id)}>Delete</button>
					</div>
				</div>)
	})
	return(
		<Fragment>
		  <div className="main-section">
			{notes}
		  </div>
		</Fragment>
	)
}

export default Notes