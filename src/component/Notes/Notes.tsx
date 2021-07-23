import React, { Fragment , useContext, useState } from 'react'
import Icons from '../UI/Icons/Icons'
import FullNote from '../Full_Note/FullNote'
import './Notes.css'
// context-api stuff
import NotesContext from '../../context/NotesContext';
import {ActionType} from '../../context/NotesReducers/action.types'
import { useHistory } from 'react-router';

const Notes:React.FC = () =>{
	
	const notesContext = useContext(NotesContext)
	const [loadedNote,setLoadedNote] = useState({visible:false,note_id:""})
    const history = useHistory();

	const archiveNote = (id:string) =>{
		let pinNote=notesContext.todos.filter(note=> note.id.toString() === id.toString())
		notesContext.dispatch({
			type:ActionType.REMOVE_NOTE,
			payload:pinNote[0]
		})
		notesContext.archiveDispatch({
			type:ActionType.ADD_NOTE,
			payload:pinNote[0]
		})
	}
	const deleteNoteHandler =(id:string)=>{
		let deletingNote=notesContext.todos.filter(note=> note.id.toString() === id.toString())
		notesContext.dispatch({
			type:ActionType.REMOVE_NOTE,
			payload:deletingNote[0]
		})
		notesContext.trashDispatch({
			type:ActionType.ADD_NOTE,
			payload:deletingNote[0]
		})
		setLoadedNote({visible:false,note_id:""})
	}
	
	const onTaskComplete = (todoID:string , taskID:string ) =>{

		let updatingTodoIndex=notesContext.todos.findIndex(todo=> todo.id.toString()===todoID.toString())
		let updatingTodo={...notesContext.todos[updatingTodoIndex]}

		if(typeof updatingTodo.content !=='string'){
			let updatedTodoContent=updatingTodo.content.map((task)=>{
				if(task.id.toString()===taskID.toString()){
					task.isCompleted=!task.isCompleted;
					return task
				}else{
					return task
				}
			})
			updatingTodo.content=updatedTodoContent
			// let updatingTask=updatingContent.findIndex(task=> task.id.toString()===taskID.toString());
			// updatingTask[0].isCompleted=!updatingTask[0].isCompleted;
		
			// updatingTodo["content"]=[...updatingTodo["context"],...updatingTask[0]]
			notesContext.dispatch({
				type:ActionType.UPDATE_NOTE,
				payload:updatingTodo
			})
		}
		
		

		
		history.push('/')
	}
	const loadFullNote = (id:string) =>{
		setLoadedNote({visible:true,note_id:id})
	}
	const offLoadFullNote=()=>{
		setLoadedNote({visible:false,note_id:""})
	}


	let notes:any=(<h2>No Notes Yet</h2>)
	notes=notesContext.todos.map(note=>{
		return  (<div className="note-box" key={note.id.toString()}>
					<div className="note-title"><h4>{note.title}</h4></div>
					<button className="btn-pin" onClick={()=>archiveNote(note.id)}><Icons type="archive"/></button>
					 <span className="tooltiptext">Archieve</span>
					 <div className="note-content">
					  {
						(typeof note.content !=="string")?	
						note.content.map(elem=>
							<div className="todo_task" key={elem.id}>  
								<span className="task-complete mt-5" 
									onClick={()=>onTaskComplete(note.id,elem.id)}>
										<Icons type={elem.isCompleted?"check":"uncheck"}/>
								</span>
								
								<span className="todo_content"  
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
		 {loadedNote.visible?
		 	<FullNote id={loadedNote.note_id}  
			 		offLoadFullNote={offLoadFullNote}
					onTaskComplete ={(noteID,elemID)=>onTaskComplete(noteID,elemID)}
					 />:null}
		
		  <div className="main-section">
			{notes}
		  </div>
		</Fragment>
	)
}

export default Notes