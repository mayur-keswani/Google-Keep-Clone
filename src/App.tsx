import React, { Fragment ,useState,useEffect, useReducer } from 'react'

import NotesContext from './context/NotesContext'

import './App.css'
import { Route, Switch } from 'react-router'
import Bin from './component/Deleted_Notes/Bin'
import Archive from './component/Archive_Notes/Archive'
import NavBar from './component/UI/NavBar/NavBar'
import InputForm from './container/InputForm'
import Notes from './component/Notes/Notes'

import NotesReducer from './context/NotesReducers/reducers'
import TrashReducer from './context/NotesReducers/trash-reducer'
import ArchiveReducer from './context/NotesReducers/archive-reducer'
import { ActionType } from './context/NotesReducers/action.types'
import Sidedrawer from './component/UI/Sidedrawer/Sidedrawer'




const App:React.FC =()=>{
	
	 const [showSidedrawer,setSidedrawer]=useState<boolean>(true)	 

	useEffect(()=>{
		let localTodos=localStorage.getItem('notes');
		let existingArchivedNotes = localStorage.getItem('archivedNotes');
		let localDeletedNotes = localStorage.getItem('localDeletedNotes')

		if(localTodos){
			dispatch({
				type:ActionType.ADD_PREV_NOTES,
				payload:JSON.parse(localTodos)
			})
		}

		if(existingArchivedNotes){
			archiveDispatch({
				type:ActionType.ADD_PREV_NOTES,
				payload:JSON.parse(existingArchivedNotes)
			})
		};

		if(localDeletedNotes){
			trashDispatch({
				type:ActionType.ADD_PREV_NOTES,
				payload:JSON.parse(localDeletedNotes)
			})
		}

	},[])

	const triggerSidedrawer = () =>{
		console.log("here")
		setSidedrawer(prevState=> { return !prevState})
	}
	
	const [notes,dispatch]=useReducer(NotesReducer,[]);
	const [deletedNotes,trashDispatch]=useReducer(TrashReducer,[])
	const [archivedNotes,archiveDispatch]=useReducer(ArchiveReducer,[])
	return(
		<Fragment>
			{/* {console.log(todos)} */}
			<section id="nav-section">
				<NavBar triggerSidedrawer={triggerSidedrawer}/>
			</section>
			<NotesContext.Provider value={
					{	
						todos:notes,
						dispatch:dispatch,
						deletedNotes:deletedNotes,
						trashDispatch:trashDispatch,
						archivedNotes:archivedNotes,
						archiveDispatch:archiveDispatch
					}}>
			 	<Sidedrawer 
				 	show={showSidedrawer} />
			  	<section id="main-section">
				  <Switch>
				  	  <Route path="/archive" exact render={()=> <Fragment><Archive/></Fragment>}	
								></Route>
					  <Route path="/trash" exact render={()=> <Fragment><Bin/></Fragment>}	
								></Route>

					  <Route path="/" exact render={()=> <Fragment><InputForm/> <Notes/></Fragment>}	
								></Route>

				  </Switch>
			 		
			  	</section>
			</NotesContext.Provider>
			{/* <h1>Hello I am Body</h1> */}
		</Fragment>
	)
}

export default App;