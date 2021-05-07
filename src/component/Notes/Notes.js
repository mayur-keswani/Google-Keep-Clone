import React, { Fragment , useContext, useState } from 'react'
import Icons from '../UI/Icons/Icons'
import FullNote from '../Full_Note/FullNote'
import './Notes.css'
// context-api stuff
import NotesContext from '../../context/NotesContext';
import {ADD_NOTE, REMOVE_NOTE, UPDATE_NOTE} from '../../context/NotesReducers/action.types'
import { useHistory } from 'react-router';

const Notes = () =>{
	
	const notesContext = useContext(NotesContext)
	const [loadedNote,setLoadedNote] = useState({visible:false,note_id:null})
    const history = useHistory();

	const archiveNote = (id) =>{
		let pinNote=notesContext.todos.filter(note=> note.id.toString() === id.toString())
		notesContext.dispatch({
			type:REMOVE_NOTE,
			payload:pinNote[0]
		})
		notesContext.archiveDispatch({
			type:ADD_NOTE,
			payload:pinNote[0]
		})
	}
	const deleteNoteHandler =(id)=>{
		let deletingNote=notesContext.todos.filter(note=> note.id.toString() === id.toString())
		notesContext.dispatch({
			type:REMOVE_NOTE,
			payload:deletingNote[0]
		})
		notesContext.trashDispatch({
			type:ADD_NOTE,
			payload:deletingNote[0]
		})
		setLoadedNote({visible:false,note_id:null})
	}
	
	const onTaskComplete = (todoID , taskID ) =>{
		let updatingTodoIndex=notesContext.todos.findIndex(todo=> todo.id.toString()===todoID.toString())
		let updatingTodo={...notesContext.todos[updatingTodoIndex]}

		
		let updatedTodo=updatingTodo.content.map((task)=>{
			if(task.id.toString()===taskID.toString()){
				task.isCompleted=!task.isCompleted;
				return task
			}else{
				return task
			}
		})
		// let updatingTask=updatingContent.findIndex(task=> task.id.toString()===taskID.toString());
		// updatingTask[0].isCompleted=!updatingTask[0].isCompleted;
		
		// updatingTodo["content"]=[...updatingTodo["context"],...updatingTask[0]]

		notesContext.dispatch({
			type:UPDATE_NOTE,
			payload:updatedTodo
		})
		history.push('/')
	}
	const loadFullNote = (id) =>{
		setLoadedNote({visible:true,note_id:id})
	}
	const offLoadFullNote=()=>{
		setLoadedNote({visible:false,note_id:null})
	}


	let notes=(<h2>No Notes Yet</h2>)
	notes=notesContext.todos.map(note=>{
		return  (<div className="note-box" key={note.id}>
					<div className="note-title"><h4>{note.title}</h4></div>
					<button className="btn-pin" onClick={()=>archiveNote(note.id)}><Icons type="archive"/></button>
					 <span className="tooltiptext">Archieve</span>
					 <div className="note-content">
					  {
						(note.criterion==="TODO")?	
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