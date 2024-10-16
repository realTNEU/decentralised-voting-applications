import React, {useState} from 'react'
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


  const contractAddress = '0x134cc1FAf0EfD9813341261e6a8E272706969FAd';


  const App =()=>{
    const [votes, setVotes] = useState([0, 0, 0, 0]); // Votes for each brand
    const [winner, setWinner] = useState('');
    const [loading, setLoading] = useState(false);
    async function connectWallet(){
      try{
          if(!window.etherum) throw new Error('Metamask Not Installed');
          const provider = new ethers.providers.Web3Provider(web3.currentProvider);
          await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner();
          console.log("Wallet Connected: ", await signer.getAddress());
          return signer;
  
      }catch(error){
        console.log('Error connecting to wallet: ', error);
      }
    }
    async function connectWallet() {
  try {
    // Ensure MetaMask is installed
    if (typeof window.ethereum === 'undefined') {
      alert('MetaMask is not installed. Please install it to use this app.');
      throw new Error('MetaMask is not installed.');
    }

    const provider = new ethers.providers.Web3Provider(web3.currentProvider);
    
    // Request accounts
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    console.log('Wallet Connected:', address);
    return signer;

  } catch (error) {
    console.error('Error connecting to wallet:', error.message);
    throw error; // Re-throw to handle in other parts if necessary
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
        const provider = new ethers.providers.Web3Provider(web3.currentProvider);
        const contract = new ethers.Contract(contractAddress, contractABI, provider);
        const votes = await contract.getVotes(brandIndex);
        console.log(`Votes for Brand ${brandIndex}:` ,votes.toString());
      }catch(error){
        console.log('Error while fetching votes: ', error)
      }
    }
     async function declareWinner(){
    try{
      const provider = new ethers.providers.Web3Provider(web3.currentProvider);
      const contract = new ethers.Contract(contractAddress, contractABI, provider);
      const winner = await contract.declareWinner();
      console.log(`The winner is: ${winner}`);
    }catch (error){
      console.log(`Error while fetching the winner: ${error}`);
    }
  }
return(<div className="App">
<h1>Vote for the Best Brand</h1>
<div className="vote-buttons">
  <button onClick={() => vote(0)} disabled={loading}>Vote for Asus</button>
  <button onClick={() => vote(1)} disabled={loading}>Vote for Lenovo</button>
  <button onClick={() => vote(2)} disabled={loading}>Vote for HP</button>
  <button onClick={() => vote(3)} disabled={loading}>Vote for Dell</button>
</div>

<div className="vote-results">
  <h2>Vote Results:</h2>
  <p>Asus: {votes[0]}</p>
  <p>Lenovo: {votes[1]}</p>
  <p>HP: {votes[2]}</p>
  <p>Dell: {votes[3]}</p>
</div>

<div className="winner-section">
  <button onClick={declareWinner}>Declare Winner</button>
  {winner && <h2>Winner: {winner}</h2>}
</div>
</div>
);
   }
  export default App




