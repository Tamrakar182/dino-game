import Web3 from 'web3';
import { contractAddress } from './constants';

type Address = string;
type Amount = string;

export type ContractDetails = {
  balance: Amount,
  admin: Address,
  donorDetails: {
    amount: Amount,
    name: string,
    age: number,
  },
}

let web3: Web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  web3 = new Web3(window.ethereum);
} else {
  console.error('MetaMask is not installed. Please install MetaMask and try again.');
}

export function getContractAddress(): Address {
  return contractAddress;
}

export async function requestAccounts(): Promise<Address[]> {
  if (typeof window.ethereum !== 'undefined') {
    return web3.eth.requestAccounts();
  } else {
    throw new Error('MetaMask is not installed. Please install MetaMask and try again.');
  }
}

