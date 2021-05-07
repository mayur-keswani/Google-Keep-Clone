import React, { Fragment , useContext} from 'react'
import Icons from '../UI/Icons/Icons'
import './Archive.css'
// import '../Notes/Notes.css'
// context-api stuff
import NotesContext from '../../context/NotesContext'
import { ADD_NOTE, REMOVE_NOTE , UPDATE_NOTE} from '../../context/NotesReducers/action.types'
import { useHistory } from 'react-router'

const Archive = () =>{
	const notesContext = useContext(NotesContext)
	const history = useHistory()
		
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

	const onTaskComplete = (todoID , taskID ) =>{
		let updatingTodoIndex=notesContext.archivedNotes.findIndex(todo=> todo.id.toString()===todoID.toString())
		let updatingTodo={...notesContext.archivedNotes[updatingTodoIndex]}
		let updatedTodo=updatingTodo.content.map((task)=>{
			if(task.id.toString()===taskID.toString()){
				task.isCompleted=!task.isCompleted;
				return task
			}else{
				return task
			}
		})
		notesContext.archiveDispatch({
			type:UPDATE_NOTE,
			payload:updatedTodo
		})
		history.push('/archive')
	}
	
	let notes=(<h2>No Notes Yet</h2>)
	notes=notesContext.archivedNotes.map(note=>{
		return  (<div className="note-box" key="note.id">
					<div className="note-title"><h4>{note.title}</h4></div>
					<button className="btn-unarchive" onClick={()=>unarchiveHandler(note.id)}><Icons type="unarchive"/></button>
					<span className="tooltiptext">Unarchieve</span>
					<div className="note-content">
					{(note.criterion==="TODO")
					 	? 
						 note.content.map(elem=>
							<div className="todo_task" key={elem.id}>  
								<span className="task-complete mt-5" 
									onClick={()=>onTaskComplete(note.id,elem.id)}>
									<Icons type={elem.isCompleted?"check":"uncheck"}/>
								</span>	
								<span className="todo_content" 
									readOnly 
									style={{textDecoration:(elem.isCompleted)?"line-through":"none"}}>
									{elem.task}
								</span>				 	
								
				   			</div>
							)
					 	:
						 note.content
					 }
					 </div>
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