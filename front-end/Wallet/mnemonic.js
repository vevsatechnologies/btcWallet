const VirgilCrypto =require('virgil-crypto');
const bip39 = require('bip39');

/**
 * Generate a random mnemonic (uses crypto.randomBytes under the hood),
 * defaults to 128-bits of entropy
 * => 'seed sock milk update focus rotate barely fade car face mechanic mercy'
 */
var mnemonic = bip39.generateMnemonic();


/**
 * Generate a seed from mnemonic
 * @params {String} mnemonic 
 *
 * @returns
 *    {HexadecimalString} Seed
 */ 
const seed = bip39.mnemonicToSeedHex(mnemonic);

const virgilCrypto = new VirgilCrypto.VirgilCrypto();

/**
 * Generate a keypair from seed
 *
 * @params {HexadecimalString} seed 
 *
 * @returns {object} keyPair - privateKey and publicKey
 */    
  
const keyPair = virgilCrypto.generateKeysFromKeyMaterial(seed);


/**
 *  Export private key data from the generated privated key
 * @params
 *      {String}  keyPair.privatekey
 *
 * @returns
 *      {String} privateKeyData
 */

const privateKeyData = virgilCrypto.exportPrivateKey(keyPair.privateKey);

/**
 *  Export public key data from the generated privated key
 * @params
 *      {String}  keyPair.publickey
 *
 * @returns
 *      {String} publicKeyData
 */
const publicKeyData = virgilCrypto.exportPublicKey(keyPair.publicKey);

console.log(mnemonic);

console.log(privateKeyData.toString('base64'));
console.log(publicKeyData.toString('base64'));