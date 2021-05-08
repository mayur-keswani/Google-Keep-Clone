import React, {Fragment, useContext, useEffect, useState } from 'react'
import Backdrop from '../UI/Backdrop/Backdrop'
import Icons from '../UI/Icons/Icons';
import {v4} from 'uuid'
import './FullNote.css'
// context-api stuff
import NotesContext from '../../context/NotesContext'
import { UPDATE_NOTE} from '../../context/NotesReducers/action.types'

const FullNote = (props) =>{
 const notesContext=useContext(NotesContext);
 const [fullNote,setFullNote]=useState({id:'',criterion:'',title:"",content:""})
//  const [todo , setTodo]=useState({title:"",tasks:[]})
 const [todoTask , setTodoTask] = useState("")

   useEffect(()=>{
	 if(fullNote.id ==='' || fullNote.id !== props.id)
		{
			let updatingNoteIndex=notesContext.todos.findIndex(note=> note.id.toString() === props.id);
			let updatingNote={...notesContext.todos[updatingNoteIndex]};
			setFullNote({
				id:updatingNote.id,
				criterion: updatingNote.criterion,
				title:updatingNote.title ,
				content:updatingNote.content
			});
		}
   },[])

   const updateNoteHandler = (id) =>{
	let updated_note={
		id:id,
		criterion:fullNote.criterion,
		title:fullNote.title,
		content:fullNote.content
	}

	notesContext.dispatch({
		type:UPDATE_NOTE,
		payload:updated_note
	})
	props.offLoadFullNote();
   }

  const onAddTaskHandler = async () =>{
	let payload={id:v4(),isCompleted:false,task:todoTask}	 
	await setFullNote(prevState=>
		{
		   let tasks=prevState.content.concat(payload)
		   console.log(tasks)
		   return {...prevState,content:tasks}
		}
	)	
	setTodoTask("")
  }

  const updateTodoHandler= async()=>{
	let tasks;
	if(todoTask)
		 tasks = [...fullNote.content,{id:v4(),isCompleted:false,task:todoTask}]
	else
		 tasks= [...fullNote.content]

	let payload={
		id:fullNote.id,
		criterion:fullNote.criterion,
		title:fullNote.title,
		content:tasks
	}
	
	notesContext.dispatch({
		type:UPDATE_NOTE,
		payload:payload
	})
	props.offLoadFullNote();
}

	
	return (
		<Fragment>
			<Backdrop/>
			<div className="full_note" >
			  <input type="text" className="noteTitle" value={fullNote.title} 
			  	 onChange={(event)=> setFullNote({...fullNote,title:event.target.value})}></input>
			<div  className="content-section">
			  {
				  fullNote.criterion==="TODO"
				  ?	
				  	<>
				  		{fullNote.content.map(elem=>
							<div className="todo_task" key={elem.id}>  
								<span className="task-complete mt-5" 
									onClick={()=>props.onTaskComplete(fullNote.id,elem.id)}
									>
										<Icons type={elem.isCompleted?"check":"uncheck"}/>
								</span>
								
								<span className="todo_content" 
									readOnly 
									style={{textDecoration:(elem.isCompleted)?"line-through":"none"}}>
									{elem.task}
								</span>	

				   			</div>
						)}
							<hr width="95%" style={{borderWidth:"1px",margin:"auto"}}></hr>
							<div className="todo_task" style={{marginTop:'1rem'}}>  
				   				<span className="task-add" 
								   onClick={onAddTaskHandler}>
								   <Icons type="add"/>
								</span>
								<input type="text" 
									value={todoTask}
									onChange={(e)=>setTodoTask(e.target.value)}
				  		 			className="todo_content" 
								 	placeholder="list item"
				  		 			
						 		/>  			 
				   			</div>	

						</>
				  :
				  (
					<textarea className="noteContent"
			  			value={fullNote.content}
						onChange={(event)=> setFullNote({...fullNote,content:event.target.value}) }>		
			  		</textarea>
				  )
			  }
			  </div>
				
			  <button onClick={()=>
			  	 fullNote.criterion==="TODO" ?
					updateTodoHandler(fullNote.id) :
					updateNoteHandler(fullNote.id)
				} 
				className="btn-update">Update
			  </button>	
			</div>
		</Fragment>
	)
}

 export default FullNote