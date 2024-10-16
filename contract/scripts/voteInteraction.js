import {ethers} from 'ethers'
const contractABI = [
    {
      "inputs": [{ "internalType": "uint256", "name": "brandIndex", "type": "uint256" }],
      "name": "vote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{ "internalType": "uint256", "name": "brandIndex", "type": "uint256" }],
      "name": "getVotes",
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "declareWinner",
      "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
      "stateMutability": "view",
      "type": "function"
    }
  ];


  const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138';


  async function connectWallet(){
    try{
        if(!window.etherum) throw new Error('Metamask Not Installed');
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        console.log("Wallet Connected: ", await signer.getAddress());
        return signer;

    }catch(error){
      console.log('Error connecting to wallet: ', error);
    }
  }

  async function vote(brandIndex){
    try{
      const signer = await connectWallet();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const tx =await contract.vote(brandIndex);
      console.log('Voting Transaction Sent: ', tx.hash);
      await tx.wait();
      console.log('Voted Successfully');
      
    }catch(error){
      console.log('Voting Failed: ',error)
    }
  }

  async function getVotes(brandIndex){
    try{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, contractABI, provider);
      const votes = await contract.getVotes(brandIndex);
      console.log(`Votes for Brand ${brandIndex}:` ,votes.toString());
    }catch(error){
      console.log('Error while fetching votes: ', error)
    }
  }

  async function declareWinner(){
    try{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, contractABI, provider);
      const winner = await contract.declareWinner();
      console.log(`The winner is: ${winner}`);
    }catch (error){
      console.log(`Error while fetching the winner: ${error}`);
    }
  }

  // Example usage: Trigger vote for Brand A (index 0)
document.getElementById('voteBrandA').onclick = () => vote(0);
document.getElementById('voteBrandB').onclick = () => vote(1);
document.getElementById('voteBrandC').onclick = () => vote(2);
document.getElementById('voteBrandD').onclick = () => vote(3);

// Fetch votes for Brand B (index 1)
document.getElementById('getVotesA').onclick = () => getVotes(0);
document.getElementById('getVotesB').onclick = () => getVotes(1);
document.getElementById('getVotesC').onclick = () => getVotes(2);
document.getElementById('getVotesD').onclick = () => getVotes(3);

// Declare winner when the poll ends
document.getElementById('declareWinner').onclick = () => declareWinner();