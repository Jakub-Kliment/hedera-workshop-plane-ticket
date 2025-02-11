import React, { useState } from "react";
import MyGroup from "./components/MyGroup.jsx";
import walletConnectFcn from "./components/hedera/walletConnect.js";
import contractDeployFcn from "./components/hedera/contractDeploy.js";
import contractExecuteFcn from "./components/hedera/contractExecute.js";
import "./styles/App.css";
import deploy_did from "./components/did/deploy_did.js";

function App() {
	const [walletData, setWalletData] = useState();
	const [account, setAccount] = useState();
	const [network, setNetwork] = useState();
	const [contractAddress, setContractAddress] = useState();

	const [connectTextSt, setConnectTextSt] = useState("🔌 Connect here...");
	const [contractTextSt, setContractTextSt] = useState();
	const [executeTextSt, setExecuteTextSt] = useState();

	const [connectLinkSt, setConnectLinkSt] = useState("");
	const [contractLinkSt, setContractLinkSt] = useState();
	const [executeLinkSt, setExecuteLinkSt] = useState();

    const [didCreate, setDidCreate] = useState(false);
    const [didCreateTxt, setDidCreateTxt] = useState("Click here to create a DID");


	async function didCreate() {
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
			<h1 className="header">Let's create and Verify a DID !</h1>
			<MyGroup fcn={didCreate} buttonLabel={"Deploy DID"} text={connectTextSt} link={connectLinkSt} />
            
            {/* <MyGroup fcn={didCreate} buttonLabel={"Deploy DID"} text={connectTextSt} link={connectLinkSt} /> */}

		

			<div className="logo">
				<div className="symbol">
					<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
						<path d="M20 0a20 20 0 1 0 20 20A20 20 0 0 0 20 0" className="circle"></path>
						<path d="M28.13 28.65h-2.54v-5.4H14.41v5.4h-2.54V11.14h2.54v5.27h11.18v-5.27h2.54zm-13.6-7.42h11.18v-2.79H14.53z" className="h"></path>
					</svg>
				</div>
				<span>Hedera</span>
			</div>
		</div>
	);
}
export default App;
