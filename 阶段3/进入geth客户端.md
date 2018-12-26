### 进入geth客户端

`geth --datadir "./" console 2>>geth.log`



### 在Remix上编写智能合约

打开remix: http://remix.ethereum.org/#optimize=true&version=soljson-v0.4.25+commit.59dbf8f1.js

```javascript
pragma solidity ^0.4.9;

contract MyContract {
    function fun(uint a) public pure returns (uint b) {
        uint result = a * 8;
        return result;
    }
}
```



### 编译合约

点击Remix右侧的start to compile（如果勾选了auto compile则不需要点击），如果没有报错，点击Details(这个按钮在start to compile的下面一行)，此时会弹出一个信息框，里面有一块叫做WEB3DEPLOY，复制这段代码，代码如下：

```javascript
var mycontractContract = web3.eth.contract([{"constant":true,"inputs":[{"name":"a","type":"uint256"}],"name":"fun","outputs":[{"name":"b","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"}]);
var mycontract = mycontractContract.new(
   {
     from: web3.eth.accounts[0], 
     data: '0x6080604052348015600f57600080fd5b50609c8061001e6000396000f300608060405260043610603e5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416637a9839c281146043575b600080fd5b348015604e57600080fd5b506058600435606a565b60408051918252519081900360200190f35b600802905600a165627a7a72305820bd55cb0b7a9aa0135df4fc6f9164fcd4e70b36efbb08cfffe1185e77b60d195c0029', 
     gas: '4700000'
   }, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
 })
```



### 部署合约

- 首先解锁账户地址，这是因为账户accounts[0]处于锁住状态，输入：

  ```javascript
  personal.unlockAccount(eth.accounts[0],"password");
  ```

  第一个参数是要解锁的账户地址，这里我们是accounts[0]，第二个参数是账户的密码，按下回车返回true代表解锁成功。

- 接着，输入挖矿指令，如果私链不挖矿就产生不了新的区块，合约是不能够成功部署的：

  ```javascript
  miner.start(1)
  ```

- 当私链开始挖矿后，把之前的代码复制进来，按下回车。等待片刻，当终端返回信息Contract mined，合约即部署成功：

  `Contract mined! address: 0x132a932878e5010eb005f751b4918807b2e7bf77 transactionHash: 0x347306e20267d70f86fe310172bf54abaacbd70b346f34aea88f8be997004ee2`

![](C:/Users/Mr.W/Desktop/BCProject/%E9%98%B6%E6%AE%B53/imgs/2.png)