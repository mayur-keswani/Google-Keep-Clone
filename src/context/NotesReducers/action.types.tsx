// export const ADD_NOTE = "ADD_NOTE";
// export const REMOVE_NOTE = "REMOVE_NOTE";
// export const UPDATE_NOTE ="UPDATE_NOTE";
// export const ADD_PREV_NOTES ="ADD_PREV_NOTES";

import {NoteType} from '../NotesContext'
export enum ActionType {
		ADD_NOTE="ADD_NOTE",
		REMOVE_NOTE="REMOVE_NOTE",
		UPDATE_NOTE="UPDATE_NOTE",
		ADD_PREV_NOTES="ADD_PREV_NOTES"
	}
 export interface ADD_NOTE{
	 type:ActionType.ADD_NOTE,
	 payload:NoteType
 }

 export interface REMOVE_NOTE{
	type:ActionType.REMOVE_NOTE,
	payload:NoteType
 }
 export interface UPDATE_NOTE{
	 type:ActionType.UPDATE_NOTE,
	 payload:NoteType,
 }
 export interface ADD_PREV_NOTES {
	 type:ActionType.ADD_PREV_NOTES,
	 payload:NoteType[]
 }

 export type NoteAction = | ADD_NOTE | REMOVE_NOTE | UPDATE_NOTE | ADD_PREV_NOTES 