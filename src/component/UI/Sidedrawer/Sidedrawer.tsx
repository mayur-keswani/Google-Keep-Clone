import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import Icons from '../Icons/Icons'
import './Sidedrawer.css'

const Sidedrawer:React.FC <{show:boolean}>= (props) =>{
	console.log(props.show)
	return(
		<Fragment>
			<div className="sidedrawer" style={{visibility:(props.show)?"visible":"hidden", transition:".40s ease-in-out",
				}}>
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