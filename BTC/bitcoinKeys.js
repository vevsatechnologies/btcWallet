var bitcoin = require('./node_modules/bitcoin-vevsa-lib');

var privateKey = new bitcoin.PrivateKey();
console.log(privateKey.toString());

var publicKey  = privateKey.toPublicKey();
console.log(publicKey.toString());

var address = publicKey.toAddress(bitcoin.Networks.livenet);
console.log(address.toObject());
