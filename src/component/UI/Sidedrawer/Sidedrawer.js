import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Icons from '../Icons'
import './Sidedrawer.css'

const Sidedrawer = (props) =>{
	
	return(

		<Fragment>
			<div className="sidedrawer" style={{display:true?"block":'none'}}>
				<Link to="/">
					<span className="btn-notes" ><Icons type="notes"></Icons></span>
				</Link>
				<Link to="/archive">
					<span className="btn-archive"><Icons type="archive"></Icons></span>
				</Link>
				<Link to="/trash"><span className="btn-bin"><Icons type="bin"></Icons></span>
				</Link>
			</div>
		</Fragment>
	)
}

export default Sidedrawer