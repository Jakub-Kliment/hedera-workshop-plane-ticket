import React from "react";
import MyButton from "./MyButton.jsx";
import MyText from "./MyText.jsx";

function MyGroup(props) {
	return (
		<div>
			<MyText text={props.text}  />
			<MyButton fcn={props.fcn} buttonLabel={props.buttonLabel} />
		</div>
	);
}

export default MyGroup;
