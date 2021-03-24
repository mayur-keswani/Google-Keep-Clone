
import {ADD_TODO} from './action.types'
import {REMOVE_TODO} from './action.types'

const archiveReducer = (state,action) =>{
	switch (action.type) {
		case ADD_TODO:
			return [...state,action.payload]
		case REMOVE_TODO:
			{
				let updatedState= state.filter(todo=> todo.id.toString() !== action.payload.id.toString() )
				return updatedState;
			}
		
		default:
			break;
	}
}

export default archiveReducer