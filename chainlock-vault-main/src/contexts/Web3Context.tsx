import React, { createContext, useContext, useState, useEffect } from 'react';
import Web3 from 'web3';

interface Web3ContextType {
  web3: Web3 | null;
  account: string | null;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isLoading: boolean;
  error: string | null;
}

const Web3Context = createContext<Web3ContextType>({
  web3: null,
  account: null,
  isConnected: false,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  isLoading: false,
  error: null,
});

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};

interface Web3ProviderProps {
  children: React.ReactNode;
}

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Check if MetaMask is installed
      if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length === 0) {
        throw new Error('No accounts found. Please make sure MetaMask is unlocked.');
      }

      // Create Web3 instance
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
      setAccount(accounts[0]);
      setIsConnected(true);

      // Store connection status
      localStorage.setItem('chainlocker_connected', 'true');
      localStorage.setItem('chainlocker_account', accounts[0]);

    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet');
      console.error('Wallet connection error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    setWeb3(null);
    setAccount(null);
    setIsConnected(false);
    setError(null);
    
    // Clear stored connection
    localStorage.removeItem('chainlocker_connected');
    localStorage.removeItem('chainlocker_account');
  };

  // Check for existing connection on load
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const wasConnected = localStorage.getItem('chainlocker_connected');
        const savedAccount = localStorage.getItem('chainlocker_account');

        if (wasConnected && savedAccount && window.ethereum) {
          const accounts = await window.ethereum.request({
            method: 'eth_accounts',
          });

          if (accounts.includes(savedAccount)) {
            const web3Instance = new Web3(window.ethereum);
            setWeb3(web3Instance);
            setAccount(savedAccount);
            setIsConnected(true);
          } else {
            // Clear invalid stored data
            localStorage.removeItem('chainlocker_connected');
            localStorage.removeItem('chainlocker_account');
          }
        }
      } catch (err) {
        console.error('Auto-connection failed:', err);
      }
    };

    checkConnection();
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else if (accounts[0] !== account) {
          setAccount(accounts[0]);
          localStorage.setItem('chainlocker_account', accounts[0]);
        }
      };

      const handleChainChanged = () => {
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [account]);

  const value: Web3ContextType = {
    web3,
    account,
    isConnected,
    connectWallet,
    disconnectWallet,
    isLoading,
    error,
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    ethereum?: any;
  }
}