import {ADD_NOTE , ADD_PREV_NOTES , REMOVE_NOTE, UPDATE_NOTE } from './action.types'

const archiveReducer = (state,action) =>{
	switch (action.type) {
		case ADD_NOTE:{
			localStorage.setItem("archivedNotes",JSON.stringify([...state,action.payload]))
			return [...state,action.payload]
		}
			
		case REMOVE_NOTE:
			{
				let updatedState= state.filter(todo=> todo.id.toString() !== action.payload.id.toString() )
				localStorage.setItem("archivedNotes",JSON.stringify(updatedState))
				return updatedState;
			}
		case UPDATE_NOTE:{
			
			   let updatingState={...state};
			   let updatingNoteIndex=state.findIndex(todo=>{ return todo.id.toString() === action.payload.id})
			   let updatingNote={...updatingState[updatingNoteIndex]};
			   updatingNote={...action.payload}
			   state[updatingNoteIndex]=updatingNote;
			   localStorage.setItem("archievedNotes",JSON.stringify(state))
			   return state
		   }
		case ADD_PREV_NOTES:{
				return [...state,...action.payload]
			}
		default:
				return state;
	}
}

export default archiveReducer