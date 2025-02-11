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

    console.log("Registering DID...");

    const registeredDid = await did.register();
    const didIdentifier = await registeredDid.getIdentifier()

    console.log("\n");
    console.log("DID registered successfully !");
    console.log(`DID Identifier: ${didIdentifier}`);

    // Add ID as a service to DID
    console.log("\n");
    console.log("Adding ID to DID...");

    const serviceIdentifier = "";

    await registeredDid.addService({
        id: serviceIdentifier,
        type: "PersonalInfoService",
        serviceEndpoint: {
            name: "Bob",
            surname: "Dillon",
            birthdate: "2000-03-07",
            nationality: "Swiss",
            id_number: "SW1000200"
        }
    });

    console.log("ID added successfully!");

    // Add verification method of ID to DID
    const verificationMethodIdentifier = "";
    const verificationMethodPublicKey = HcsDid.stringToPublicKey("");

    console.log("\n");
    console.log("Adding verification method to DID...");

    await registeredDid.addVerificationMethod({
        id: verificationMethodIdentifier,
        type: "Ed25519VerificationKey2018",
        controller: didIdentifier,
        publicKey: verificationMethodPublicKey,
    });

    console.log("Verification method added successfully !");

    // Link verification method with the ID (create a relationship)
    const verificationRelationshipIdentifier = "";
    const verificationRelationshipPublicKey = HcsDid.stringToPublicKey("");

    console.log("\n");
    console.log("Linking ID to verification method...");

    await did.addVerificationRelationship({
        id: verificationRelationshipIdentifier + "#key-1",
        relationshipType: "authentication",
        type: "Ed25519VerificationKey2018",
        controller: registeredDid.getIdentifier(),
        publicKey: verificationRelationshipPublicKey,
    });

    console.log("Linked ID with verification method !");

}

main();