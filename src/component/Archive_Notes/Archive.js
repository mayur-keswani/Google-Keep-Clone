import React, { Fragment , useContext} from 'react'
import Icons from '../UI/Icons/Icons'
import './Archive.css'
// context-api stuff
import NotesContext from '../../context/NotesContext'
import { ADD_NOTE, REMOVE_NOTE } from '../../context/NotesReducers/action.types'

const Archive = () =>{
	const notesContext = useContext(NotesContext)
		
	const deleteNoteHandler = (id) =>{
		let deletingNote=notesContext.archivedNotes.filter(note=> note.id.toString() === id.toString())
		notesContext.archiveDispatch({
			type:REMOVE_NOTE,
			payload:deletingNote[0]
		})
		notesContext.trashDispatch({
			type:ADD_NOTE,
			payload:deletingNote[0]
		})

	}

	const unarchiveHandler= (id) =>{
		let unarchivingNote=notesContext.archivedNotes.filter(note=> note.id.toString() === id.toString());
		notesContext.dispatch({
			type:ADD_NOTE,
			payload:unarchivingNote[0]
		})
		notesContext.archiveDispatch({
			type:REMOVE_NOTE,
			payload:unarchivingNote[0]
		})
	}
	// console.log(notesContext.deletedNotes)
	let notes=(<h2>No Notes Yet</h2>)
	notes=notesContext.archivedNotes.map(note=>{
		return  (<div className="note-box" key="note.id">
					<div className="note-title"><h4>{note.title}</h4></div>
					<button className="btn-unarchive" onClick={()=>unarchiveHandler(note.id)}><Icons type="unarchive"/></button>
					<span class="tooltiptext">Unarchieve</span>
					{(note.criterion==="TODO")
					 	? 
						 note.content.map(elem=>
							<div className="todo_task" key={elem.id}>  
								<span className="task-complete mt-5"><Icons type="uncheck"/></span>	
								<span className="todo_content" readOnly>{elem.task}</span>
								{/* <input type="text" 
				  		 			className="todo_content" 
									style={{backgroundColor:"white"}}
				  		 			value={elem.task}
									readOnly
						 		/>  	 */}				 	
								
				   			</div>
							)
					 	:
						 <div className="note-content">{note.content}</div>
					 }
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