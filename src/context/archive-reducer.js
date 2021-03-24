
import {ADD_TODO} from './action.types'
import {REMOVE_TODO} from './action.types'

const archiveReducer = (state,action) =>{
	switch (action.type) {
		case ADD_TODO:
			return [...state,action.payload]
		case REMOVE_TODO:
			return [...state,action.payload]
		
		default:
			break;
	}
}

export default archiveReducer