import { useEffect } from "react";
import { ethers } from "ethers";

import axiosConfig from '../service/axiosConfig';

import FenBoardService from '../smart_contracts/FenBoardService.json';

const Component = () => {

    useEffect(() => {

        const getHTTPData = async () => {
            // Generic HTTP GET request
            let url = `https://api.coingecko.com/api/v3/ping`
            axiosConfig.get(url)
            .then(resp => {
                console.log(resp);
            })
            .catch(ex => {
                console.log(ex);
            })
        }

        const getBlockchainData = async () => {
            try {
                const contractAddress = FenBoardService["deployment"]["address"];
                const contractABI = FenBoardService["abi"];
                
                const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
                const smartContract = new ethers.Contract(contractAddress, contractABI, web3Provider);
        
                const greeting = await smartContract.getGreeting();
                console.log(greeting);
        
            } catch (ex) {
                console.log(ex);
            }
        }

        getHTTPData();
        getBlockchainData();
    }, []);

    // To execute a SmartContract (functional) transaction:
    const updateContract = async (fen) => {
            
        try {
          
          const contractAddress = FenBoardService["deployment"]["address"];
          const contractABI = FenBoardService["abi"];
    
          const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
          const smartContract = new ethers.Contract(contractAddress, contractABI, web3Provider.getSigner());
    
          const param1 = "foo";
          const param2 = "bar";
    
          // Send a transaction to the smart contract.
          const tx = await smartContract.updateContract(param1, param2);
          await tx.wait();
          console.log(tx);
    
        } catch (ex) {
          console.log(ex);
        }
      }      

    return (
        <h1>Hello! Console says Hi as well!</h1>
    );
}

export default Component;