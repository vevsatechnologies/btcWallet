// Implementing all features related to transaction of bitcoin
var bitcoin = require('./bitcoin-vevsa-lib');

// Signing a bitcoin transaction with private key locally
// var privateKey = BTC private key;     ./bitcoinKeys.js

var privateKey = "b221d9dbb083a7f33428d7c2a3c3198ae925614d70210e28716ccaa7cd4ddb71"
/**
 *
 * UnspentOutput is a class with stateless instances that provides information about an unspent output
 *       utxo data comes from back-end
 */
var utxo = 
[{"txid":"59d81a175ca20d02f737564a47bc3ddb118aa48f96b330bda1a94015375db460","vout":1,"address":"myfpQbH489pyt7nDFrWz8ZrrkcnmtrbyKH","account":"","scriptPubKey":"76a914c71f6c7dcc76d87440e47d3fd2623625f9d0e4c788ac","amount":0.00253905,"confirmations":0,"spendable":false,"solvable":false,"safe":false},{"txid":"e86c2e1ae014c12d5c90310a27e759960014bde52512965db35ba5b10f28569d","vout":1,"address":"myfpQbH489pyt7nDFrWz8ZrrkcnmtrbyKH","account":"","scriptPubKey":"76a914c71f6c7dcc76d87440e47d3fd2623625f9d0e4c788ac","amount":0.00126952,"confirmations":1,"spendable":false,"solvable":false,"safe":true},{"txid":"ab63580f6ef8a9d4b5759b4daac2b8390909b64a8b6da6307454cda7816437af","vout":0,"address":"myfpQbH489pyt7nDFrWz8ZrrkcnmtrbyKH","account":"","scriptPubKey":"76a914c71f6c7dcc76d87440e47d3fd2623625f9d0e4c788ac","amount":3e-7,"confirmations":0,"spendable":false,"solvable":false,"safe":false},{"txid":"3535c83628ee357035d90ac7012d82910d5112c55821005ea27f72af9910f3c8","vout":0,"address":"myfpQbH489pyt7nDFrWz8ZrrkcnmtrbyKH","account":"","scriptPubKey":"76a914c71f6c7dcc76d87440e47d3fd2623625f9d0e4c788ac","amount":0.00063476,"confirmations":1,"spendable":false,"solvable":false,"safe":true}]



/**
 * 
 * Creates a raw transaction
 *
 * @params   
 *      {Number} - fees
 *      {object} - utxo
 *      {String} - address
 *      {Int}    - amount in satoshis
 *      {String} - private key
 * @returns
 *      {object} - transaction hash
 */

var transaction = new bitcoin.Transaction().fee(1000)       //min relay fees is 1000 Satoshi
 

  transaction.from(utxo)                                           // Feed information about what unspent outputs one can use
  .to('n4HY51WrdxATGEPqYvoNkEsTteRfuRMxpD',0)          // Address, Amount in Satoshi  ;Add an output with the given amount of satoshis
  .change('mm45W4J7U5KJFxCK791N1CW76pDwQ2TKDV')         // Address where the change amount is transferred
  .sign(privateKey);                                   // Signs all the inputs it can                           


console.log(transaction.toString());





// Pending Functions Inside this file

// Getting Balance from server
// Getting unspentamount from server
// Fee related functions
// Submit Signed Transaction hash to backend server

// I will try to add these functions here by today itself




