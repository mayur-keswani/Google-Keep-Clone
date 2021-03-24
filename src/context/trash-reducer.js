import {ADD_TODO} from './action.types'
import {REMOVE_TODO} from './action.types'
import {ADD_PREV_TODOS} from './action.types'

const trashReducer = (state,action) =>{
	switch (action.type) {
		case ADD_TODO:{
			localStorage.setItem("localDeletedNotes",JSON.stringify([...state,action.payload]))
			return [...state,action.payload]
		}
			
		case REMOVE_TODO:{
			let updatedState= state.filter(todo=> todo.id.toString() !== action.payload.id.toString() )
			localStorage.setItem("localDeletedNotes",JSON.stringify(updatedState))
			return updatedState;
		}
		case ADD_PREV_TODOS:{
			return [...state,...action.payload]
		}
		default:
			break;
	}
}

export default trashReducer