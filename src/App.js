import React, { Fragment, useReducer } from 'react'
import TodoReducer from './context/reducers'
import NotesContext from './context/NotesContext'

import NavBar from './component/UI/NavBar'
import InputForm from './container/InputForm'
import Notes from './component/Notes/Notes'
import './App.css'
import Sidedrawer from './component/UI/Sidedrawer/Sidedrawer'
const App =()=>{
	const [todos,dispatch]=useReducer(TodoReducer,[])
	return(
		<Fragment>
			<section id="nav-section">
				<NavBar/>
			</section>
			<NotesContext.Provider value={
					{	
						todos:todos,
						dispatch:dispatch
					}
			}>
			 <Sidedrawer/>
			  <section id="main-section">
			 	<InputForm/>
				<Notes/>
			  </section>
			</NotesContext.Provider>
			{/* <h1>Hello I am Body</h1> */}
		</Fragment>
	)
}

export default App;