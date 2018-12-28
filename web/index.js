var Web3 = require('web3');
var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var querystring = require('querystring');
var port = 8000;

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

if (web3.isConnected()) {
    console.log("web3.isConnected ok!");
} else {
    console.log("web3.isConnected fail!");
}

// get the contract
var address = "0xc335ca0d350b28c4945726c5a75f0e93890158aa";
var abi = [{"constant":false,"inputs":[],"name":"work","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_sunflowersNum","type":"uint256"}],"name":"getSunflowersBySuns","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getMyBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getSunsBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getSunflowersNum","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getContractBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getSuccessAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"buySuns","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"getFreeSuns","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"sellSuns","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getMsgSender","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"sunPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ownerAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"rest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getFailAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"donate","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"quit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":true,"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[],"name":"FunctionEndEvent","type":"event"}];
var ethersunflowersContract = web3.eth.contract(abi).at(address);

// http server
http.createServer(function(req, res) {
    var pathname = url.parse(req.url).pathname;
    var mimeType = getMimeType(pathname);
    if (!!mimeType) {
        handlePage(req, res, pathname);
    } else {
        handleAjax(req, res);
    }
}).listen(port, function() {
    console.log('server listen on port', port);
});

function getMimeType(pathname) {
    var validExtensions = {
        ".html": "text/html",
        ".js": "application/javascript",
        ".css": "text/css",
        ".jpg": "image/jpeg",
        ".gif": "image/gif",
        ".png": "image/png"
    };
    var ext = path.extname(pathname);
    var type = validExtensions[ext];
    return type;
}

function handlePage(req, res, pathname) {
    var filePath = __dirname + pathname;
    var mimeType = getMimeType(pathname);
    if (fs.existsSync(filePath)) {
        fs.readFile(filePath, function(err, data) {
            if (err) {
                res.writeHead(500);
                res.end();
            } else {
                res.setHeader("Content-Length", data.length);
                res.setHeader("Content-Type", mimeType);
                res.statusCode = 200;
                res.end(data);
            }
        });
    } else {
        res.writeHead(500);
        res.end();
    }
}

