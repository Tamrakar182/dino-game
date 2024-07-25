import { createContext, useState, ReactNode, useEffect } from 'react';
import { enqueueSnackbar } from 'notistack';
import { ethers } from "ethers";

interface GlobalContextProps {
  provider: null | ethers.providers.Web3Provider,
  signer: null | ethers.providers.JsonRpcSigner,
  account: null | any,
  connectWallet: () => Promise<void>,
  toggleRegister: () => void,
  registered: boolean,
}

export const GlobalContext = createContext<GlobalContextProps>({
  provider: null,
  signer: null,
  account: null,
  registered: false,
  toggleRegister: () => { },
  connectWallet: async () => {
    console.log("Default connectWallet function. Please implement the actual function.");
  }
});

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(null);
  const [account, setAccount] = useState<any>(null);
  const [registered, setRegistered] = useState<boolean>(false);

  useEffect(() => {
    const initProvider = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const accounts = await provider.send("eth_requestAccounts", []);
        setProvider(provider);
        setSigner(signer);
        setAccount(accounts[0]);
      } else {
        enqueueSnackbar("No Ethereum provider found. Install MetaMask.")
        console.log("No Ethereum provider found. Install MetaMask.");
      }
    };
    const register = localStorage.getItem("registered")
    setRegistered(register ? true : false);
    initProvider();
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const accounts = await provider.send("eth_requestAccounts", []);
      setProvider(provider);
      setSigner(signer);
      setAccount(accounts[0]);
    } else {
      enqueueSnackbar("No Ethereum provider found. Install MetaMask.")
      console.log("No Ethereum provider found. Install MetaMask.");
    }
  };

  const toggleRegister = () => {
    if (localStorage.getItem("registered")) {
      localStorage.removeItem("registered")
      setRegistered(false);
      return;
    }
    localStorage.setItem("registered", "true");
    setRegistered(true)
  }

  return (
    <GlobalContext.Provider
      value={{
        provider,
        signer,
        account,
        connectWallet,
        toggleRegister,
        registered,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
