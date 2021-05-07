import {ADD_NOTE , ADD_PREV_NOTES , REMOVE_NOTE } from './action.types'

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
		case ADD_PREV_NOTES:{
				return [...state,...action.payload]
			}
		default:
			break;
	}
}

export default archiveReducer