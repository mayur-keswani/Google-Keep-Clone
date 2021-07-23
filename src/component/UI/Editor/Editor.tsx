import React from 'react'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type EditorProp={
	content:string,
	EditContentHandler:(val:string)=>void
}
const Editor:React.FC <EditorProp>= (props) =>{

	return(
		<ReactQuill className="noteContent"
			value={props.content}
	  		onChange={(val)=> props.EditContentHandler(val)}/>
	)
}

export default Editor