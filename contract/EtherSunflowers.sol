pragma solidity ^0.4.9;

contract EtherSunflowers {
    
    mapping (address => uint256) private sunsBalances;   // the suns balances of an address
    mapping (address => uint256) private sunflowersNum;  // the sunflowersNum of an address
    mapping (address => uint256) private successAmount;  // amount of finishing a cycle
    mapping (address => uint256) private failAmount;     // amount of fail finishing a cycle

    uint256 private INIT_SUNS_NUM = 10;   // initial number of suns
    uint256 public constant sunPrice = 1 ether;
    
    address public ownerAddress;
    
    event FunctionEndEvent();
    
    modifier onlyOwner() {
        require(ownerAddress == msg.sender);
        _;
    }
    
    constructor() public payable {
        ownerAddress = msg.sender;
    }
    
    // donate to the contract
    function donate() public payable {
        emit FunctionEndEvent();
    }
    
    function getFreeSuns() public {
        if (sunsBalances[msg.sender] == 0) {
            sunsBalances[msg.sender] = INIT_SUNS_NUM;
        } 
        emit FunctionEndEvent();
    }
    
    function getSunflowersBySuns(uint256 _sunflowersNum) public {
        if (getSunsBalance() >= 10 * _sunflowersNum) {
            sunsBalances[msg.sender] -= 10 * _sunflowersNum;
            sunflowersNum[msg.sender] += _sunflowersNum;
        }
        emit FunctionEndEvent();
    }
    
    // Work for 25 minutes and you can get suns by sunflowers
    function work() public {
        sunsBalances[msg.sender] += 20 * sunflowersNum[msg.sender];
        sunflowersNum[msg.sender] = 0;
        emit FunctionEndEvent();
    }
    
    function quit() public {
        if (sunsBalances[msg.sender] >= 5) {
            sunsBalances[msg.sender] -= 5;
        } else {
            sunsBalances[msg.sender] = 0;
        }

        failAmount[msg.sender]++;
        emit FunctionEndEvent();
    }
    
    function rest() public {
        successAmount[msg.sender]++;
        emit FunctionEndEvent();
    }
    
    // sell all the suns
    function sellSuns() public {
        uint256 num = sunsBalances[msg.sender];
        uint256 money = num * sunPrice;
        
        // The contract should have enough money
        if (address(this).balance >= money) {
            address(msg.sender).transfer(money);
            sunsBalances[msg.sender] = 0;
        }
        emit FunctionEndEvent();
    }
    
    function buySuns() public payable {
        uint256 num = msg.value / sunPrice;
        sunsBalances[msg.sender] += num;
        emit FunctionEndEvent();
    }
    
    function getSuccessAmount() public view returns (uint256) {
        return successAmount[msg.sender];
    }
    
    function getFailAmount() public view returns (uint256) {
        return failAmount[msg.sender];
    }
    
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
    
    function getMyBalance() public view returns (uint256) {
        return address(msg.sender).balance;
    }
    
    function getMsgSender() public view returns (address) {
        return address(msg.sender);
    }
    
    function getSunsBalance() public view returns (uint256) {
        return sunsBalances[msg.sender];
    }
    
    function getSunflowersNum() public view returns (uint256) {
        return sunflowersNum[msg.sender];
    }
}