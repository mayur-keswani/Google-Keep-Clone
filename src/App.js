import React, { Fragment, useEffect, useReducer } from 'react'

import NotesContext from './context/NotesContext'

import NavBar from './component/UI/NavBar'
import InputForm from './container/InputForm'
import Notes from './component/Notes/Notes'
import './App.css'
import Sidedrawer from './component/UI/Sidedrawer/Sidedrawer'
import { Route, Switch } from 'react-router'
import Bin from './component/Deleted_Notes/Bin'
import Archive from './component/Archive_Notes/Archive'

import TodoReducer from './context/reducers'
import TrashReducer from './context/trash-reducer'
import ArchiveReducer from './context/archive-reducer'
import { ADD_PREV_TODOS } from './context/action.types'



const App =()=>{
	
	// const [defaultTodos,setDefaultTodos]=useState([])	 
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
				<NavBar/>
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
			 	<Sidedrawer/>
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