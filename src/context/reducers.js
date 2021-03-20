import {ADD_TODO, UPDATE_TODO} from './action.types'
import {REMOVE_TODO} from './action.types'

 const  Reducer = (state,action) =>{

	switch (action.type) {
		case ADD_TODO:
			return [...state,action.payload]
			
		case REMOVE_TODO:
			 return state.filter(todo=> todo.id.toString() !== action.payload )
			
		case UPDATE_TODO:{
			 let updatingState={...state};
			let updatingNoteIndex=state.findIndex(todo=>{ return todo.id.toString() === action.payload.id})
		
			// let updatingNote=state.filter(todo=>{ return todo.id.toString() === action.payload.id})
			let updatingNote={...updatingState[updatingNoteIndex]};
			updatingNote={...action.payload}
			state[updatingNoteIndex]=updatingNote;
	
			return state
		}
		default:
			return state
			
	}

}

export default Reducer