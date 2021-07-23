import React from 'react'
import './NavBar.css'

import Logo from '../Logo/Logo'
import Icons from '../Icons/Icons'

const NavBar:React.FC <{triggerSidedrawer:()=>void}>=({triggerSidedrawer})=>{
	return(
		<div id="navbar">
			<section id="menu">
				<button className="btn-menu"  onClick={()=>triggerSidedrawer()}><Icons type="menu"/></button>
			</section>
			<Logo/>
			<section id="project-name"> Keep Clone </section>

			<section id="search-bar">
    				<Icons type="search"/>
    				<input className="input-field" type="text" placeholder="Search Here" name="usrnm"/>
			</section>
		</div>
	)
}

export default NavBar