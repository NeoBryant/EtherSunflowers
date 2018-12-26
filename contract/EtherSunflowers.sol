pragma solidity ^0.4.9;

contract EtherSunflowers {

    // Definition: A cycle is 30 minutes, including WORK_TIME and REST_TIME
    uint256 private WORK_TIME = 1500;    // work time, 25 minutes, 1500 seconds
    uint256 private REST_TIME = 300;     // rest time, 5 minutes, 300 seconds
    uint256 private INIT_SUNS_NUM = 10;   // initial number of suns
    
    mapping (address => uint256) public sunsBalances;   // the suns balances of an address
    mapping (address => uint256) public sunflowersNum;
    mapping (address => uint256) public successAmount;  // amount of finishing a cycle
    mapping (address => uint256) public failAmount;     // amount of fail finishing a cycle

    // the total suns number in the contract
    uint256 public totalSunsNum;
    uint public constant sunPrice = 1 ether;
    
    address public ownerAddress;
    
    event TransferEvent(
        address indexed _from, 
        address indexed _to, 
        uint256 _value
    );
    
    constructor() public payable {
        ownerAddress = msg.sender;
        totalSunsNum = 10000000;
    }
    
    // donate to the contract
    function donate() public payable {
        emit TransferEvent(msg.sender, this, msg.value);
    }
    
    function getFreeSuns() public {
        require(sunsBalances[msg.sender] == 0);
        sunsBalances[msg.sender] = INIT_SUNS_NUM;
    }
    
    function getSunflowersBySuns(uint256 _sunflowersNum) public {
        require(getSunsBalance() >= 10 * _sunflowersNum);
        sunsBalances[msg.sender] -= 10 * _sunflowersNum;
        sunflowersNum[msg.sender] += _sunflowersNum;
    }
    
    modifier onlyOwner() {
        require(ownerAddress == msg.sender);
        _;
    }
    
    // Work for 25 minutes and you can get suns
    function work() public {
        sunsBalances[msg.sender] += 2 * sunflowersNum[msg.sender];
    }
    
    function quit() public {
        if (sunsBalances[msg.sender] >= 5)
            sunsBalances[msg.sender] -= 5;
        else
            sunsBalances[msg.sender] = 0;
        failAmount[msg.sender]++;
    }
    
    // You have to rest for 5 minutes after 25-minute-work, 
    // At this time, you can do nothing but wait
    function rest() private pure {
        
    }
    
    // sell all the suns
    function sellSuns() public {
        uint256 num = sunsBalances[msg.sender];
        
        uint256 money = num * sunPrice;
        
        // The contract should have enough money
        require(address(this).balance >= money);

        address(msg.sender).transfer(money);
        sunsBalances[msg.sender] = 0;
        totalSunsNum += num;
    }
    
    function buySuns() public payable {
        uint256 num = msg.value / sunPrice;
        
        // The msg sender should have enough money
        require(msg.sender.balance >= msg.value);
        
        // The contract should have enough suns
        require(totalSunsNum >= num);
        
        // address(this).transfer(msg.value);
        totalSunsNum -= num;
        sunsBalances[msg.sender] += num;
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
    
    /**
     * @return the sunsBalance
     */
    function getSunsBalance() public view returns (uint256) {
        return sunsBalances[msg.sender];
    }
    
    /**
     * @return the sunflowersNum
     */
    function getSunflowersNum() public view returns (uint256) {
        return sunflowersNum[msg.sender];
    }
    
    /**
     * @return the totalSunsNum
     */
    function getTotalSunsNum() public view returns (uint256) {
        return totalSunsNum;
    }
    
    /**
     * @return now
     */
    function getNow() public view returns (uint256) {
        return now;
    }
}