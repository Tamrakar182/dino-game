// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;


contract DinoBattleGame {
    struct Character {
        string name;
        uint256 attack;
        uint256 defense;
        uint256 specialAttack;
        uint256 specialDefense;
        uint256 speed;
    }


    struct Bet {
        address player;
        Character character;
        uint256 amount;
    }


    mapping(address => uint256) public winnings;
    address[] public players;
    mapping(address => bool) public registeredPlayers;
    address public admin;


    uint256 public minBetAmount = 0.00001 ether;
    uint256 public maxBetAmount = 1 ether;


    event GameStarted(string character1Name, string character2Name);
    event GameEnded(string winningCharacterName);
    event BetPlaced(address player, string characterName, uint256 amount);
    event WinningsWithdrawn(address player, uint256 amount);
    event PlayerRegistered(address player);
    event AdminWithdrawal(uint256 amount);
    event DepositReceived(address sender, uint256 amount);


    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }


    modifier onlyRegistered() {
        require(registeredPlayers[msg.sender], "You must be registered to place a bet");
        _;
    }


    function registerPlayer() public {
        registeredPlayers[msg.sender] = true;
        emit PlayerRegistered(msg.sender);
    }


    constructor() {
        admin = msg.sender; // Set the deployer as the admin
    }


    function depositFunds() public payable {
        require(msg.value > 0, "Deposit amount must be greater than zero");
        emit DepositReceived(msg.sender, msg.value);
    }


    function playGame(Character memory _character1, Character memory _character2) public payable onlyRegistered {
        require(msg.value >= minBetAmount && msg.value <= maxBetAmount, "Bet amount must be within the allowed range");
        require(msg.value > 0, "Bet amount must be greater than zero");
        require(msg.value <= maxBetAmount, "Bet amount exceeds the maximum limit");


        // Create the player's bet
        Bet memory playerBet = Bet({
            player: msg.sender,
            character: _character1,
            amount: msg.value
        });


        players.push(msg.sender);
        emit BetPlaced(msg.sender, _character1.name, msg.value);


        // Determine the winner
        string memory winningCharacterName = determineWinner(_character1, _character2);


        // Emit events
        emit GameStarted(_character1.name, _character2.name);
        emit GameEnded(winningCharacterName);


        // Distribute winnings if the player has won
        if (keccak256(abi.encodePacked(playerBet.character.name)) == keccak256(abi.encodePacked(winningCharacterName))) {
            uint256 winningsAmount = 2 * playerBet.amount;
            require(address(this).balance >= winningsAmount, "Insufficient contract balance to pay winnings");


            payable(msg.sender).transfer(winningsAmount);
        }
    }


    function determineWinner(Character memory _character1, Character memory _character2) internal view returns (string memory) {
        uint256 score1 = calculateScore(_character1);
        uint256 score2 = calculateScore(_character2);


        // Add randomness to the score by hashing several inputs
        uint256 randomFactor = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, _character1.name, _character2.name, blockhash(block.number - 1))));
        uint256 randomScore1 = score1 + (randomFactor % 100);
        uint256 randomScore2 = score2 + ((randomFactor / 100) % 100);


        return randomScore1 >= randomScore2 ? _character1.name : _character2.name;
    }


    function calculateScore(Character memory character) internal pure returns (uint256) {
        return character.attack + character.defense + character.specialAttack + character.specialDefense + character.speed;
    }


    function adminWithdraw() public onlyAdmin {
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "No funds to withdraw");
        payable(admin).transfer(contractBalance);


        emit AdminWithdrawal(contractBalance);
    }
}


