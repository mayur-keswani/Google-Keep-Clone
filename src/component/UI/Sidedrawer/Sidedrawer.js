import React, { Fragment } from 'react'
import Icons from '../Icons'
import './Sidedrawer.css'

const Sidedrawer = () =>{
	return(
		<Fragment>
			<div className="sidedrawer" style={{display:true?"block":'none'}}>
				<div className="btn-notes"><Icons type="notes"></Icons></div>
				<div className="btn-archive"><Icons type="archive"></Icons></div>
				<div className="btn-bin"><Icons type="bin"></Icons></div>
			</div>
		</Fragment>
	)
}

export default Sidedrawer