import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import Icons from '../Icons'
import './Sidedrawer.css'

const Sidedrawer = ({show,triggerSidedrawer}) =>{
	return(
		<Fragment>
			<div className="sidedrawer" style={{display:show?"block":'none', transition:".40s ease-in-out",
				transform:show?"translateY(0)":"translateY(-100vh)" }}>
				<NavLink to="/">
					<span className="btn-notes">
						<Icons type="notes"></Icons>
					</span>
				</NavLink>


				<NavLink to="/archive">
					<span className="btn-archive" >
							<Icons type="archive"></Icons>
					</span>
				</NavLink>


				<NavLink to="/trash">
					<span className="btn-bin">
						<Icons type="bin"></Icons>
					</span>
				</NavLink>
			</div>
		</Fragment>
	)
}

export default Sidedrawer