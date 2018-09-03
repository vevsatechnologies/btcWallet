const Client     = require('bitcoin-core');
const client     = new Client(  { 
                             network : 'testnet',
                             port    : 18332,
                             username    : 'test',
                             password : 'test123'
                           }  );




var txid = "448140c85b132f462bfee0bbd34504d370d455783c56da9e24258ed1be8222c5" ;   

var address = "myfpQbH489pyt7nDFrWz8ZrrkcnmtrbyKH";

var txHash = "010000000460b45d371540a9a1bd30b3968fa48a11db3dbc474a5637f7020da25c171ad859010000006b483045022100d5b4ffc631bda4eab4ee15e6f7ed46880489b21c3c1c923924ea0cdf6aeaa06a0220020dc16810f1cd656b23c3432c0c49d2d37a432b4347a3dd569e934de6d77b9e012103170cb463d7acfa03af9e6c65a27a8b6f821e752eaff9ff04f710e07c3fbe5b2effffffff9d56280fb1a55bb35d961225e5bd14009659e7270a31905c2dc114e01a2e6ce8010000006a47304402206d041d794b33f1d14b0d230134863a58c2be03efcb66bc7f322ba48f988d96dd022008f0f68733d4ec6c3b349f6d8cb0dca00b40bfdd96b5aa5b2ba639b0aac14668012103170cb463d7acfa03af9e6c65a27a8b6f821e752eaff9ff04f710e07c3fbe5b2effffffffaf376481a7cd547430a66d8b4ab6090939b8c2aa4d9b75b5d4a9f86e0f5863ab000000006a47304402200c2ee401517bff1ac5be2cc2414d9e39d6000c1bfc1c460ee8a91f9682b3985f022062a3e2405165507fca94cb039fcea85e26ffb09fbb48c41511b24e4960cbb7cc012103170cb463d7acfa03af9e6c65a27a8b6f821e752eaff9ff04f710e07c3fbe5b2effffffffc8f31099af727fa25e002158c512510d91822d01c70ad9357035ee2836c83535000000006b483045022100b89958aeef1f72521bef1c215fc30a5708d8fb38ac6a487b9b3fa9c34fe9be1c0220254677d478272d3d16fb0a0c1d254106298c6910b88408d46a21ea05b313b3f8012103170cb463d7acfa03af9e6c65a27a8b6f821e752eaff9ff04f710e07c3fbe5b2effffffff021e000000000000001976a914f9c1437adefc936cea1e20109a5c56ad51a13de688acc5c30600000000001976a9143cbb8a305e36b1c7a6b0dc6516abb7776488449a88ac00000000"






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

client.listUnspent(min_conf,max_conf,[address]).then(function(unspent) {

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

client.estimateFee(blocks).then((result) => {
 
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
  * [{
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

var min_conf = 0 
var max_conf = 99999
client.listUnspent(min_conf,max_conf,[address]).then((unspent) => console.log("UTXO: " + JSON.stringify(unspent)));



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

  client.sendRawTransaction(txHash,true).then((transactionID) => console.log("Transaction ID: " + transactionID));


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





