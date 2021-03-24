
import {ADD_TODO} from './action.types'
import {REMOVE_TODO} from './action.types'

const trashReducer = (state,action) =>{
	switch (action.type) {
		case ADD_TODO:{
			console.log(action.payload)
			return [...state,action.payload]
		}
			
		case REMOVE_TODO:
			let updatedState= state.filter(todo=> todo.id.toString() !== action.payload.id.toString() )
			return updatedState;
		
		default:
			break;
	}
}

export default trashReducer