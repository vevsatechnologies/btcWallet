// This module is used to encrypt and decrypt data when serving from server

const VirgilCrypto =require('virgil-crypto');

const virgilCrypto = new VirgilCrypto.VirgilCrypto();
const encryptionKeypair = virgilCrypto.generateKeys();

// prepare a message
const messageToEncrypt = 'Hello, Bob!';
console.log("Original message: ", messageToEncrypt);

// encrypt the message
const encryptedData = virgilCrypto.encrypt(messageToEncrypt, encryptionKeypair.publicKey);
// encryptedData is a NodeJS Buffer (or polyfill if in the browser)
console.log("Encrypted Data: ",encryptedData.toString('base64'));


// decrypt the encrypted data using a private key
const decryptedData = virgilCrypto.decrypt(encryptedData, encryptionKeypair.privateKey);

// convert Buffer to string
const decryptedMessage = decryptedData.toString('utf8');
console.log("Decrypted Data: ",decryptedMessage);