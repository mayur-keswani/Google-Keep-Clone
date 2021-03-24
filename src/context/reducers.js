import {ADD_TODO, UPDATE_TODO} from './action.types'
import {REMOVE_TODO} from './action.types'
import {ADD_PREV_TODOS} from './action.types'
 const  Reducer = (state,action) =>{

	switch (action.type) {
		case ADD_TODO:{
			localStorage.setItem("todos",JSON.stringify([...state,action.payload]))
			return [...state,action.payload]
		}
			
			
		case REMOVE_TODO:{
			// console.log(localStorage.getItem(todos[action.payload}]))
			// localStorage.removeItem(`${todos[action.payload] }`)
			let updatedState= state.filter(todo=> todo.id.toString() !== action.payload.id.toString() )
			localStorage.setItem("todos",JSON.stringify(updatedState))
			return updatedState;
		}
			 
			
		case UPDATE_TODO:{
			 let updatingState={...state};
			let updatingNoteIndex=state.findIndex(todo=>{ return todo.id.toString() === action.payload.id})
		
			// let updatingNote=state.filter(todo=>{ return todo.id.toString() === action.payload.id})
			let updatingNote={...updatingState[updatingNoteIndex]};
			updatingNote={...action.payload}
			state[updatingNoteIndex]=updatingNote;
	        
			localStorage.setItem("todos",JSON.stringify(state))
			return state
		}
		case ADD_PREV_TODOS:{
			return [...state,...action.payload]
		}
		default:
			return state
			
	}

}

export default Reducer