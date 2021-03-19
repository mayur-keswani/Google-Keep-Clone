import React, { Fragment , useState ,useContext } from 'react'
import NotesContext from '../context/NotesContext'
import {ADD_TODO} from '../context/action.types'
import './InputForm.css'
import {v4} from 'uuid'

const InputForm = () =>{
	// const TodoContext=useContext(TodoContext)
	const [inputVisible,setInputVisible]=useState(true)
	const [note,setNote]=useState({title:'',content:''})
	const todoContext=useContext(NotesContext)

	const inputLayoutHandler=(e)=>{
		if(note.content===''){
			setInputVisible((prevState)=>{
				return !prevState;
			})
		}else{
			let payload={
				id:v4(),
				title:note.title,
				content:note.content
			}
			todoContext.dispatch({
				type:ADD_TODO,
				payload:payload
			})

			setNote({title:'',content:''})
			console.log(todoContext.todos)
		}
	}
	return(
		<Fragment>
		 <div className="container">
		  <div className="input-group" style={{ display: (inputVisible)?"block":"none"  }}>
		  		<input type="text" name="todo" className="add_note" placeholder="Make a note..." onClick={inputLayoutHandler}></input>
		  </div>
		  <div className="input-group" style={{ display: (inputVisible)?"none":"block"    }}>
		  		<input type="text" className="note_title" placeholder="Title"
				  value={note.title} onChange={(event)=> setNote({...note,title:event.target.value})}></input>

				<textarea className="note_content" placeholder="Take a note..."
					value={note.content} onChange={(e)=> setNote({...note,content:e.target.value})}></textarea>

				<button onClick={inputLayoutHandler} className="btn-close" >Close</button>
		  </div>
		</div>
		</Fragment>
	)
}

export default InputForm;