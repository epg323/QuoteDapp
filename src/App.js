import React, {useState, useEffect} from 'react';
import Web3 from 'web3';
import logo from './logo.svg';
import './App.css';

let web3;
let userAccount;


async function startApp(){
  const address = "0x821CE36928c3Ea07F560fCB52d27C6098A38a1b6"
  const abi = [
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "string",
          "name": "newQuote",
          "type": "string"
        }
      ],
      "name": "setQuote",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getQuote",
      "outputs": [
        {
          "internalType": "string",
          "name": "currentQuote",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "currentOwner",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "quote",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]

  const contract = new web3.eth.Contract(abi, address)

  await contract.methods.setQuote("Put a quote here").send({from: userAccount})

  const result = await contract.methods.getQuote().call({
    from: userAccount
  })
  console.log(result)
}

function App() {
  useEffect(() => {(
    async function (){
      if(window.ethereum){
        web3 = new Web3(window.ethereum)
        try {
          // request access if needed
          await window.ethereum.enable()
          userAccount = (await web3.eth.getAccounts())[0]
          startApp()
        }catch(error){
  
        }
      }
      //Legacy dapp browsers...
      else if (window.web3){
        window.web3 = new Web3(web3.currentProvider)
        userAccount = (await web3.eth.getAccounts())[0]
        startApp()
      }
      else{
        console.log("Non-Ethereum browser detected. You should consider MetaMask!")
      }
    })()
  },[])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
