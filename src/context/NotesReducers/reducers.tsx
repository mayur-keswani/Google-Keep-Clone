import { ActionType } from "./action.types"
import { NoteAction } from "./action.types"
import {NoteType} from '../NotesContext'

 const  Reducer = (state:NoteType[],action:NoteAction) =>{

	switch (action.type) {
		case ActionType.ADD_NOTE:{
			localStorage.setItem("notes",JSON.stringify([...state,action.payload]))
			return [...state,action.payload]
		}
			
		case ActionType.REMOVE_NOTE:{
			let updatedState= state.filter(todo=> todo.id.toString() !== action.payload.id.toString() )
			localStorage.setItem("notes",JSON.stringify(updatedState))
			return updatedState;
		}	 
			
		case ActionType.UPDATE_NOTE:{
			
			 let updatingState={...state};
			let updatingNoteIndex=state.findIndex(todo=>{ return todo.id.toString() === action.payload.id})
			let updatingNote={...updatingState[updatingNoteIndex]};
			updatingNote={...action.payload}
			console.log(action.payload)
			console.log(updatingNote)
			state[updatingNoteIndex]=updatingNote;
			localStorage.setItem("notes",JSON.stringify(state))
			return state
		}

		case ActionType.ADD_PREV_NOTES:{
			return [...state,...action.payload]
		}
		default:
			return state
			
	}
}

export default Reducer