import React, { Fragment } from 'react'
import {AiOutlineMenu , AiOutlineSearch , AiOutlineBulb , AiOutlinePushpin} from 'react-icons/ai'
import {VscAdd} from 'react-icons/vsc'
import {ImCross} from 'react-icons/im'
import {RiDeleteBin6Line , RiInboxArchiveLine , RiInboxUnarchiveLine , RiDeleteBin2Fill} from 'react-icons/ri'
import {FaTrashRestoreAlt} from 'react-icons/fa'

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
			icon=(<button className="btn-add"><VscAdd/></button>)
			break;
		case "cross":{
			icon=(<button className="btn-cross"><ImCross/></button>)
			break;
		}
		case "notes":{
			icon=(<AiOutlineBulb/>);
			break;
		}
		case "bin":{
			icon=(<RiDeleteBin6Line/>)
			break;
		}
		case "archive":{
			icon=(<RiInboxArchiveLine/>)
			break;
		}
		case "pin":{
			icon=(<AiOutlinePushpin/>)
			break;
		}
		case "unarchive":{
			icon=(<RiInboxUnarchiveLine/>)
			break;
		}
		case "restore":{
			icon=(<FaTrashRestoreAlt/>)
			break;
		}
		case "delete-forever":{
			icon=(<RiDeleteBin2Fill/>)
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