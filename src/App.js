import React, { Fragment ,useState,useEffect, useReducer } from 'react'

import NotesContext from './context/NotesContext'


import './App.css'
import { Route, Switch } from 'react-router'
import Bin from './component/Deleted_Notes/Bin'
import Archive from './component/Archive_Notes/Archive'
import NavBar from './component/UI/NavBar'
import InputForm from './container/InputForm'
import Notes from './component/Notes/Notes'

import TodoReducer from './context/reducers'
import TrashReducer from './context/trash-reducer'
import ArchiveReducer from './context/archive-reducer'
import { ADD_PREV_TODOS } from './context/action.types'
import Sidedrawer from './component/UI/Sidedrawer/Sidedrawer'



const App =()=>{
	
	 const [triggerSidedrawer,triggerSidedrawerHandler]=useState(true)	 
	useEffect(()=>{
		let localTodos=localStorage.getItem('todos');
		let existingArchivedNotes = localStorage.getItem('archivedNotes');
		let localDeletedNotes = localStorage.getItem('localDeletedNotes')

		if(localTodos){
			dispatch({
				type:ADD_PREV_TODOS,
				payload:JSON.parse(localTodos)
			})
		}

		if(existingArchivedNotes){
			archiveDispatch({
				type:ADD_PREV_TODOS,
				payload:JSON.parse(existingArchivedNotes)
			})
		};

		if(localDeletedNotes){
			trashDispatch({
				type:ADD_PREV_TODOS,
				payload:JSON.parse(localDeletedNotes)
			})
		}

	},[])

	
	const [todos,dispatch]=useReducer(TodoReducer,[])
	const [deletedNotes,trashDispatch]=useReducer(TrashReducer,[])
	const [archivedNotes,archiveDispatch]=useReducer(ArchiveReducer,[])
	return(
		<Fragment>
			{/* {console.log(todos)} */}
			<section id="nav-section">
				<NavBar triggerSidedrawer={()=>triggerSidedrawerHandler((prevState)=> !prevState)}/>
			</section>
			<NotesContext.Provider value={
					{	
						todos:todos,
						dispatch:dispatch,
						deletedNotes:deletedNotes,
						trashDispatch:trashDispatch,
						archivedNotes:archivedNotes,
						archiveDispatch:archiveDispatch
					}}>
			 	<Sidedrawer 
				 	show={triggerSidedrawer} />
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