// handle http get requests from client
function handleAjax(req, res) {
    var urlQuery = url.parse(req.url).query;
    var functionName = querystring.parse(urlQuery).functionName;
    if (functionName == "getAccounts") {
        sendMessage(res, web3.eth.accounts.toString());
        return;
    }

    // console.log(functionName);
    var from =  querystring.parse(urlQuery).from;
    var from = web3.eth.accounts[from];
    
    /********************************* block 1 *********************************************/
    if (functionName == "getMyBalance") {
        sendMessage(res, web3.fromWei(web3.eth.getBalance(from), 'ether'));
    }
    else if (functionName == "getContractBalance") {
        ethersunflowersContract.getContractBalance.call({from:from}, function(error, result){
            if (!error) {
                sendMessage(res, web3.fromWei(result, 'ether'));
            } else {
                sendMessage(res, error);
            }
        });
    }
    else if (functionName == "getSunsBalance") {
        ethersunflowersContract.getSunsBalance.call({from:from}, function(error, result){
            if (!error) {
                sendMessage(res, result);
            } else {
                sendMessage(res, error);
            }
        });
    }
    else if (functionName == "getSunflowersNum") {
        ethersunflowersContract.getSunflowersNum.call({from:from}, function(error, result){
            if (!error) {
                sendMessage(res, result);
            } else {
                sendMessage(res, error);
            }
        });
    }
    else if (functionName == "getSuccessAmount") {
        ethersunflowersContract.getSuccessAmount.call({from:from}, function(error, result){
            if (!error) {
                sendMessage(res, result);
            } else {
                sendMessage(res, error);
            }
        });
    }
    else if (functionName == "getFailAmount") {
        ethersunflowersContract.getFailAmount.call({from:from}, function(error, result){
            if (!error) {
                sendMessage(res, result);
            } else {
                sendMessage(res, error);
            }
        });
    }
    /********************************* end block 1 *********************************************/

    /********************************* block 2 *********************************************/
    else if (functionName == "getFreeSuns") {
        ethersunflowersContract.getFreeSuns.sendTransaction({from:from}, function(error, txhash) {
            var msg = "";
            if (!error) {
                msg = txhash;
            } else {
                msg = error;
                sendMessage(res, msg);
                return;
            }
            var myEvent = ethersunflowersContract.FunctionEndEvent();
            myEvent.watch(function(err, result) {
                if (!err) {
                    if (result.transactionHash == txhash) {
                        ethersunflowersContract.getSunsBalance.call({from:from}, function(err1, result1){
                            if (!err1) {
                                msg += "\ngetSunsBalance: " + result1;
                            } else {
                                msg += "\ngetSunsBalance error: " + err1;
                            }
                            sendMessage(res, msg);
                            console.log("end of getFreeSuns.");
                        });
                    }
                } else {
                    msg += "\nmyEvent error: " + err;
                    sendMessage(res, msg);
                    console.log("end of getFreeSuns.");
                }
                myEvent.stopWatching();
            }); 
        });
    }
    else if (functionName == "getSunflowersBySuns") {
        var value =  querystring.parse(urlQuery).value;
        console.log(value);
        ethersunflowersContract.getSunflowersBySuns.sendTransaction(value, {from:from}, function(error, txhash){
            var msg = "";
            if (!error) {
                msg = txhash;
            } else {
                msg = error;
                sendMessage(res, msg);
                return;
            }
            var myEvent = ethersunflowersContract.FunctionEndEvent();
            myEvent.watch(function(err, result) {
                if (!err) {
                    if (result.transactionHash == txhash) {
                        ethersunflowersContract.getSunflowersNum.call({from:from}, function(err1, result1){
                            if (!err1) {
                                msg += "\ngetSunflowersNum: " + result1;
                            } else {
                                msg += "\ngetSunflowersNum error: " + err1;
                            }
                            sendMessage(res, msg);
                            console.log("end of getSunflowersBySuns.");
                        });
                    }
                } else {
                    msg += "\nmyEvent error: " + err;
                    sendMessage(res, msg);
                    console.log("end of getSunflowersBySuns.");
                }
                myEvent.stopWatching();
            });
        });
    }
    else if (functionName == "work") {
        ethersunflowersContract.work.sendTransaction({from:from}, function(error, txhash) {
            console.log("work");
            var msg = "";
            if (!error) {
                msg = txhash;
            } else {
                msg = error;
                sendMessage(res, msg);
                return;
            }
            var myEvent = ethersunflowersContract.FunctionEndEvent();
            myEvent.watch(function(err, result) {
                if (!err) {
                    if (result.transactionHash == txhash) {
                        ethersunflowersContract.getSunsBalance.call({from:from}, function(err1, result1){
                            if (!err1) {
                                msg += "\ngetSunsBalance: " + result1;
                            } else {
                                msg += "\ngetSunsBalance error: " + err1;
                            }
                            sendMessage(res, msg);
                            console.log("end of work.");
                        });
                    }
                } else {
                    msg += "\nmyEvent error: " + err;
                    sendMessage(res, msg);
                    console.log("end of work.");
                }
                myEvent.stopWatching();
            }); 
        });
    }
    else if (functionName == "quit") {
        ethersunflowersContract.quit.sendTransaction({from:from}, function(error, txhash) {
            console.log("quit");
            var msg = "";
            if (!error) {
                msg = txhash;
            } else {
                msg = error;
                sendMessage(res, msg);
                return;
            }
            var myEvent = ethersunflowersContract.FunctionEndEvent();
            myEvent.watch(function(err, result) {
                if (!err) {
                    if (result.transactionHash == txhash) {
                        ethersunflowersContract.getSunsBalance.call({from:from}, function(err1, result1){
                            if (!err1) {
                                msg += "\ngetSunsBalance: " + result1;
                            } else {
                                msg += "\ngetSunsBalance error: " + err1;
                            }
                            sendMessage(res, msg);
                            console.log("end of quit.");
                        });
                    }
                } else {
                    msg += "\nmyEvent error: " + err;
                    sendMessage(res, msg);
                    console.log("end of quit.");
                }
                myEvent.stopWatching();
            }); 
        });
    }
    else if (functionName == "rest") {
        ethersunflowersContract.rest.sendTransaction({from:from}, function(error, txhash) {
            console.log("rest");
            var msg = "";
            if (!error) {
                msg = txhash;
            } else {
                msg = error;
                sendMessage(res, msg);
                return;
            }
            var myEvent = ethersunflowersContract.FunctionEndEvent();
            myEvent.watch(function(err, result) {
                if (!err) {
                    if (result.transactionHash == txhash) {
                        ethersunflowersContract.getSunsBalance.call({from:from}, function(err1, result1){
                            if (!err1) {
                                msg += "\ngetSunsBalance: " + result1;
                            } else {
                                msg += "\ngetSunsBalance error: " + err1;
                            }
                            sendMessage(res, msg);
                            console.log("end of rest.");
                        });
                    }
                } else {
                    msg += "\nmyEvent error: " + err;
                    sendMessage(res, msg);
                    console.log("end of rest.");
                }
                myEvent.stopWatching();
            }); 
        });
    }
    /********************************* end block 2 *********************************************/

    /********************************* block 3 *********************************************/
    else if (functionName == "buySuns") {
        var value =  querystring.parse(urlQuery).value;
        value = web3.toWei(value, 'ether');
        console.log(value);
        ethersunflowersContract.buySuns.sendTransaction({from:from, value:value}, function(error, txhash) {
            var msg = "";
            if (!error) {
                msg = txhash;
            } else {
                msg = error;
                sendMessage(res, msg);
                return;
            }
            var myEvent = ethersunflowersContract.FunctionEndEvent();
            myEvent.watch(function(err, result) {
                if (!err) {
                    if (result.transactionHash == txhash) {
                        ethersunflowersContract.getSunsBalance.call({from:from}, function(err1, result1){
                            if (!err1) {
                                msg += "\ngetSunsBalance: " + result1;
                            } else {
                                msg += "\ngetSunsBalance error: " + err1;
                            }
                            sendMessage(res, msg);
                            console.log("end of buySuns.");
                        });
                    }
                } else {
                    msg += "\nmyEvent error: " + err;
                    sendMessage(res, msg);
                    console.log("end of buySuns.");
                }
                myEvent.stopWatching();
            });
        });
    }
    else if (functionName == "sellSuns") {
        ethersunflowersContract.sellSuns.sendTransaction({from:from}, function(error, txhash){
            var msg = "";
            if (!error) {
                msg = txhash;
            } else {
                msg = error;
                sendMessage(res, msg);
                return;
            }
            var myEvent = ethersunflowersContract.FunctionEndEvent();
            myEvent.watch(function(err, result) {
                if (!err) {
                    if (result.transactionHash == txhash) {
                        ethersunflowersContract.getSunsBalance.call({from:from}, function(err1, result1){
                            if (!err1) {
                                msg += "\ngetSunsBalance: " + result1;
                            } else {
                                msg += "\ngetSunsBalance error: " + err1;
                            }
                            sendMessage(res, msg);
                            console.log("end of sellSuns.");
                        });
                    }
                } else {
                    msg += "\nmyEvent error: " + err;
                    sendMessage(res, msg);
                    console.log("end of sellSuns.");
                }
                myEvent.stopWatching();
            });  
        });
    } 
    else if (functionName == "donate") {
        var value =  querystring.parse(urlQuery).value;
        value = web3.toWei(value, 'ether');
        console.log(value);
        ethersunflowersContract.donate.sendTransaction({from:from, value:value}, function(error, txhash){
            var msg = "";
            if (!error) {
                msg = txhash;
            } else {
                msg = error;
                sendMessage(res, msg);
                return;
            } 
            var myEvent = ethersunflowersContract.FunctionEndEvent();
            myEvent.watch(function(err, result) {
                if (!err) {
                    if (result.transactionHash == txhash) {
                        ethersunflowersContract.getContractBalance.call({from:from}, function(err1, result1){
                            if (!err1) {
                                msg += "\ngetContractBalance: " + result1;
                            } else {
                                msg += "\ngetContractBalance error: " + err1;
                            }
                            sendMessage(res, msg);
                            console.log("end of donate.");
                        });
                    }
                } else {
                    msg += "\nmyEvent error: " + err;
                    sendMessage(res, msg);
                    console.log("end of donate.");
                }
                myEvent.stopWatching();
            });
        });
    }
    /********************************* end block 3 *********************************************/
    else {
        sendMessage(res, "Something wrong!")
    }
}

function sendMessage(res, msg) {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end("" + msg);
}
