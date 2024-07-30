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

  userCharacter: string | null,
  betAmount: string | null,
  // eslint-disable-next-line no-unused-vars
  handleCharacterSelect: (smtg: string | null) => void,
  // eslint-disable-next-line no-unused-vars
  betAmountSelect: (bet: string | null) => void,
  handleLogOut: () => void,
  isLoading: boolean,
}

export const GlobalContext = createContext<GlobalContextProps>({
  provider: null,
  signer: null,
  account: null,
  registered: false,
  toggleRegister: () => { },
  userCharacter: null,
  betAmount: null,
  connectWallet: async () => {
    console.log("Default connectWallet function. Please implement the actual function.");
  },
  handleCharacterSelect: () => { },
  betAmountSelect: () => { },
  handleLogOut: () => { },
  isLoading: false,
});

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(null);
  const [account, setAccount] = useState<any>(null);
  const [registered, setRegistered] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  const [userCharacter, setUserCharacter] = useState<string | null>(null);

  const [betAmount, setBetAmount] = useState<string | null>(null);

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
        enqueueSnackbar("No Ethereum provider found. Install MetaMask.", {})
        console.log("No Ethereum provider found. Install MetaMask.");
      }
    };
    const register = localStorage.getItem("registered")
    setRegistered(register ? true : false);
    initProvider();
    setIsLoading(false);
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const accounts = await provider.send("eth_requestAccounts", []);
        enqueueSnackbar('Wait for Metamask to set wallet', { variant: "info" });
        setProvider(provider);
        setSigner(signer);
        setAccount(accounts[0]);
      } catch (error: any) {
        if (error.code === 4001) {
          enqueueSnackbar("Rejected by user", { variant: 'error' });
        } else {
          enqueueSnackbar("Error connecting wallet", { variant: 'error' });
        }

      }
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
  };

  const handleCharacterSelect = (smtg: string | null) => {
    setUserCharacter(smtg);
  };

  const betAmountSelect = (bet: string | null) => {
    setBetAmount(bet);
  };

  const handleLogOut = () => {
    toggleRegister();
    setAccount(null);
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
        userCharacter,
        handleCharacterSelect,
        betAmountSelect,
        betAmount,
        handleLogOut,
        isLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
