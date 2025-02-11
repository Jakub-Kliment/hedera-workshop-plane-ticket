const { PrivateKey, Client } = require("@hashgraph/sdk");
import { HcsDid } from "@hashgraph/did-sdk-js/dist/identity/hcs/did/hcs-did.d.ts";
require("dotenv").config();

async function main() {

    // Setup a client for the testnet
    const operatorId = process.env.OPERATOR_ID;
    const operatorKey = process.env.OPERATOR_KEY;

    if (!operatorId || !operatorKey) {
        throw new Error("Environment variables not set up properly!");
    }

    const client = Client.forTestnet();
    client.setOperator(operatorId, operatorKey);
    
    console.log("\n");
    console.log("Operator set up properly!");

    // Create a new DID
    const didPrivateKey = PrivateKey.generate();
    const did = new HcsDid({
        privateKey: didPrivateKey,
        client: client 
    });
    const registeredDid = await did.register();
    const didIdentifier = await registeredDid.getIdentifier()

    console.log("\n");
    console.log(`DID PRIVATE KEY: ${didPrivateKey.toString()}`);
    console.log(`DID PUBLIC KEY: ${didPrivateKey.publicKey.toString()}`);
    console.log(`DID Identifier: ${didIdentifier}`);

    // Add ID proof to DID
    await did.addService({
        id: didIdentifier,
        type: "PersonalInfoService",
        serviceEndpoint: {
            name: "Bob",
            surname: "Dillon",
            birthdate: "2000-03-07",
            nationality: "Swiss",
            id_number: "SW1000200"
        }
    });
}

main();