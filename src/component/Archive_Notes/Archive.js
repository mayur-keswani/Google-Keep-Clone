import React, { Fragment , useContext, useEffect } from 'react'
import './Archive.css'

import NotesContext from '../../context/NotesContext'
import { ADD_PREV_TODOS, ADD_TODO, REMOVE_TODO } from '../../context/action.types'
import Icons from '../UI/Icons'
const Archive = () =>{
	const notesContext = useContext(NotesContext)
	useEffect(()=>{
		let existingArchivedNotes = localStorage.getItem('archivedNotes');
		if(existingArchivedNotes){
			notesContext.archiveDispatch({
				type:ADD_PREV_TODOS,
				payload:JSON.parse(existingArchivedNotes)
			})
		};

	},[])


	const deleteNoteHandler = (id) =>{
		let deletingNote=notesContext.archivedNotes.filter(note=> note.id.toString() === id.toString())
		notesContext.archiveDispatch({
			type:REMOVE_TODO,
			payload:deletingNote[0]
		})
		notesContext.trashDispatch({
			type:ADD_TODO,
			payload:deletingNote[0]
		})

	}

	const unarchiveHandler= (id) =>{
		let unarchivingNote=notesContext.archivedNotes.filter(note=> note.id.toString() === id.toString());
		notesContext.dispatch({
			type:ADD_TODO,
			payload:unarchivingNote[0]
		})
		notesContext.archiveDispatch({
			type:REMOVE_TODO,
			payload:unarchivingNote[0]
		})
	}
	// console.log(notesContext.deletedNotes)
	let notes=(<h2>No Notes Yet</h2>)
	notes=notesContext.archivedNotes.map(note=>{
		return  (<div className="note-box" key="note.id">
					<div className="note-title"><h4>{note.title}</h4></div>
					<button className="btn-unarchive" onClick={()=>unarchiveHandler(note.id)}><Icons type="unarchive"/></button>
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