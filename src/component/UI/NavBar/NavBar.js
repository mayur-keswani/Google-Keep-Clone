import React from 'react'
import './NavBar.css'

import Logo from '../Logo/Logo'
import Icons from '../Icons/Icons'

const NavBar =({triggerSidedrawer})=>{
	return(
		<div id="navbar">
			<section id="menu" onClick={triggerSidedrawer}>
				<Icons type="menu"/>
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