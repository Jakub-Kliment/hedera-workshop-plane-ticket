const { createJWT } = require('did-jwt');
const { PrivateKey } = require("@hashgraph/sdk");

// Simulate DID creation (in practice you’d get these from your DID registration)
const didIdentifier = "did:hedera:testnet:xyz"; 
const verificationMethodId = didIdentifier + "#key-1";

// Generate a new ED25519 key pair for this DID (or use an existing one)
const didPrivateKey = PrivateKey.generateED25519();
const didPublicKey = didPrivateKey.publicKey.toString();  // Save this for verification

// Convert the Hedera private key to a hex string for did-jwt (if needed)
// did-jwt expects the key in a specific format; you might need to adjust this based on your SDK.
const privateKeyHex = didPrivateKey.toStringRaw(); // For example, a raw hex string

// Create the JWT payload with your claims
const payload = {
  iss: didIdentifier, // DID as issuer
  sub: didIdentifier, // Optionally, DID as subject
  iat: Math.floor(Date.now() / 1000),
  exp: Math.floor(Date.now() / 1000) + 3600, // Token valid for 1 hour
  // Add other custom claims as needed
  data: "Some unique information or claims"
};

// Create the JWT header. It includes the algorithm (EdDSA for Ed25519) and the key id (kid).
const header = {
  alg: "EdDSA",
  typ: "JWT",
  kid: verificationMethodId,
};

// Create the JWT using did-jwt.
// The `createJWT` function takes the payload, a signer function, and additional options.
async function createDidJwt() {
  // did-jwt uses a signer function. Here, we create one using our private key.
  // The library expects the key in a format that provides a sign function.
  const signer = async (data) => {
    // data is a Buffer; sign it with your Hedera private key.
    // Make sure that the signing algorithm (Ed25519) is used.
    const signature = didPrivateKey.sign(data);
    return signature.toString("hex");
  };

  try {
    const jwt = await createJWT(payload, { alg: header.alg, header, kid: header.kid }, signer);
    console.log("Generated JWT:\n", jwt);
  } catch (err) {
    console.error("Error creating JWT:", err);
  }
}

createDidJwt();
