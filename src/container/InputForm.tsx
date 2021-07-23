import React, { Fragment , useState ,useContext, FormEvent } from 'react'
import Icons from '../component/UI/Icons/Icons'
import './InputForm.css'
// context-api stuff
import NotesContext from '../context/NotesContext'
import {ActionType} from '../context/NotesReducers/action.types'

import {v4} from 'uuid'

const InputForm:React.FC = () =>{
	// const TodoContext=useContext(TodoContext)

	const [isNotesFormOpen,toggleNotesForm] = useState(false)
	const [isTodoFormOpen,toggleTodoForm] = useState(false)

	const [note,setNote]=useState({title:'',content:''})
	const [todo,setTodo] = useState<{title:string,tasks:{id: string; isCompleted: boolean; task: string;}[]}>
									({title:"",tasks:[] })
	const [todoTask,setTodoTask] = useState("")
	const [onAddingNewTodo,setNewTodo] = useState(false)

	const notesContext=useContext(NotesContext)

	const submitNoteHandler=()=>{
		if(note.title || note.content ){
			let payload={
				id:v4(),
				criterion:"NOTE",
				title:note.title,
				content:note.content
			}
			
			notesContext.dispatch({
				type:ActionType.ADD_NOTE,
				payload:payload
			})
		}
			
			toggleNotesForm(false)
			setNote({title:'',content:''})
	}


	const onAddTaskHandler = async () =>{
		let payload={id:v4(),isCompleted:false,task:todoTask}
		// await setTodo(
		// 	 {...todo,tasks:[...todo.tasks,payload]
		// 	} 
		// )
		console.log(payload)
		await setTodo(prevState=>
		    {
			    let content:{ id: string; isCompleted: boolean; task: string; }[]=[]
				if(typeof prevState.tasks!=='string'){
			    	content=prevState.tasks.concat(payload)
					console.log(content)
				}
			   return {...prevState,tasks:content}
			}
		)	
		setTodoTask("")
	}

	const submitTodoHandler= async(e :FormEvent)=>{
		// await onAddTaskHandler()
	
		let tasks;
		if(todoTask)
			 tasks = [...todo.tasks,{id:v4(),isCompleted:false,task:todoTask}]
		else
			 tasks= [...todo.tasks]
		let payload={
			id:v4(),
			criterion:"TODO",
			title:todo.title,
			content:tasks
		}
		notesContext.dispatch({
			type:ActionType.ADD_NOTE,
			payload:payload
		})
		setTodo({title:"",tasks:[]})
		setTodoTask("")
		toggleTodoForm(false)
	}
	
	return(
		<Fragment>
		 <div className="container p-0">
		  <div className="input-group " style={{ display: (isNotesFormOpen || isTodoFormOpen)?"none":"block"  }}>
		  		
			  	<input type="text" name="todo" className="add_note" 
			  		placeholder="Make a note..." 
			 		onClick={()=> toggleNotesForm(true)}>	
				</input>		  	
				<div className="add-todo p-0"
					onClick={()=>{ toggleTodoForm(true); setNewTodo(true)}}>
					<Icons type="check"/> 
				</div> 
		  </div>
		  {/* notes form */}
		  <div className="input-group" style={{ display: (isNotesFormOpen)?"block":"none"    }}>
		  		<input type="text" className="note_title" placeholder="Title"
				  value={note.title} onChange={(event)=> setNote({...note,title:event.target.value})}></input>

				<textarea className="note_content" placeholder="Take a note..."
					value={note.content} onChange={(e)=> setNote({...note,content:e.target.value})}></textarea>

				<button onClick={submitNoteHandler} className="btn-close" >Close</button>
		  </div>

		  {/* Todo Form */}
		  <div className="input-group" style={{ display: (isTodoFormOpen)?"block":"none"}}>
		  		<input type="text" 
				  className="todo_title" 
				  placeholder="Title"
				  value={todo.title}
				  onChange={(e)=>setTodo({...todo,title:e.target.value})} >
				</input>
				<hr/>
					{
						todo.tasks.map((elem)=>
							<div className="todo_task" key={elem.id} >  
				   				<span className="task-add" onClick={onAddTaskHandler}><Icons type="add"/></span>
								<input type="text" 
				  		 			className="todo_content" 
									placeholder="list item"
									style={{backgroundColor:"white"}}
				  		 			value={elem.task}
									readOnly
						 		/>
								 
				   			</div>		 
						)
					}
					{
						onAddingNewTodo
						?
						(
							<div className="todo_task">  
				   				<span className="task-add" onClick={onAddTaskHandler}><Icons type="add"/></span>
								<input type="text" 
				  		 			className="todo_content" 
								 	placeholder="list item"
				  		 			value={todoTask}
									onChange={(e)=>setTodoTask(e.target.value)}
						 		/>  	
							 
				   			</div>
						)
						:null

					}
				   
				<hr/>
			<button onClick={(e)=>
					submitTodoHandler(e)} className="btn-close" >Close</button>
		  </div>

		</div>
		</Fragment>
	)
}

export default InputForm;