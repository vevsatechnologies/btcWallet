// Implementing all features related to transaction of bitcoin
var bitcoin = require('./node_modules/bitcoin-vevsa-lib');


// Signing a bitcoin transaction with private key locally
var privateKey = new bitcoin.PrivateKey(); 


var utxo = {
  "txId" : "115e8f72f39fad874cfab0deed11a80f24f967a84079fb56ddf53ea02e308986",
  "outputIndex" : 0,
  "address" : "17XBj6iFEsf8kzDMGQk5ghZipxX49VXuaV",
  "script" : "76a91447862fe165e6121af80d5dde1ecb478ed170565b88ac",
  "satoshis" : 50000 // or "amount" : 0.00070000
};

var transaction = new bitcoin.Transaction()
  .from(utxo)
  .to('1Gokm82v6DmtwKEB8AiVhm82hyFSsEvBDK', 15000)
  .sign(privateKey);


console.log(transaction.toString());


// Pending Functions Inside this file

// Getting Balance from server
// Getting unspentamount from server
// Fee related functions
// Submit Signed Transaction hash to backend server

// I will try to add these functions here by today itself




