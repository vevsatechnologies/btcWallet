
// This code is not for testing purpose , the code describes the flow of transaction process taking place. Each function is individually tested .


var bitcoin = require('./bitcoin-vevsa-lib');
const Client     = require('bitcoin-core');
const client     = new Client(  { 
                             network : 'testnet',
                             port    : 18332,
                             username    : 'test',
                             password : 'test123'
                           }  );



/**
  * Create two addresses and key pair to carry out btc transaction between them
  */
var arr = [2]                    // Array to store addresses
var privateKeyArr = [2]          // Array to store publickey

for(var i=0 ; i<2 ; i++) {

/*
* Returns a randomly generated pirvate key
*
*  Instantiate a PrivateKey 
*  @params
*      {String} - Wallet public key    ; /../Wallet/mnemonic.js
*      {object} - network information  
* @return
*    A private key generated from a BN , Buffer and WIF.
*/


var privateKey = new bitcoin.PrivateKey(bitcoin.Networks.testnet);
console.log(privateKey.toString());
var privateKeyArr[i] = privateKey.toString();



/**
 * Returns the corresponding public key generated from the private key
 *
 * instance method of private key 
 * 
 * @returns
 *    A public key generated from private key
 */

var publicKey  = privateKey.toPublicKey();
console.log(publicKey.toString());



/**
 * Returns an address for the public key
 * 
 * @param {String | Network} bitcoin.Networks.livenet - which network should be the address for
 *
 * @returns {Address}
 *    An address generated from the public key.
 */

var arr[i] = publicKey.toAddress(bitcoin.Networks.testnet);
var address = publicKey.toAddress(bitcoin.Networks.testnet);
console.log(address.toString());



/**
  * Imports the address
  * 
  * @params
  *      {String} address           ;    required
  *      {String} account           ;    optional
  *      {bool}   rescan            ;    optional - true by default
  * @returns
  *       {null}
  */
client.importAddress(address).then((result) => console.log("Address Imported"));

}


var sender = arr[0]                        // address of sender
var receiver = arr[1]                      // address of receiver


var privateKey = privateKeyArr[0]          //senders private key to be used for signing the transaction


/**
  * Returns balance for an address within the range of provided min and max confirmations
  *
  * @params -
  *     {String} - Address                       ; required , "" default account  
  *     {Int} - minimum number of confirmations  
  *     {Int} - maximum number of confirmations  
  * @returns - 
  *     {Number} - balance 
  */

var min_conf = 0
var max_conf = 99999

client.listUnspent(min_conf,max_conf,[sender,receiver]).then(function(unspent) {

var sum = 0;
  for (var i = 0; i < unspent.length; i++) {
    sum += unspent[i].amount;
    
}

console.log("Balance of given address is :" +  sum);
} )



/**
  * Calculates estimated fees
  *
  * @params {Int}-Blocks ; The maximum number of blocks a transaction should have to wait before it is predicted to be included in a block. Has to be between 2 and 25 blocks
  *
  * @returns {number} fee ;number of bitcoins 
  * Sets the transaction fees to the calculated fees.
  */

var blocks = 6

client.estimateSmartFee(blocks).then((result) => {
 
  console.log("Fees: "+ result)
  } );


/**
  * Lists unspent output for a given address and in given range of confirmations
  * @params 
  *    {Int} - minimum number of confirmations     ; 0
  *    {Int} - maximum number of confirmations     ; 
  *    {[addresses]} - Address
  *
  *   @returns 
  *        utxo object ; array of unspent objects 
  * [{g
  *    "txid": "448140c85b132f462bfee0bbd34504d370d455783c56da9e24258ed1be8222c5",
  *    "vout": 1,
  *    "address": "msZqFwxsbjqSac6ANzEcCECvPwi3e9C5MX",
  *    "account": "",
  *    "scriptPubKey": "76a914842ce238e9ed3726fe9a24eddfe47b89b132dd7388ac",
  *    "amount": 1.30000000,
  *    "confirmations": 982,
  *    "spendable": true
  *  }]
  *
  *
  */

  // utxo object of sender is required to sign a transaction

var min_conf = 0 
var max_conf = 99999

var utxo = client.listUnspent(min_conf,max_conf,[sender]).then((unspent) => console.log("UTXO: " + JSON.stringify(unspent)));



var transaction = new bitcoin.Transaction().fee(1000)       //min relay fees is 1000 Satoshi
 

  transaction.from(utxo)                                           // Feed information about what unspent outputs one can use
  .to(receiver,30)          // Address, Amount in Satoshi  ;Add an output with the given amount of satoshis
  .change(sender)         // Address where the change amount is transferred
  .sign(privateKey);             // Signs all the inputs it can using private key of the sender                       

var txHash = transaction.toString();
console.log(txHash);



/**
  * Validates a transaction and broadcasts it to the peer-to-peer network.
  * 
  * @params
  *      {HexadecimalString} Transaction Hash   ;required (Sent from the  front-end )
  *      {bool} Allow high fees                 ;optional - by default false
  *
  * @returns
  *       {null/String}   TxID           
  */

  client.sendRawTransaction(txHash,true).then((txid) => {


	console.log("Transaction ID: " + txid);



/**
  * Gets information about a particular transaction
  * 
  * @params
  *      {String} TransactionID ;    required
  *
  * @returns
  *       {object}  Information about the transaction        
  *  2a5054484efd968073e9e08241448dc26695ccacbe59491952a4ffdac07a29ce   
  * daf1d80ee42b7e498eec64bb9771904738d092f1b283b5e5fc5f8acc4d3d29d2
  */

client.getTransaction(txid).then((result) => console.log("Transaction details: " + JSON.stringify(result)));

  });






/**
  * Get transaction history 
  * 
  * @params
  *      {number} min_conf          ;    optional
  *      {bool} include empty       ;    optional - whether to include empty accounts
  *      {bool} include watch-only  ;    optional - whether to include watch only addresses
  * @returns
  *       {array}  - account names, balances, and minimum confirmations
  */

var min_conf = 0
var include_empty = true
var include_watchonly = true


client.listReceivedByAddress(min_conf,include_empty,include_watchonly).then((result) => {

console.log("Received : " + result)

});


