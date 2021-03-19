import React, { Fragment, useReducer } from 'react'
import TodoReducer from './context/reducers'
import NotesContext from './context/NotesContext'

import NavBar from './component/UI/NavBar'
import InputForm from './container/InputForm'
import Notes from './component/Notes'

const App =()=>{
	const [todos,dispatch]=useReducer(TodoReducer,[])
	return(
		<Fragment>
			
			<NavBar/>

			<NotesContext.Provider value={
					{	
						todos:todos,
						dispatch:dispatch
					}
			}>
				<InputForm/>
				<Notes/>
			</NotesContext.Provider>
			{/* <h1>Hello I am Body</h1> */}
		</Fragment>
	)
}

export default App;