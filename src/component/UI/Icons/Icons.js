import React, { Fragment } from 'react'
import {AiOutlineMenu , AiOutlineSearch , AiOutlineBulb , AiOutlinePushpin} from 'react-icons/ai'
import {ImCross , ImCheckboxUnchecked} from 'react-icons/im'
import {RiDeleteBin6Line , RiInboxArchiveLine , RiInboxUnarchiveLine , RiDeleteBin2Fill} from 'react-icons/ri'
import {FaTrashRestoreAlt , FaRegCheckSquare } from 'react-icons/fa'
import {MdAdd} from 'react-icons/md'

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
			icon=(<MdAdd/>)
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
		case "check":{
			icon=(<FaRegCheckSquare/>)
			break;
		}
		case "uncheck":{
			icon=(<ImCheckboxUnchecked/>)
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