## 遇到的问题

#### solidity

* 转账

  最好加address()，不加的时候好像转不了账

  `address(ownerAddress).transfer(msg.value);`

* 合约交易 transfer

  [[区块链] 记坑: 以太坊智能合约开发, transfer](https://blog.csdn.net/guddqs/article/details/81197515)

  * 用户向合约转钱, 发起合约时传入 `value` 即可
  * 合约向用户转钱 `address(user).transfer(address(this).balance)`, 当然不必是合约的所有余额, 只要不超过余额, 都可以转出去
  * 用户通过合约向另一个用户转钱: 买家–>卖家 (买家转钱到合约, 合约转到卖家), 买家传入 `value`调用 `address(seller).transfer(msg.value)`

* `emit` keyword in Solidity

  > General: Support and recommend using `emit EventName();` to call events explicitly.
  >
  > In order to make events stand out with regards to regular function calls, `emit EventName()` as opposed to just `EventName()` should now be used to "call" events.

  为了和调用普通函数区别开来。


#### Remix

* web3 provider连不上

  解决：注意url是http而不是https(否则web3 provider会连不上)：http://remix.ethereum.org/#optimize=true&version=soljson-v0.4.25+commit.59dbf8f1.js

* Remix上无法选择编译器版本

  解决：翻墙

* Mock compiler: Source not found

  我的合约代码版本杂注(pragma)是 `pragma solidity ^0.4.9;`

  解决：编译器版本选择 `version:0.4.25+commit.59dbf8f1.Emscripten.clang`

* Gas estimation failed

  解决：设置Value值大于0

  向这个账号转点以太币，部署合约需要gas，需要付手续费

* insufficient funds for gas * price + value

  [以太坊手续费不足异常（insufficient funds）](https://blog.csdn.net/wo541075754/article/details/79537043)

  这条异常信息就是告诉我们：当前地址的余额不足以支付gasLimit乘以gasPrice再加上转账的value值。异常中的gas指的就是gasLimit，price就是gasPrice，value指的是发起交易转账的以太币。

  解决：向这个账号转点以太币


#### geth

* 打开geth

  geth --networkid 10 --nodiscover --datadir "./" --rpc --rpcapi "net,eth,web3,personal" --rpcaddr "0.0.0.0" --rpccorsdomain "*" --rpcport 8545 console 2>>geth.log

* 创建新账户

  `personal.newAccount('password')`

* 解锁账户

  `personal.unlockAccount(eth.accounts[1],'password',3000)`

* 转账

  `eth.sendTransaction({from:"0xe3d43acb5f094366e35a7bc4576a1e2387398100",to:"0xcb455ed9e8dbb63f770980247c4fbd7f8ef2c045",value:web3.toWei(3,"ether")})`

* 查看账户余额

  以单位wei显示

  `eth.getBalance("0xcb455ed9e8dbb63f770980247c4fbd7f8ef2c045")`

  以单位ether显示

  `web3.fromWei(eth.getBalance(eth.accounts[1]),'ether')`

* 查看事务

  `eth.getTransaction("0x")`

* 修改账号密码

  `geth account update [账号index或地址] --datadir "./"`



#### npm

* npm安装很慢，或报错 `rollbackFailedOptional verb npm-session` 解决办法

  https://blog.csdn.net/weixin_42097653/article/details/82222432

  该问题一般情况是因为代理问题，npm代理和git代理都要设置。首先确认网络是否需要设置代理。

  解决：[设置淘宝镜像](https://blog.csdn.net/jason_cuijiahui/article/details/79448284)

  `npm config set registry https://registry.npm.taobao.org`

  配置后可通过下面方式来验证是否成功

  `npm config get registry`

* npm更新

  `npm install npm -g`





#### web3@0.20.0

*  连接私有链出现的问题

  解决：[web3.js 连接私有链出现的问题](https://blog.csdn.net/qq_36303862/article/details/84405030?from=singlemessage)

  解决方法是使用 `npm install web3@0.20.0 --save` 安装稳定版的web3，而非按大多数教程那样使用 `npm install web3`

* 函数调用

  [以太坊学习笔记：通过web3.js与智能合约交互](https://my.oschina.net/u/2349981/blog/863731)

  * 在函数后加上`.call()`来显式指明用`call`的方式调用
    通过`call`的方式调用可以得到函数的返回值
    通过`call`的方式调用的函数只在节点本地虚拟机中执行，不会产生交易，不会花费费用，不会修改数据

  * 若函数要修改合约内部的数据，所以要使函数调用生效，必须要向区块链发送交易，要在函数后面加上`.sendTransaction()`来指明这是一笔交易

  * 调用合约函数的时候需要（可选）增加最后一个参数，它是一个javascript对象，里面可以指定`from`/`value`/`gas`等属性，上面的例子用`from`来指定交易的发送者

    注意这些属性要写在同一个花括号里，如`{value:300000, from:ac0}`







#### web3@1.0.0

文档：[web3.js - Ethereum JavaScript API](https://web3js.readthedocs.io/en/1.0/index.html)

看网上教程后，发现1.0.0可用。（还是不要用了，好多坑）

- `npm install web3 --save`安装出现以下错误

  ```
  C:\Users\Mr.W\Desktop\web\node_modules\scrypt>if not defined npm_config_node_gyp (node "C:\Users\Mr.W\AppData\Roaming\npm\node_modules\npm\node_modules\npm-lifecycle\node-gyp-bin\\..\..\node_modules\node-gyp\bin\node-gyp.js" rebuild )  else (node "C:\Users\Mr.W\AppData\Roaming\npm\node_modules\npm\node_modules\node-gyp\bin\node-gyp.js" rebuild )
  gyp ERR! configure error
  gyp ERR! stack Error: Command failed: D:\softwareDownload\Python36\python.EXE -c import sys; print "%s.%s.%s" % sys.version_info[:3];
  gyp ERR! stack   File "<string>", line 1
  gyp ERR! stack     import sys; print "%s.%s.%s" % sys.version_info[:3];
  gyp ERR! stack                                ^
  gyp ERR! stack SyntaxError: invalid syntax
  gyp ERR! stack
  gyp ERR! stack     at ChildProcess.exithandler (child_process.js:275:12)
  gyp ERR! stack     at emitTwo (events.js:126:13)
  gyp ERR! stack     at ChildProcess.emit (events.js:214:7)
  gyp ERR! stack     at maybeClose (internal/child_process.js:925:16)
  gyp ERR! stack     at Process.ChildProcess._handle.onexit (internal/child_process.js:209:5)
  gyp ERR! System Windows_NT 10.0.17134
  gyp ERR! command "D:\\软件\\nodejs\\node.exe" "C:\\Users\\Mr.W\\AppData\\Roaming\\npm\\node_modules\\npm\\node_modules\\node-gyp\\bin\\node-gyp.js" "rebuild"
  gyp ERR! cwd C:\Users\Mr.W\Desktop\web\node_modules\scrypt
  gyp ERR! node -v v8.9.0
  gyp ERR! node-gyp -v v3.8.0
  gyp ERR! not ok
  npm WARN web@1.0.0 No description
  npm WARN web@1.0.0 No repository field.
  
  npm ERR! code ELIFECYCLE
  npm ERR! errno 1
  npm ERR! scrypt@6.0.3 install: `node-gyp rebuild`
  npm ERR! Exit status 1
  npm ERR!
  npm ERR! Failed at the scrypt@6.0.3 install script.
  npm ERR! This is probably not a problem with npm. There is likely additional logging output above.
  
  npm ERR! A complete log of this run can be found in:
  npm ERR!     C:\Users\Mr.W\AppData\Roaming\npm-cache\_logs\2018-12-24T11_49_43_914Z-debug.log
  ```

  从上面代码块第3行看出，是Python 3.x 出了问题。

  解决：环境变量换成Python 2.x。

- 提示“Cannot find module './build/Release/scrypt'”，该问题由安装scrypt模块时，其index.js中的var scryptNative = require("./build/Release/scrypt")语句错误，将其修改为var scryptNative = require("scrypt")即可解决。

