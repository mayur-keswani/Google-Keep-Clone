import React, { Fragment , useContext } from 'react'
import './Archive.css'

import NotesContext from '../../context/NotesContext'
import { REMOVE_TODO } from '../../context/action.types'
const Archive = () =>{
	const notesContext = useContext(NotesContext)
	const deleteNoteHandler = (id) =>{
		let deletingNote=notesContext.archivedNotes.filter(note=> note.id.toString() === id.toString())
		notesContext.archiveDispatch({
			type:REMOVE_TODO,
			payload:deletingNote[0]
		})

	}
	// console.log(notesContext.deletedNotes)
	let notes=(<h2>No Notes Yet</h2>)
	notes=notesContext.archivedNotes.map(note=>{
		return  (<div className="note-box" key="note.id">
					<div className="note-title"><h4>{note.title}</h4></div>
					<div className="note-content">{note.content}</div>
					<div className="note-footer">
						<button  className="btn-delete" onClick={()=>deleteNoteHandler(note.id)} >DELETE</button>
					</div>
				</div>
				)
	})
	return(
		<Fragment>
		 <div className="main-section">
			{notes}
		  </div>
		</Fragment>
	)
}
export default Archive