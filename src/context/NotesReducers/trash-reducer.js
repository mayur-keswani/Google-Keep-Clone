import {ADD_NOTE , REMOVE_NOTE, ADD_PREV_NOTES} from './action.types'

const trashReducer = (state,action) =>{
	switch (action.type) {
		case ADD_NOTE:{
			localStorage.setItem("localDeletedNotes",JSON.stringify([...state,action.payload]))
			return [...state,action.payload]
		}
			
		case REMOVE_NOTE:{
			let updatedState= state.filter(todo=> todo.id.toString() !== action.payload.id.toString() )
			localStorage.setItem("localDeletedNotes",JSON.stringify(updatedState))
			return updatedState;
		}
		case ADD_PREV_NOTES:{
			return [...state,...action.payload]
		}
		default:
			break;
	}
}

export default trashReducer