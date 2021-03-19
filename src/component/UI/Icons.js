import React, { Fragment } from 'react'
import {AiOutlineMenu , AiOutlineSearch} from 'react-icons/ai'
import {VscAdd} from 'react-icons/vsc'
import {ImCross} from 'react-icons/im'

const Icons = (props) =>{
	let icon=null;
	switch (props.type) {
		case "menu":
			icon=(<button className="btn-menu"><AiOutlineMenu/></button>)	
			break;

		case "search":
			icon=(<button className="btn-search"><AiOutlineSearch/></button>)	
			break;
		case "add":
			icon=(<button className="btn-search"><VscAdd/></button>)
			break;
		case "cross":{
			icon=(<button className="btn-search"><ImCross/></button>)
			break;
		}
		default:
			break;
	}
	return(
		<Fragment>{icon}</Fragment>
	)
}

export default Icons