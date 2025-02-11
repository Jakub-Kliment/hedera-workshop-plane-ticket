const myDID = "";  //The did to verify 
const myPublicKey = ""; //The public key of the did to verify

verifyDID(myDID, myPublicKey)
    .then(() => console.log(" DID verification passed!"))
    .catch((err) => console.error(err.message));
