import React, { useState } from "react";
import "./App.css";
import deploy_did from "./did/deploy_did.js";

function App() {


    const [didCreate, setDidCreate] = useState(false);
    const [didCreateTxt, setDidCreateTxt] = useState("Click here to create a DID");


	async function didCreatefc() {
		if (didCreate) {
			setDidCreateTxt(`You already created a DID!`);
		} else {
			deploy_did(); //TODO: faut récup les infos du DID pour les afficher
            setDidCreateTxt(`DID created!`);
            setDidCreate(true);
		}
	}


	return (
		<div className="App">
      <div className="header">
			  <h1 className="header">Create DID</h1>
        <button className="header" onClick={didCreatefc}>{didCreateTxt}</button>
      </div>
            
        

		

		</div>
	);
}
export default App;
