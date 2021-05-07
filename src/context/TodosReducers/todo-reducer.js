import { ADD_PREV_TODOS, ADD_TODO, REMOVE_TODO } from './action-types'

const TodoReducer = (state, action) =>{
	switch (action.type) {
		case ADD_TODO:{
			localStorage.setItem("todos",JSON.stringify(...state,action.payload))
		    return [...state,action.payload]
		}
		case REMOVE_TODO:{
			let updatedState= state.filter(todo=> todo.id.toString() !== action.payload.id.toString() )
			localStorage.setItem("notes",JSON.stringify(updatedState))
			return updatedState;
		}
		case ADD_PREV_TODOS:{
			return [...state,...action.payload]
		}
		default:
			break;
	}
}

export default TodoReducer