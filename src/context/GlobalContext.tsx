import { createContext, useState, ReactNode } from 'react';

interface GlobalContextProps {
  account: string | null;
  // eslint-disable-next-line no-unused-vars
  setAccount: (account: string | null) => void;
}

export const GlobalContext = createContext<GlobalContextProps>({
  account: null,
  setAccount: () => {},
});


export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<string | null>(null);

  return (
    <GlobalContext.Provider value={{ account, setAccount }}>
      {children}
    </GlobalContext.Provider>
  )
}
