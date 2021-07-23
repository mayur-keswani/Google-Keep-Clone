import  {createContext} from 'react'
import { NoteAction } from './NotesReducers/action.types'
export type NoteType={
	id:string,
	criterion:string,
	title:string,
	content:string | ({id:string,isCompleted:boolean,task:string}[]) 
 }
export type initialInterface = {
	 todos:NoteType[],
	 deletedNotes:NoteType[],
	 archivedNotes:NoteType[],
	 dispatch:React.Dispatch<NoteAction>,
	 trashDispatch:React.Dispatch<NoteAction>
	 archiveDispatch:React.Dispatch<NoteAction>

 }
//  const initialNoteState = {
// 	todos:[],
// 	deletedNotes:[],
// 	archivedNotes:[]
//  }
 const NotesContext = createContext({} as initialInterface)

 export default NotesContext