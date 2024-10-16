pragma solidity ^0.8.0;

contract Voting{
    string[4] public brands = ['Asus','Lenovo', 'HP',  'Dell'];
    mapping(uint => uint) public votes;
    mapping(address => bool) public hasVoted;
    event Voted(address voter, uint brandIndex);

    function vote(uint brandIndex) public {
        require(!hasVoted[msg.sender], 'You casted your vote');
        require(brandIndex<brands.length, 'Invalid Brand Selected');
        votes[brandIndex]++;
        hasVoted[msg.sender]= true;
        emit Voted(msg.sender, brandIndex);
    }

    function getVotes(uint brandIndex) public view returns(uint){
        require(brandIndex<brands.length, 'Invalid Brand Selected');
        return votes[brandIndex];
    }

    function declareWinner() public view returns(string memory){
        uint maxVotes=0;
        uint winnerIndex = 0;
        for(uint i=0;i<brands.length;i++){
            if(votes[i]>maxVotes){
                maxVotes = votes[i];
                winnerIndex= i;
            }
        }

        return brands[winnerIndex];
    }

}