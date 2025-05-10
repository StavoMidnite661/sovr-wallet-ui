import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

export default function WalletTab() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0]);
        fetchBalance(accounts[0]);
      });
    }
  }, []);

  async function connectWallet() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      setAccount(accounts[0]);
      fetchBalance(accounts[0]);
    } else {
      alert('Please install MetaMask');
    }
  }

  async function fetchBalance(address) {
    if (!address) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balanceBigInt = await provider.getBalance(address);
    const balanceEth = ethers.utils.formatEther(balanceBigInt);
    setBalance(balanceEth);
  }

  async function sendTransaction() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const tx = await signer.sendTransaction({
        to: recipient,
        value: ethers.utils.parseEther(amount)
      });
      setStatus('Transaction sent: ' + tx.hash);
    } catch (err) {
      setStatus('Error: ' + err.message);
    }
  }

  return (
    <div className="bg-gray-900 p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-4">🔐 Wallet Interface</h2>
      {account ? (
        <div>
          <p className="mb-2">Connected as: <strong>{account}</strong></p>
          <p className="mb-4">Balance: <strong>{balance} MATIC</strong></p>
          <input
            type="text"
            placeholder="Recipient Address"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full p-2 mb-2 text-black rounded"
          />
          <input
            type="text"
            placeholder="Amount in MATIC"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 mb-2 text-black rounded"
          />
          <button
            onClick={sendTransaction}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Send MATIC
          </button>
          {status && <p className="mt-2 text-sm">{status}</p>}
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Connect MetaMask
        </button>
      )}
    </div>
  );
}
