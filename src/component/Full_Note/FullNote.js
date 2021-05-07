import React, {Fragment, useContext, useEffect, useState } from 'react'
import Backdrop from '../UI/Backdrop/Backdrop'
import './FullNote.css'
// context-api stuff
import NotesContext from '../../context/NotesContext'
import {UPDATE_NOTE} from '../../context/NotesReducers/action.types'

const FullNote = (props) =>{
 const notesContext=useContext(NotesContext);
 const [fullNote,setFullNote]=useState({id:'',title:"",content:""})

   useEffect(()=>{
	 if(fullNote.id ==='' || fullNote.id !== props.id)
		{
			let updatingNoteIndex=notesContext.todos.findIndex(note=> note.id.toString() === props.id);
			let updatingNote={...notesContext.todos[updatingNoteIndex]};
			setFullNote({id:updatingNote.id, title:updatingNote.title , content:updatingNote.content});
		}
   },[])

   const updateNoteHandler = (id) =>{
	let updated_note={
		id:id,
		title:fullNote.title,
		content:fullNote.content
	}

	notesContext.dispatch({
		type:UPDATE_NOTE,
		payload:updated_note
	})
	props.offLoadFullNote();
   }

	return (
		<Fragment>
			<Backdrop/>
			<div className="full_note" >
			  <input type="text" className="noteTitle" value={fullNote.title} 
			  	 onChange={(event)=> setFullNote({...fullNote,title:event.target.value})}></input>

			  <textarea className="noteContent" value={fullNote.content}
				onChange={(event)=> setFullNote({...fullNote,content:event.target.value}) 
			   }></textarea>
				
			  <button onClick={()=>updateNoteHandler(fullNote.id)} className="btn-update">Update</button>	
			</div>
		</Fragment>
	)
}

 export default FullNote