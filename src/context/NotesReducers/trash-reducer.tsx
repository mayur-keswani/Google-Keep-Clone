import {ActionType } from './action.types'
import { NoteAction } from "./action.types"
import {NoteType} from '../NotesContext'

const TrashReducer = (state:NoteType[],action:NoteAction) =>{
	switch (action.type) {
		case ActionType.ADD_NOTE:{
			localStorage.setItem("localDeletedNotes",JSON.stringify([...state,action.payload]))
			return [...state,action.payload]
		}
			
		case ActionType.REMOVE_NOTE:
			{
				let updatedState= state.filter(todo=> todo.id.toString() !== action.payload.id.toString() )
				localStorage.setItem("localDeletedNotes",JSON.stringify(updatedState))
				return updatedState;
			}
	
		case ActionType.ADD_PREV_NOTES:{
				return [...state,...action.payload]
			}
		default:
				return state;
	}
}

export default TrashReducer