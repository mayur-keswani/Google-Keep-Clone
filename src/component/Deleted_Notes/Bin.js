import React, { Fragment , useContext } from 'react'
import './Bin.css'

import NotesContext from '../../context/NotesContext'
import { ADD_TODO, REMOVE_TODO } from '../../context/action.types'
import Icons from '../UI/Icons'
const Bin = () =>{
	const notesContext = useContext(NotesContext);

	const deleteNoteHandler = (id) =>{
		let deletingNote=notesContext.deletedNotes.filter(note=> note.id.toString() === id.toString())
		notesContext.trashDispatch({
			type:REMOVE_TODO,
			payload:deletingNote[0]
		})

	}
	const restoreNoteHandler = (id) =>{
		let restoringNote=notesContext.deletedNotes.filter(note=> note.id.toString() === id.toString())
		notesContext.dispatch({
			type:ADD_TODO,
			payload:restoringNote[0]
		})
		notesContext.trashDispatch({
			type:REMOVE_TODO,
			payload:restoringNote[0]
		})
	}
	// console.log(notesContext.deletedNotes)
	let notes=(<h2>No Notes Yet</h2>)
	notes=notesContext.deletedNotes.map(note=>{
		return  (<div className="note-box" key="note.id">
					<div className="note-title"><h4>{note.title}</h4></div>
					<div className="note-content">{note.content}</div>
					<div className="note-footer">
						<span  className="btn-restore" onClick={()=>restoreNoteHandler(note.id)} ><Icons type="restore"/></span>
						<span class="tooltiptext1">restore</span>
						<span  className="btn-delete-forever" onClick={()=>deleteNoteHandler(note.id)} ><Icons type="delete-forever"/></span>
						<span class="tooltiptext2">delete forever</span>
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
export default Bin