import {ADD_TODO} from './action.types'
import {REMOVE_TODO} from './action.types'

 const  Reducer = (state,action) =>{

	switch (action.type) {
		case ADD_TODO:
			return [...state,action.payload]
			
		case REMOVE_TODO:
			 return state.filter(todo=> todo.id.toString() !== action.payload )
				
		default:
			return state
			
	}

}

export default Reducer